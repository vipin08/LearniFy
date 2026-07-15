function TestimonialCard({ name, track, trackClass, avatarClass, image, quote, showAccent }) {
  return (
    <div className="testimonial-card">
      {showAccent && <div className="testimonial-card-accent"></div>}

      <div className="testimonial-header">
        <div className={`testimonial-avatar ${avatarClass}`}>
          <img src={image} alt={name} />
        </div>
        <div>
          <h3 className="testimonial-name">{name}</h3>
          <p className={trackClass}>{track}</p>
        </div>
      </div>

      <p className="testimonial-quote">"{quote}"</p>
    </div>
  );
}

export default TestimonialCard;
