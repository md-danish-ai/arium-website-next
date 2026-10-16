"use client";

import { useState } from "react";

export default function ContactForm() {
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
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const interestOptions = [
    { value: "sales", label: "Sales" },
    { value: "client_services", label: "Client Services" },
    { value: "noc", label: "Network Operations Center" },
    { value: "billing", label: "Billing" },
    { value: "communities", label: "Communities" },
    { value: "suppliers", label: "Suppliers" },
    { value: "media", label: "Media Relations" },
    { value: "careers", label: "Careers" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="ct-storyteller-flow" style={{ marginTop: "-1px", border: "none" }}>
      <section className="section-light" id="contact-form-section" style={{ background: "transparent", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div className="infra-grid-bg" aria-hidden="true" style={{ opacity: 0.08 }}></div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="ct-form-card reveal stagger-1">
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <h3 style={{ fontSize: "1.8rem", color: "var(--color-midnight-blue)", marginBottom: "16px" }}>Thank You!</h3>
                <p style={{ color: "rgba(22,32,71,0.7)", fontSize: "1.1rem" }}>Your message has been sent successfully. We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                {status === "error" && (
                  <div style={{ backgroundColor: "#fee2e2", border: "1px solid #ef4444", color: "#b91c1c", padding: "12px", borderRadius: "8px", marginBottom: "24px", fontSize: "0.95rem" }}>
                    {errorMessage}
                  </div>
                )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first-name" className="form-label">First Name <span style={{ color: "#e53935" }}>*</span></label>
                <input type="text" id="first-name" name="first_name" className="form-input" placeholder="First" required value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={status === 'loading'} />
              </div>
              <div className="form-group">
                <label htmlFor="last-name" className="form-label">Last Name <span style={{ color: "#e53935" }}>*</span></label>
                <input type="text" id="last-name" name="last_name" className="form-input" placeholder="Last" required value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={status === 'loading'} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company" className="form-label">Organization <span style={{ color: "#e53935" }}>*</span></label>
                <input type="text" id="company" name="company" className="form-input" placeholder="Your Organization" required value={company} onChange={(e) => setCompany(e.target.value)} disabled={status === 'loading'} />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email <span style={{ color: "#e53935" }}>*</span></label>
                <input type="email" id="email" name="email" className="form-input" placeholder="email@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === 'loading'} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="form-input" placeholder="+1 000-000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={status === 'loading'} />
              </div>
              <div className="form-group">
                <label htmlFor="postal-code" className="form-label">Postal Code</label>
                <input type="text" id="postal-code" name="postal_code" className="form-input" placeholder="99999" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} disabled={status === 'loading'} />
              </div>
            </div>

            <div className="form-group form-group--full">
              <label id="interest-label" className="form-label" onClick={() => document.getElementById('interest-wrapper')?.focus()}>Who are you reaching out to? <span style={{ color: "#e53935" }}>*</span></label>
              <div
                className={`custom-select-wrapper ${dropdownOpen ? 'open' : ''}`}
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
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!dropdownOpen) {
                      setDropdownOpen(true);
                      setFocusedOptionIndex(interestOptions.findIndex(opt => opt.value === interest) >= 0 ? interestOptions.findIndex(opt => opt.value === interest) : 0);
                    } else {
                      if (focusedOptionIndex >= 0 && focusedOptionIndex < interestOptions.length) {
                        setInterest(interestOptions[focusedOptionIndex].value);
                      }
                      setDropdownOpen(false);
                    }
                  } else if (e.key === 'Escape') {
                    setDropdownOpen(false);
                    setFocusedOptionIndex(-1);
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (!dropdownOpen) {
                      setDropdownOpen(true);
                      setFocusedOptionIndex(interestOptions.findIndex(opt => opt.value === interest) >= 0 ? interestOptions.findIndex(opt => opt.value === interest) : 0);
                    } else {
                      setFocusedOptionIndex(prev => (prev < interestOptions.length - 1 ? prev + 1 : prev));
                    }
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (dropdownOpen) {
                      setFocusedOptionIndex(prev => (prev > 0 ? prev - 1 : 0));
                    }
                  }
                }}
                tabIndex={0}
              >
                <div className="form-select custom-select-trigger" tabIndex={-1}>
                  <span className="custom-select-value" style={{ color: interest ? '#162047' : 'rgba(22,32,71,0.5)' }}>
                    {interest ? interestOptions.find(opt => opt.value === interest)?.label : "Please select one of the following options"}
                  </span>
                </div>
                {dropdownOpen && (
                  <ul className="custom-select-options" role="listbox" id="interest-listbox">
                    {interestOptions.map((option, index) => (
                      <li
                        key={option.value}
                        data-value={option.value}
                        role="option"
                        aria-selected={interest === option.value}
                        className={interest === option.value ? 'selected' : ''}
                        style={{
                          backgroundColor: focusedOptionIndex === index ? 'rgba(0, 232, 217, 0.1)' : undefined,
                          color: focusedOptionIndex === index ? 'var(--color-sky-teal)' : undefined
                        }}
                        onMouseEnter={() => setFocusedOptionIndex(index)}
                        onMouseDown={(e) => {
                          e.preventDefault(); // Prevents the wrapper from losing focus
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
                <select name="interest" aria-hidden="true" tabIndex={-1} style={{ opacity: 0, position: "absolute", zIndex: -1, width: 0, height: 0 }} value={interest} onChange={(e) => setInterest(e.target.value)} required>
                  <option value="" disabled>Please select one of the following options</option>
                  {interestOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group form-group--full">
              <label htmlFor="comments" className="form-label">How can we help you? <span style={{ color: "#e53935" }}>*</span></label>
              <textarea id="comments" name="comments" className="form-textarea" placeholder="Type your comments here." required value={comments} onChange={(e) => setComments(e.target.value)} disabled={status === 'loading'}></textarea>
            </div>

            <div style={{ textAlign: "center", paddingTop: "12px", paddingBottom: "40px" }}>
              <button type="submit" className="ct-submit-btn" disabled={status === 'loading'} style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
                {status === 'loading' ? 'Sending...' : 'Submit'}
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
