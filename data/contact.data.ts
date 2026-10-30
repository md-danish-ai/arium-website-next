export interface ContactTopicOption {
  value: string;
  label: string;
}

export const CONTACT_TOPIC_OPTIONS: ContactTopicOption[] = [
  { value: "sales", label: "Sales" },
  { value: "client_services", label: "Client Services" },
  { value: "noc", label: "Network Operations Center" },
  { value: "billing", label: "Billing" },
  { value: "communities", label: "Communities" },
  { value: "suppliers", label: "Suppliers" },
  { value: "media", label: "Media Relations" },
  { value: "careers", label: "Careers" },
  { value: "other", label: "Other" },
];

export const CONTACT_HERO_FALLBACK = {
  heading: "Contact us",
  intro:
    "Looking for more information? Or ready to discuss your connectivity needs? Fill out the form so we can connect you to the right team.",
};

export const CONTACT_SEO_FALLBACK = {
  title: "Contact Us | Arium Networks",
  description: "Build with clarity. connect with confidence",
};
