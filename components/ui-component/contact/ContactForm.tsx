"use client";

import { useState } from "react";
import { Typography } from "@ui-element";
import { DropdownArrowSvg } from "@ui-svg";
import type { ContactTopicOption } from "@data/contact.data";
import { CONTACT_TOPIC_OPTIONS } from "@data/contact.data";

export interface ContactFormProps {
  topicOptions?: ContactTopicOption[];
}

export default function ContactForm({
  topicOptions = CONTACT_TOPIC_OPTIONS,
}: ContactFormProps = {}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [comments, setComments] = useState("");
  const [interest, setInterest] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          company,
          interest,
          message: comments,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setPostalCode("");
        setComments("");
        setInterest("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const interestOptions = topicOptions;

  return (
    <div className="relative overflow-hidden bg-[#ededee] -mt-px border-0">
      <section className="relative overflow-hidden py-20 bg-[#ededee]" id="contact-form-section">
        <div
          className="infra-grid-bg opacity-[0.08] absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
        <div className="container relative z-[2]">
          <div className="max-w-[680px] mx-auto relative reveal stagger-1">
            {status === "success" ? (
              <div className="text-center py-[60px] px-5">
                <Typography variant="h3" as="h3" className="text-[#162047] mb-4">
                  Thank You!
                </Typography>
                <Typography variant="b1" as="p" className="text-[#162047]/70">
                  Your message has been sent successfully. We will be in touch shortly.
                </Typography>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                {status === "error" && (
                  <div className="bg-red-100 border border-red-500 text-red-700 p-3 rounded-lg mb-6 text-[0.95rem]">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="b4"
                      as="label"
                      uppercase
                      weight="medium"
                      htmlFor="first-name"
                      className="tracking-[0.06em] text-[#162047]/85 leading-relaxed"
                    >
                      First Name <span className="text-red-600">*</span>
                    </Typography>
                    <input
                      type="text"
                      id="first-name"
                      name="first_name"
                      className="w-full bg-transparent border-[1.5px] border-[#162047]/40 rounded-[10px] text-[#162047] px-[18px] py-[15px] font-body text-[0.95rem] transition-all duration-300 ease-out outline-none placeholder:text-[#162047]/50 placeholder:text-xs hover:border-[#162047]/35 focus:border-[#00e8d9] focus:ring-2 focus:ring-[#00e8d9]/20"
                      placeholder="First"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="b4"
                      as="label"
                      uppercase
                      weight="medium"
                      htmlFor="last-name"
                      className="tracking-[0.06em] text-[#162047]/85 leading-relaxed"
                    >
                      Last Name <span className="text-red-600">*</span>
                    </Typography>
                    <input
                      type="text"
                      id="last-name"
                      name="last_name"
                      className="w-full bg-transparent border-[1.5px] border-[#162047]/40 rounded-[10px] text-[#162047] px-[18px] py-[15px] font-body text-[0.95rem] transition-all duration-300 ease-out outline-none placeholder:text-[#162047]/50 placeholder:text-xs hover:border-[#162047]/35 focus:border-[#00e8d9] focus:ring-2 focus:ring-[#00e8d9]/20"
                      placeholder="Last"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="b4"
                      as="label"
                      uppercase
                      weight="medium"
                      htmlFor="company"
                      className="tracking-[0.06em] text-[#162047]/85 leading-relaxed"
                    >
                      Organization <span className="text-red-600">*</span>
                    </Typography>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full bg-transparent border-[1.5px] border-[#162047]/40 rounded-[10px] text-[#162047] px-[18px] py-[15px] font-body text-[0.95rem] transition-all duration-300 ease-out outline-none placeholder:text-[#162047]/50 placeholder:text-xs hover:border-[#162047]/35 focus:border-[#00e8d9] focus:ring-2 focus:ring-[#00e8d9]/20"
                      placeholder="Your Organization"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="b4"
                      as="label"
                      uppercase
                      weight="medium"
                      htmlFor="email"
                      className="tracking-[0.06em] text-[#162047]/85 leading-relaxed"
                    >
                      Email <span className="text-red-600">*</span>
                    </Typography>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-transparent border-[1.5px] border-[#162047]/40 rounded-[10px] text-[#162047] px-[18px] py-[15px] font-body text-[0.95rem] transition-all duration-300 ease-out outline-none placeholder:text-[#162047]/50 placeholder:text-xs hover:border-[#162047]/35 focus:border-[#00e8d9] focus:ring-2 focus:ring-[#00e8d9]/20"
                      placeholder="email@company.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="b4"
                      as="label"
                      uppercase
                      weight="medium"
                      htmlFor="phone"
                      className="tracking-[0.06em] text-[#162047]/85 leading-relaxed"
                    >
                      Phone Number
                    </Typography>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full bg-transparent border-[1.5px] border-[#162047]/40 rounded-[10px] text-[#162047] px-[18px] py-[15px] font-body text-[0.95rem] transition-all duration-300 ease-out outline-none placeholder:text-[#162047]/50 placeholder:text-xs hover:border-[#162047]/35 focus:border-[#00e8d9] focus:ring-2 focus:ring-[#00e8d9]/20"
                      placeholder="+1 000-000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="b4"
                      as="label"
                      uppercase
                      weight="medium"
                      htmlFor="postal-code"
                      className="tracking-[0.06em] text-[#162047]/85 leading-relaxed"
                    >
                      Postal Code
                    </Typography>
                    <input
                      type="text"
                      id="postal-code"
                      name="postal_code"
                      className="w-full bg-transparent border-[1.5px] border-[#162047]/40 rounded-[10px] text-[#162047] px-[18px] py-[15px] font-body text-[0.95rem] transition-all duration-300 ease-out outline-none placeholder:text-[#162047]/50 placeholder:text-xs hover:border-[#162047]/35 focus:border-[#00e8d9] focus:ring-2 focus:ring-[#00e8d9]/20"
                      placeholder="99999"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-5">
                  <Typography
                    variant="b4"
                    as="label"
                    uppercase
                    weight="medium"
                    id="interest-label"
                    className="tracking-[0.06em] text-[#162047]/85 leading-relaxed cursor-pointer"
                    onClick={() => document.getElementById("interest-wrapper")?.focus()}
                  >
                    Who are you reaching out to? <span className="text-red-600">*</span>
                  </Typography>
                  <div
                    className="relative w-full"
                    id="interest-wrapper"
                    role="combobox"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="listbox"
                    aria-controls="interest-listbox"
                    aria-labelledby="interest-label"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onBlur={() => {
                      setDropdownOpen(false);
                      setFocusedOptionIndex(-1);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (!dropdownOpen) {
                          setDropdownOpen(true);
                          setFocusedOptionIndex(
                            interestOptions.findIndex((opt) => opt.value === interest) >= 0
                              ? interestOptions.findIndex((opt) => opt.value === interest)
                              : 0
                          );
                        } else {
                          if (
                            focusedOptionIndex >= 0 &&
                            focusedOptionIndex < interestOptions.length
                          ) {
                            setInterest(interestOptions[focusedOptionIndex].value);
                          }
                          setDropdownOpen(false);
                        }
                      } else if (e.key === "Escape") {
                        setDropdownOpen(false);
                        setFocusedOptionIndex(-1);
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        if (!dropdownOpen) {
                          setDropdownOpen(true);
                          setFocusedOptionIndex(
                            interestOptions.findIndex((opt) => opt.value === interest) >= 0
                              ? interestOptions.findIndex((opt) => opt.value === interest)
                              : 0
                          );
                        } else {
                          setFocusedOptionIndex((prev) =>
                            prev < interestOptions.length - 1 ? prev + 1 : prev
                          );
                        }
                      } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        if (dropdownOpen) {
                          setFocusedOptionIndex((prev) => (prev > 0 ? prev - 1 : 0));
                        }
                      }
                    }}
                    tabIndex={0}
                  >
                    <div
                      className={`w-full bg-transparent border-[1.5px] ${dropdownOpen ? "border-[#00e8d9] ring-2 ring-[#00e8d9]/20" : "border-[#162047]/40 hover:border-[#162047]/35"} rounded-[10px] px-[18px] py-[15px] flex items-center justify-between cursor-pointer transition-all duration-300 ease-out outline-none`}
                      tabIndex={-1}
                    >
                      <span
                        className={`text-xs ${interest ? "text-[#162047] text-[0.95rem]" : "text-[#162047]/50"}`}
                      >
                        {interest
                          ? interestOptions.find((opt) => opt.value === interest)?.label
                          : "Please select one of the following options"}
                      </span>
                      <DropdownArrowSvg isOpen={dropdownOpen} />
                    </div>
                    {dropdownOpen && (
                      <ul
                        className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border-[1.5px] border-[#162047]/15 rounded-[10px] shadow-[0_12px_32px_rgba(22,32,71,0.1)] overflow-hidden z-20 py-1 max-h-[240px] overflow-y-auto"
                        role="listbox"
                        id="interest-listbox"
                      >
                        {interestOptions.map((option, index) => (
                          <li
                            key={option.value}
                            data-value={option.value}
                            role="option"
                            aria-selected={interest === option.value}
                            className={`px-[18px] py-3 text-[0.95rem] text-[#162047]/80 cursor-pointer transition-colors duration-200 hover:bg-[#00e8d9]/10 hover:text-[#162047] ${
                              interest === option.value
                                ? "bg-[#00e8d9]/15 text-[#162047] font-medium"
                                : ""
                            } ${focusedOptionIndex === index ? "bg-[#00e8d9]/10 text-[#162047]" : ""}`}
                            onMouseEnter={() => setFocusedOptionIndex(index)}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setInterest(option.value);
                              setDropdownOpen(false);
                            }}
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    )}
                    <select
                      name="interest"
                      aria-hidden="true"
                      tabIndex={-1}
                      className="sr-only"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Please select one of the following options
                      </option>
                      {interestOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

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
                    name="comments"
                    className="w-full min-h-[148px] resize-none bg-transparent border-[1.5px] border-[#162047]/40 rounded-[10px] text-[#162047] px-[18px] py-[15px] font-body text-[0.95rem] transition-all duration-300 ease-out outline-none placeholder:text-[#162047]/50 placeholder:text-xs hover:border-[#162047]/35 focus:border-[#00e8d9] focus:ring-2 focus:ring-[#00e8d9]/20"
                    placeholder="Type your comments here."
                    required
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    disabled={status === "loading"}
                  />
                </div>

                <div className="text-center pt-3 pb-10">
                  <button
                    type="submit"
                    className={`inline-block border-2 border-[#00e8d9] bg-[#00e8d9] rounded-full px-12 py-3.5 cursor-pointer transition-all duration-300 ease-out hover:bg-transparent hover:border-[#162047] hover:text-[#162047] hover:-translate-y-0.5 active:translate-y-0 shadow-sm ${
                      status === "loading" ? "opacity-70 cursor-not-allowed" : "opacity-100"
                    }`}
                    disabled={status === "loading"}
                  >
                    <Typography
                      variant="button"
                      uppercase
                      weight="semibold"
                      className="text-[#162047]"
                    >
                      {status === "loading" ? "Sending..." : "SUBMIT"}
                    </Typography>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
