import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Sarah J.",
    track: "Data Science Track",
    trackClass: "track-secondary",
    avatarClass: "avatar-secondary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXnpHeyrYguXcdJNOO9B5SE7j6b2qtsRBod3oAuX-_47jLatYfUrgO31BX37moae1r2wX-mziGVfL_fR9mHrUkI1aZvNYIHZIejytAKkqIbjDZ_FA2iHDlql0vrD7JsojYTmnzT3m68kTcUiOuFx1MMILRlE8bJqzfqTofuz95R-6j959hlTYOl1xsBDhIFoZD4qhdXLlmUWu2FTwd4lW2yzF7N-hHzdPpfxBqk-ZHI8OvoDoWau8cNpMTT1-VNYISOZT3aFM2P5eQ",
    quote:
      "The interactive lessons and the community support here are unmatched. I went from beginner to landing my first tech job in 6 months.",
    showAccent: false,
  },
  {
    name: "Marcus T.",
    track: "Design Foundations",
    trackClass: "track-primary",
    avatarClass: "avatar-primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBc4EVVUox-Ts1cfS0Ghim-sx8D2mnIi4GS1JXuEIZZDSR8CM5wDEnKFjst3QwEY4PmCKyu1d34kk1T4SNMoVXmnn8O4xEiBngnllOa2EzQvbiW6YlfzIK3KYqvxOJ8rBLCc1UFqaCR0V8e8sf2asNzSPMAEaXu1Ga4K1pJiGVPFbzKXV90AuGnnR2dvYjurxdWTgkyNajtkPW6i1KB4voCjV7hF9jdeL1V4BcI1ZwjjsSRyNQNOLs72Y8fLh9qI5IIDdjw8aB38FT5",
    quote:
      "Learnify's bite-sized approach fits perfectly into my busy schedule. The visual aids and AI tutor make complex topics easy to grasp.",
    showAccent: true,
  },
  {
    name: "Elena R.",
    track: "Business Strategy",
    trackClass: "track-tertiary",
    avatarClass: "avatar-tertiary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHtGZkBRwH41bDZa-CIRz8PfqT5YjcQlTruhtamLYF288VpbgmQd2-pnx6ueKuo5Q_O1RxnkpMW6kCSyN2psE-2x_ESQxDDDvLWCbJIPJQ8hqkIgXjyKK4xmxBNPAkuzhjgWEzZqqFzXdFB8t6IaMvqon081L13jDeMloVyReZnOv9mXlyRJ5VAc1VT-LmYBclg0p0L3WBFHpGo0Y-UvS9JEmccWru2NEcQ3AIba9ti8hd721EvPX02Jdj-lyg7OGfYddB6BuwFOdl",
    quote:
      "Upskilling has never been this engaging. The peer-to-peer feedback system really helps solidify the concepts learned in the courses.",
    showAccent: false,
  },
];

function Community() {
  return (
    <section className="community">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Join a community of 500k+ learners</h2>
          <p className="section-subtitle">
            Connect, collaborate, and grow with peers from around the globe in a
            supportive and vibrant educational environment.
          </p>
        </div>

        <div className="cards-grid">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Community;
