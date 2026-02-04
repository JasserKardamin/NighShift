import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";

export default function OurTestimonials() {
  const testimonials = [
    {
      quote:
        "Amazing platform! Solving challenges in NightShift has significantly improved my problem-solving skills and speed.",
      name: "Richard Nelson",
      role: "AI Content Marketer",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      quote:
        "NightShift makes coding competitions fun and engaging. The instant feedback and leaderboard keep me motivated every day!",
      name: "Sophia Martinez",
      role: "UI/UX Designer",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      quote:
        "The variety of algorithm problems here is incredible. It's the perfect place to prepare for coding interviews and contests.",
      name: "Ethan Roberts",
      role: "Frontend Developer",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    },
    {
      quote:
        "The real-time feedback and rankings make problem-solving addictive. Easily one of the best coding platforms I've used.",
      name: "Isabella Kim",
      role: "Product Designer",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    },
    {
      quote:
        "NighShift completely changed how I practice algorithms. The challenges are well-designed and incredibly motivating.",
      name: "Liam Johnson",
      role: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    },
    {
      quote:
        "Perfect for interview prep and sharpening logic. NightShift pushes you to write cleaner and faster code.",
      name: "Ava Patel",
      role: "Full Stack Developer",
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
    },
  ];

  return (
    <section className="flex flex-col items-center" id="testimonials">
      <SectionTitle
        title="Our testimonials"
        description="A visual collection of our most recent works - each piece crafted with intention, emotion, and style."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-18 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            className="group border border-slate-800 p-6 rounded-xl"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: `${index * 0.15}`,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <p className="text-slate-100 text-base">{testimonial.quote}</p>
            <div className="flex items-center gap-3 mt-8 group-hover:-translate-y-1 duration-300">
              <img
                className="size-10 rounded-full"
                src={testimonial.image}
                alt="user image"
              />
              <div>
                <h2 className="text-gray-200 font-medium">
                  {testimonial.name}
                </h2>
                <p className="text-indigo-500">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
