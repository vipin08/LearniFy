function PricingCard({ plan, description, price, period, features, buttonText, cardClass, badgeClass, descriptionClass, priceClass, buttonClass }) {
  return (
    <div className={`pricing-card ${cardClass}`}>
      <div className={`plan-badge ${badgeClass}`}>{plan}</div>
      <p className={`plan-description ${descriptionClass}`}>{description}</p>

      <div className="plan-price">
        <span className={`price-amount ${priceClass}`}>{price}</span>
        {period && <span className={`price-period ${descriptionClass}`}>{period}</span>}
      </div>

      <ul className="feature-list">
        {features.map((feature) => (
          <li
            key={feature.text}
            className={`feature-item ${feature.itemClass || ""} ${feature.disabled ? "disabled" : ""}`}
          >
            <span
              className={`material-symbols-outlined ${
                feature.disabled ? "icon-cancel" : feature.iconClass
              }`}
            >
              {feature.disabled ? "cancel" : "check_circle"}
            </span>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <button className={`btn-plan ${buttonClass}`}>{buttonText}</button>
    </div>
  );
}

export default PricingCard;
