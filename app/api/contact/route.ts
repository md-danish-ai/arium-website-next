import { NextResponse } from "next/server";

interface ContactRequestBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  interest?: string;
  message?: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not defined in environment variables");
    return NextResponse.json({ error: "Server email service is not configured." }, { status: 500 });
  }

  try {
    const body = (await request.json()) as ContactRequestBody;
    const { firstName, lastName, email, phone, company, interest, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Company:</strong> ${company || "Not provided"}</p>
      <p><strong>Area of Interest:</strong> ${interest || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: ["charu.gupta@3qilabs.com"],
        reply_to: email,
        subject: "Arium website — Quick Contact Form Submission",
        html: htmlContent,
      }),
    });

    const data = await resendResponse.json();

    if (!resendResponse.ok || data.error) {
      console.error("Resend error:", data);
      return NextResponse.json(
        { error: data.error?.message || data.message || "Failed to send email" },
        { status: resendResponse.status || 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("API Error:", error);
    const message = error instanceof Error ? error.message : "Failed to send email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
