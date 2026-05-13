// app.config.ts
export const APP_CONFIG = {
  brgy: {
    name: "Barangay Tagay",
    city: "San Jose del Monte",
    province: "Bulacan",
    tagline:
      "Submit barangay requests online and track status anytime — designed for fast, simple, and transparent service.",
  },

  branding: {
    productName: "Smart Barangay Portal",

    // ✅ Add these:
    primaryColor: "#1e3a8a",
    secondaryColor: "#16a34a",
    logoText: "R",

    // optional
    sealUrl: "",
  },

  services: [
    { id: "barangay_clearance", label: "Barangay Clearance", enabled: true },
    {
      id: "certificate_of_indigency",
      label: "Certificate of Indigency",
      enabled: true,
    },
    {
      id: "business_permit_assistance",
      label: "Business Permit Assistance",
      enabled: true,
    },
  ],

  ui: {
    showAdminCard: true,
  },
} as const;
