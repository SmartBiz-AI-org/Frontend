import { Plan } from "@/type/type";


export const pricingPlans: Plan[] = [
  {
    name: "Free",
    pricePerMonthNGN: 0,
    billedAnnuallyNote: "₦500 billed annually",
    saved: 12,
    features: [
      "5 Product Listing",
      "1 Storefront",
      "Basic Storefront Template",
      "Self-Service Customer Support Via FAQs And Online Resources",
      "5 Clothing Design Per Week",
      "Basic Analytics"
    ]
  },
  {
    name: "Basic",
    pricePerMonthNGN: 5000,
    billedAnnuallyNote: "₦5000 billed annually",
    saved: 12,
    features: [
      "10 Product Listing",
      "2 Storefront",
      "Customizable Storefront Themes",
      "Live Chat Support, Email Support",
      "10 Clothing Design Per Week",
      "Basic Analytics, 5000 AI Credits, And 1000 SMS Credits"
    ]
  },
  {
    name: "Pro",
    pricePerMonthNGN: 10000,
    billedAnnuallyNote: "₦10000 billed annually",
    saved: 12,
    features: [
      "Unlimited Listings",
      "Up To 5 Online Stores With Custom Branding",
      "Customizable Storefront Themes",
      "Live Chat Support, Email Support",
      "15 Clothing Design Per Week",
      "Advanced Analytics, 10000 AI Credits, 2000 SMS Credits, And Live Product Preview"
    ]
  }
];