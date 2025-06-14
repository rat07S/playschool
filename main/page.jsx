'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Menu, X } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import PandaModel from '@/components/PandaModel';
import FloatingBubbles from '@/components/FloatingBubbles';

const testimonials = [
  { quote: "🌟 The atmosphere is so playful and safe. My child loves every day here!", name: "Parent 1" },
  { quote: "💞 The teachers genuinely care — they treat every child like their own!", name: "Parent 2" },
  { quote: "🎉 My kid comes home excited and tells me panda stories. It’s magical!", name: "Parent 3" },
  { quote: "🐼 Such a creative learning space — everything is thoughtful and adorable!", name: "Parent 4" },
  { quote: "🌈 The interiors are dreamy, colorful, and perfect for little minds!", name: "Parent 5" },
];

export default function PlayschoolPage() {
    const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "#", label: "🏠 Home" },
    { href: "#about", label: "📖 About" },
    { href: "#gallery", label: "🖼️ Gallery" },
    { href: "#contact", label: "📞 Contact" }
  ];
    const [modalImage, setModalImage] = useState(null);
  const [index, setIndex] = useState(0);

  // Looping every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

   const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const res = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message }),
});

const data = await res.json(); // ✅ now this won’t fail
alert(data.message);
    if (data.success) e.target.reset();
  };

  return (
    <main className="bg-gradient-to-br from-blue-100 to-pink-100 text-gray-800 font-sans">
       <header className="sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between bg-white/70 dark:bg-zinc-900 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
  {/* 🐼 Logo */}
  <h1 className="text-3xl md:text-4xl font-black text-black dark:text-white flex items-center gap-2 tracking-wide select-none">
    🐼 
    <span className="tracking-widest shimmer-text">TinySteps</span>
  </h1>

  {/* 🧭 Desktop Navigation */}
  <nav className="hidden md:flex items-center gap-6 font-medium text-base text-gray-800 dark:text-gray-100">
    {navItems.map(({ href, label }) => (
      <a
        key={href}
        href={href}
        className="relative group transition duration-300 ease-in-out hover:scale-105"
      >
        <span className="relative z-10">{label}</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
      </a>
    ))}
  </nav>

  {/* 🍔 Mobile Menu Toggle */}
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="md:hidden text-black dark:text-white hover:scale-110 transition-transform duration-200"
    aria-label="Toggle Menu"
  >
    {menuOpen ? <X size={28} /> : <Menu size={28} />}
  </button>

  {/* 📱 Mobile Dropdown Menu */}
  {menuOpen && (
    <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-t border-gray-300 dark:border-gray-700 shadow-xl md:hidden animate-fade-down">
      <div className="flex flex-col p-4 gap-4 text-black dark:text-white font-medium">
        {navItems.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition duration-300"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )}
</header>



      {/* 🐼 Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-10 text-center bg-gradient-to-br from-white via-gray-100 to-black dark:from-black dark:via-gray-900 dark:to-white overflow-hidden">
  
  {/* Floating Bubbles 🫧 */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
    <FloatingBubbles count={20} />
  </div>

  {/* Panda Canvas 🐼 */}
{/* Panda Canvas 🐼 */}
<div className="w-full flex justify-center items-center sm:h-[420px] md:h-[520px] lg:h-[600px] h-80 drop-shadow-2xl">
  <Canvas className="w-full h-full">
    <ambientLight intensity={1} />
    <directionalLight position={[2, 5, 2]} intensity={1.5} />
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    <Suspense fallback={null}>
      <PandaModel 
        scale={4.5} // Bigger panda
        position={[0, -0.4, 0]} // Raised higher (was -1.2)
        rotation={[0, Math.PI / 6, 0]} 
      />
    </Suspense>
  </Canvas>
</div>



  {/* Title 🐾 */}
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mt-8 bg-gradient-to-r from-black via-gray-600 to-white dark:from-white dark:via-gray-300 dark:to-black bg-clip-text text-transparent"
  >
    🐾 Welcome to TinySteps Playschool 🐼
  </motion.h1>

  {/* Subheading */}
  <motion.p
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="mt-4 max-w-xl text-sm sm:text-base text-gray-800 dark:text-gray-300"
  >
    Where little feet make giant leaps 🚀✨
  </motion.p>

  {/* Call-to-Action Button 🎉 */}
  <motion.button
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
    className="mt-6 px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold text-base rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-black dark:border-white"
  >
    🎉 Peek Inside
  </motion.button>
</section>


      {/* 📚 About Section */}
      {/* 🐼 About Section */}
<section id="about" className="relative grid md:grid-cols-2 items-center gap-10 px-6 py-16 bg-gradient-to-br from-white via-gray-100 to-white dark:from-black dark:via-zinc-900 dark:to-black">
  
  {/* Left Content */}
  <div className="order-2 md:order-1 space-y-8 text-black dark:text-white animate-fade-in">
  {/* Title with Emoji Spark */}
  <h2 className="text-4xl md:text-5xl font-extrabold flex items-center gap-3 tracking-tight">
    🐼 <span className="tracking-wide bg-gradient-to-r from-black via-gray-700 to-black dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
      About Us
    </span>
  </h2>

  {/* Inspiring Paragraph */}
  <p className="text-lg md:text-xl leading-relaxed text-gray-800 dark:text-gray-300 bg-white/70 dark:bg-zinc-800/40 rounded-xl p-4 shadow-md border border-gray-200 dark:border-white/10 transition-all duration-500 hover:shadow-xl">
    At <span className="font-semibold text-black dark:text-white">TinySteps</span>, we believe every child is a 🌟 shining star with unlimited potential. Our panda-inspired environment is calm, joyful, and filled with little moments that spark big dreams. 💫
  </p>

  {/* Core Values List with Effects */}
  <ul className="space-y-3 pl-5 text-gray-700 dark:text-gray-200 list-disc text-base md:text-lg">
    <li className="relative pl-2 before:content-['✨'] before:absolute before:left-0 before:animate-pulse">
      🎲 Play-based & Purposeful Learning
    </li>
    <li className="relative pl-2 before:content-['🌿'] before:absolute before:left-0 before:animate-bounce">
      🏠 Safe, Peaceful, Panda-Friendly Spaces
    </li>
    <li className="relative pl-2 before:content-['🎓'] before:absolute before:left-0 before:animate-wiggle">
      👩‍🏫 Nurturing Educators Who Truly Care
    </li>
    <li className="relative pl-2 before:content-['🎨'] before:absolute before:left-0 before:animate-spin-slow">
      🌈 Creative Expression Through Art & Music
    </li>
    <li className="relative pl-2 before:content-['💖'] before:absolute before:left-0 before:animate-pulse">
      🤝 Values of Kindness, Sharing & Empathy
    </li>
  </ul>

  {/* Bonus Quote */}
  <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 rounded-xl p-5 mt-6 border border-gray-300 dark:border-white/10 shadow-inner text-center italic text-gray-600 dark:text-gray-300">
    “Every big dream begins with tiny steps.” 🌱
  </div>
</div>



  {/* Right Image */}
  <div className="order-1 md:order-2 group relative overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 ease-in-out">
    <img
      src="/img/11.png"
      alt="Kids Learning"
      className="w-full h-auto object-cover transform group-hover:scale-105 transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0"
    />
    {/* Optional: subtle gradient instead of blur */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 dark:from-black/10 dark:to-black/10 pointer-events-none opacity-60 group-hover:opacity-0 transition-opacity duration-500"></div>
  </div>
</section>


      {/* 📸 Gallery Section */}
     <section className="relative px-6 py-16 bg-gradient-to-br from-white via-rose-50 to-pink-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      {/* Decorative Label */}
      <div className="text-center mb-4">
        <span className="inline-block text-sm px-4 py-1 bg-black/10 dark:bg-white/10 rounded-full text-gray-800 dark:text-white shadow backdrop-blur-sm tracking-wide">
          🏠 Panda-Themed Spaces
        </span>
      </div>

      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-tight text-black dark:text-white">
        🌿 Inside TinySteps
      </h2>

      {/* Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 group">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:scale-[1.03] hover:rotate-[1deg] hover:shadow-2xl hover:z-10 cursor-pointer"
            onClick={() => setModalImage(`/img/${i + 1}.jpg`)}
          >
            <img
              src={`/img/${i + 1}.jpg`}
              alt={`Interior ${i + 1}`}
              className="w-full h-64 object-cover rounded-3xl transition-all duration-700 ease-in-out group-hover:blur-sm group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-md bg-black/30 dark:bg-white/10 text-white dark:text-white text-lg font-semibold rounded-3xl">
              🐾 Calm & Creative Space #{i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Panda Quote */}
      <div className="mt-12 text-center text-gray-700 dark:text-gray-300 text-lg italic max-w-2xl mx-auto">
        “A well-designed space inspires little minds to dream big.” 🐼💫
      </div>

      {/* Modal Viewer */}
      {modalImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:scale-110 transition"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Enlarged View"
              className="max-w-full max-h-[80vh] rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>




      {/* 📝 Admission Process */}
      <section className="relative px-6 py-16 bg-gradient-to-b from-yellow-50 via-white to-rose-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
  {/* Decorative Tag */}
  <div className="text-center mb-4">
    <span className="inline-block text-sm px-4 py-1 bg-black/10 dark:bg-white/10 text-gray-800 dark:text-white rounded-full tracking-wider shadow backdrop-blur-sm">
      🐼 Begin Your Journey
    </span>
  </div>

  {/* Section Heading */}
  <h2 className="text-4xl md:text-5xl font-extrabold text-center text-black dark:text-white mb-12 tracking-tight">
    📋 Admission Process
  </h2>

  {/* Steps Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
      { title: "👶 Age Criteria", detail: "2 to 5 years old to start the adventure." },
      { title: "📄 Submit Documents", detail: "Birth certificate, address proof, & photos." },
      { title: "👋 Meet & Greet", detail: "Tour our school and meet the joyful panda team!" },
      { title: "📝 Application Review", detail: "We carefully assess and finalize applications." },
      { title: "🎉 Confirmation Call", detail: "You'll receive a welcome call from our team!" },
      { title: "🎒 Let’s Begin!", detail: "Join the TinySteps family and start learning." },
    ].map((step, i) => (
      <div
        key={i}
        className="relative group p-6 rounded-3xl bg-white/80 dark:bg-zinc-800/70 shadow-xl border border-gray-200 dark:border-white/10 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
      >
        {/* Panda Badge */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-zinc-900 rounded-full w-12 h-12 flex items-center justify-center shadow-md border dark:border-zinc-700 text-2xl animate-bounce">
          🐾
        </div>

        <h3 className="text-xl font-bold mt-8 text-black dark:text-white">{`Step ${i + 1}`}</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{step.title}</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 italic">{step.detail}</p>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-pink-100/30 via-transparent to-yellow-100/30 dark:from-zinc-700/20 dark:to-zinc-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    ))}
  </div>

  {/* Bottom Panda Message */}
  <div className="mt-12 text-center text-gray-700 dark:text-gray-300 italic text-lg max-w-2xl mx-auto">
    “Every great journey begins with a tiny step 🐾 — and we're excited to take it with you.”
  </div>
</section>


      {/* 💬 Testimonials */}
      <section className="relative px-6 py-16 bg-gradient-to-bl from-pink-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 overflow-hidden">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-black dark:text-white">
        🐼 What Parents Say
      </h2>

      {/* Testimonial Card Carousel */}
      <div className="relative w-full max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 p-8 rounded-3xl shadow-xl text-center mx-4 sm:mx-8"
          >
            <p className="text-xl italic">“{testimonials[index].quote}”</p>
            <p className="mt-4 font-semibold text-right">- {testimonials[index].name}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Emoji Background Flare */}
      <div className="absolute top-10 left-0 w-20 h-20 text-4xl animate-bounce">🐾</div>
      <div className="absolute bottom-10 right-0 w-20 h-20 text-4xl animate-pulse">🐼</div>
    </section>

      {/* 📞 Contact Us */}
      <section className="relative px-6 py-16 bg-gradient-to-br from-white via-green-50 to-gray-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
  {/* Section Title */}
  <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight text-black dark:text-white">
    📍 Get in Touch
  </h2>

  <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
    {/* Contact Form */}
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-white/10 transition-all duration-300">
      <h3 className="text-2xl font-bold text-black dark:text-white mb-2">🐼 Let’s Chat</h3>
      <input
        name="name"
        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        type="text"
        placeholder="Your Name"
        required
      />
      <input
        name="email"
        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        type="email"
        placeholder="Your Email"
        required
      />
      <textarea
        name="message"
        rows="5"
        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        placeholder="Your Message"
        required
      ></textarea>
      <button
        type="submit"
        className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
        🐾 Send Message
      </button>
    </form>

    {/* Google Map */}
    <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/10 h-full">
      <iframe
        src="https://www.google.com/maps?q=Chrompet&output=embed"
        className="w-full h-full min-h-[400px]"
        loading="lazy"
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
    </div>
  </div>

  {/* Panda Quote */}
  <p className="mt-12 text-center text-gray-700 dark:text-gray-300 italic text-lg max-w-xl mx-auto">
    “Like a panda’s hug — warm, calm, and always welcome.” 🌿🐼
  </p>
</section>


      {/* 🔚 Footer */}
      <footer className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white px-6 py-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
    
    {/* Brand Section */}
    <div>
      <h3 className="text-2xl font-extrabold mb-3">🐼 TinySteps</h3>
      <p className="text-gray-300 mb-3">Nurturing tiny minds with big dreams since 2010. Every day is a panda adventure! 🎒🌿</p>
      <p className="text-sm text-gray-400">&copy; 2025 TinySteps Playschool. All rights reserved.</p>
    </div>

    {/* Navigation */}
    <div>
      <h4 className="text-xl font-semibold mb-3">🧭 Quick Links</h4>
      <ul className="space-y-2 text-gray-300">
        <li className="hover:text-white transition-all">🏡 Home</li>
        <li className="hover:text-white transition-all">📖 About Us</li>
        <li className="hover:text-white transition-all">📝 Admissions</li>
        <li className="hover:text-white transition-all">📸 Gallery</li>
        <li className="hover:text-white transition-all">📞 Contact</li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h4 className="text-xl font-semibold mb-3">📌 Reach Us</h4>
      <p className="text-gray-300 mb-2">📍 Chrompet, Chennai</p>
      <p className="text-gray-300 mb-2">📧 hello@tinysteps.edu.in</p>
      <p className="text-gray-300">📞 +91 98765 43210</p>
    </div>

    {/* Newsletter / Social */}
    <div>
      <h4 className="text-xl font-semibold mb-3">📬 Stay Connected</h4>
      <p className="text-gray-300 mb-4">Subscribe to get cute updates, parenting tips, and events! 💌</p>
      <div className="flex items-center gap-2">
        <input
          type="email"
          placeholder="Your email"
          className="px-3 py-2 w-full rounded-l-md bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white focus:outline-none"
        />
        <button className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-r-md text-white font-semibold transition">
          ✉️
        </button>
      </div>
      <div className="flex gap-4 mt-6 text-2xl">
        <a href="#" className="hover:text-emerald-400">🌐</a>
        <a href="#" className="hover:text-emerald-400">📘</a>
        <a href="#" className="hover:text-emerald-400">📸</a>
        <a href="#" className="hover:text-emerald-400">🐦</a>
      </div>
    </div>
  </div>

  {/* Bottom Panda Bar */}
  <div className="mt-10 text-center text-gray-400 text-sm border-t border-zinc-700 pt-4">
    🐾 “Walk gently, dream wildly — the panda way.” 💭✨
  </div>
</footer>

    </main>
  );
}
