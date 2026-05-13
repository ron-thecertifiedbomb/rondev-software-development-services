export const BUSINESS_DEMO_CONFIG = {
  brand: {
    name: "RONDEV",
    product: "SJDM Business Request Portal",
    tagline:
      "Online requests + tracking codes + staff dashboard that reduce follow-ups and manual work.",
  },
  location: {
    city: "San Jose del Monte",
    province: "Bulacan",
  },
  services: [
    { id: "quotation_request", label: "Quotation Request" },
    { id: "service_request", label: "Service / Repair Request" },
    { id: "support_followup", label: "Support / Follow-up" },
    { id: "appointment_request", label: "Appointment Request (Optional)" },
  ],
} as const;
