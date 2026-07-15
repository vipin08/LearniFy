import PricingCard from "./PricingCard";

const plans = [
  {
    plan: "Basic",
    description: "Perfect to get started and explore the platform.",
    price: "Free",
    period: "",
    cardClass: "",
    badgeClass: "badge-basic",
    descriptionClass: "",
    priceClass: "",
    buttonClass: "btn-plan-outline",
    buttonText: "Get Started",
    features: [
      { text: "Access to free courses", iconClass: "icon-check" },
      { text: "Basic community access", iconClass: "icon-check" },
      { text: "AI Tutor assistance", disabled: true },
    ],
  },
  {
    plan: "Pro",
    description: "Unlock full potential with AI-guided learning.",
    price: "+$19",
    period: "/mo",
    cardClass: "pricing-card-pro",
    badgeClass: "badge-pro",
    descriptionClass: "plan-description-light",
    priceClass: "price-pro",
    buttonClass: "btn-plan-pro",
    buttonText: "Start 14 Days Trial",
    features: [
      { text: "Full course library access", iconClass: "icon-check-pro", itemClass: "feature-item-pro" },
      { text: "Unlimited AI Tutor", iconClass: "icon-check-pro", itemClass: "feature-item-pro" },
      { text: "Certificates of completion", iconClass: "icon-check-pro", itemClass: "feature-item-pro" },
    ],
  },
  {
    plan: "Team",
    description: "For organizations looking to upskill their workforce.",
    price: "+$49",
    period: "/mo",
    cardClass: "pricing-card-team",
    badgeClass: "badge-team",
    descriptionClass: "plan-description-team",
    priceClass: "price-team",
    buttonClass: "btn-plan-team",
    buttonText: "Contact Sales",
    features: [
      { text: "Everything in Pro", iconClass: "icon-check-team", itemClass: "feature-item-team" },
      { text: "Admin dashboard & analytics", iconClass: "icon-check-team", itemClass: "feature-item-team" },
      { text: "Dedicated account manager", iconClass: "icon-check-team", itemClass: "feature-item-team" },
    ],
  },
];

function Pricing() {
  return (
    <section className="pricing">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Simple, transparent pricing</h2>
          <p className="section-subtitle">
            Choose the plan that best fits your learning goals.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <PricingCard key={plan.plan} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
