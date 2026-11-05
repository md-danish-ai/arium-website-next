"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography, Button } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { ContactTopicOption } from "@data/contact.data";
import { CONTACT_TOPIC_OPTIONS } from "@data/contact.data";
import { contactFormSchema, type ContactFormData } from "./contact.schema";
import ContactFormField from "./ContactFormField";
import ContactInterestSelect from "./ContactInterestSelect";

export { contactFormSchema, type ContactFormData } from "./contact.schema";

export interface ContactFormProps {
  topicOptions?: ContactTopicOption[];
}

export default function ContactForm({
  topicOptions = CONTACT_TOPIC_OPTIONS,
}: ContactFormProps = {}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      postalCode: "",
      interest: "",
      comments: "",
    },
  });

  const isBusy = status === "loading" || isSubmitting;

  const onSubmit = async (values: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone || "",
          company: values.company,
          interest: values.interest,
          message: values.comments,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#ededee] -mt-px border-0">
      <section className="relative overflow-hidden py-20 bg-[#ededee]" id="contact-form-section">
        <div
          className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
        <Container className="relative z-[2]">
          <div className="max-w-[680px] mx-auto relative reveal stagger-1">
            {status === "success" ? (
              <div className="text-center py-[60px] px-5">
                <Typography variant="h2" as="h2" className="text-[#162047] mb-4">
                  Thank You!
                </Typography>
                <Typography variant="b1" as="p" className="text-[#162047]/70">
                  Your message has been sent successfully. We will be in touch shortly.
                </Typography>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} id="contact-form" noValidate>
                {status === "error" && (
                  <div className="bg-red-100 border border-red-500 text-red-700 p-3 rounded-lg mb-6 text-[0.95rem]">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <ContactFormField
                    id="first-name"
                    label="First Name"
                    placeholder="First"
                    required
                    disabled={isBusy}
                    error={errors.firstName?.message}
                    registration={register("firstName")}
                  />
                  <ContactFormField
                    id="last-name"
                    label="Last Name"
                    placeholder="Last"
                    required
                    disabled={isBusy}
                    error={errors.lastName?.message}
                    registration={register("lastName")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <ContactFormField
                    id="company"
                    label="Organization"
                    placeholder="Your Organization"
                    required
                    disabled={isBusy}
                    error={errors.company?.message}
                    registration={register("company")}
                  />
                  <ContactFormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="email@company.com"
                    required
                    disabled={isBusy}
                    error={errors.email?.message}
                    registration={register("email")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <ContactFormField
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 000-000-0000"
                    required
                    disabled={isBusy}
                    error={errors.phone?.message}
                    registration={register("phone")}
                  />
                  <ContactFormField
                    id="postal-code"
                    label="Postal Code"
                    placeholder="99999"
                    required
                    disabled={isBusy}
                    error={errors.postalCode?.message}
                    registration={register("postalCode")}
                  />
                </div>

                <Controller
                  name="interest"
                  control={control}
                  render={({ field, fieldState }) => (
                    <ContactInterestSelect
                      options={topicOptions}
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                      disabled={isBusy}
                    />
                  )}
                />

                <div className="flex flex-col gap-2 mb-5">
                  <Typography
                    variant="b4"
                    as="label"
                    uppercase
                    weight="medium"
                    htmlFor="comments"
                    className="tracking-[0.06em] text-[#162047]/85 leading-relaxed"
                  >
                    How can we help you? <span className="text-red-600">*</span>
                  </Typography>
                  <textarea
                    id="comments"
                    placeholder="Type your comments here."
                    disabled={isBusy}
                    className={`w-full min-h-[148px] resize-none bg-transparent border-[1.5px] ${
                      errors.comments
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-[#162047]/40 hover:border-[#162047]/35 focus:border-[#00e8d9] focus:ring-2 focus:ring-[#00e8d9]/20"
                    } rounded-[10px] text-[#162047] px-[18px] py-[15px] font-body text-[0.95rem] transition-all duration-300 ease-out outline-none placeholder:text-[#162047]/50 placeholder:text-xs`}
                    {...register("comments")}
                  />
                  {errors.comments && (
                    <p className="text-red-600 text-xs mt-1 font-body leading-tight">
                      {errors.comments.message}
                    </p>
                  )}
                </div>

                <div className="text-center pt-3 pb-10">
                  <Button
                    type="submit"
                    color="secondary"
                    size="lg"
                    disabled={isBusy}
                    className="min-w-[180px] shadow-sm"
                  >
                    {isBusy ? "Sending..." : "SUBMIT"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
