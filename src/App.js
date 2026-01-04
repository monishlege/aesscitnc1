import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- Background Component: Realistic Glowing Stars ---
const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => {
      const size = Math.random() * 4 + 1;
      const brightness = Math.random() * 0.8 + 0.2;
      const twinkleSpeed = Math.random() * 4 + 2;
      const colorVariation = Math.random();
      let starColor = '#ffffff';
      
      // Add some color variation (white, blue, yellow stars)
      if (colorVariation > 0.85) {
        starColor = '#bfdbfe'; // Blue star
      } else if (colorVariation > 0.7) {
        starColor = '#fef3c7'; // Yellow star
      }
      
      return {
        id: i,
        size: size,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        brightness: brightness,
        twinkleSpeed: twinkleSpeed,
        color: starColor,
        glowSize: size * 8,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-slate-950 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: star.left,
            top: star.top,
            backgroundColor: star.color,
            boxShadow: `
              0 0 ${star.glowSize}px ${star.color},
              0 0 ${star.glowSize * 2}px ${star.color}40,
              0 0 ${star.glowSize * 3}px ${star.color}20
            `,
          }}
          animate={{ 
            opacity: [
              star.brightness * 0.3, 
              star.brightness, 
              star.brightness * 0.5, 
              star.brightness
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: star.twinkleSpeed, 
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  );
};

// --- Countdown Timer Component ---
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 mt-4">
      {timeLeft.days > 0 && (
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-2 text-center min-w-[60px]">
          <div className="text-2xl font-bold text-blue-400">{timeLeft.days}</div>
          <div className="text-xs text-slate-400">Days</div>
        </div>
      )}
      <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-2 text-center min-w-[60px]">
        <div className="text-2xl font-bold text-blue-400">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-xs text-slate-400">Hours</div>
      </div>
      <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-2 text-center min-w-[60px]">
        <div className="text-2xl font-bold text-blue-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-xs text-slate-400">Mins</div>
      </div>
      <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-2 text-center min-w-[60px]">
        <div className="text-2xl font-bold text-blue-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-xs text-slate-400">Secs</div>
      </div>
    </div>
  );
};

// --- Navigation Bar Component ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Core Pillars', href: '#pillars' },
    { name: 'Events', href: '#events' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Resources', href: '#resources' },
    { name: 'Projects', href: '#projects' },
    { name: 'Team', href: '#team' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              IEEE AESS CITNC
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-slate-300 hover:text-blue-400 transition-colors font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-blue-400 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-slate-800"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="block py-2 text-slate-300 hover:text-blue-400 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-blue-500/30">
      <StarField />
      <Navbar />

      {/* 1. HERO SECTION */}
      <header id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-16">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/90 via-slate-800/80 to-slate-900/90"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='satellite' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='2' fill='%23ffffff' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23satellite)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&q=80')] bg-cover bg-center opacity-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-400">
            IEEE Aerospace and Electronic Systems Society
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Empowering students to lead in Aviation, Space, and Electronic Systems. 
            <br />
            <span className="text-blue-400 font-semibold">Join the Cambridge Institute of Technology AESS Chapter.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMAES010"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all inline-block text-center"
            >
              Join AESS
            </motion.a>
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#projects');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-blue-500 hover:bg-blue-500/10 px-8 py-4 rounded-lg font-bold text-lg transition-all inline-block text-center"
            >
              Explore Projects
            </motion.a>
          </div>
        </motion.div>
      </header>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-slate-900/80 backdrop-blur-md p-10 rounded-[2.5rem] border border-blue-500/30 shadow-2xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-4xl md:text-5xl font-black text-center mb-8 text-blue-400"
            >
              About Us
            </motion.h2>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                Welcome to the <span className="text-blue-400 font-semibold">IEEE Aerospace and Electronic Systems Society (AESS)</span> Chapter at Cambridge Institute of Technology, Kundana, Bangalore.
              </p>
              <p>
                We are a dynamic community of students passionate about advancing technology in aviation, space, and electronic systems. Our chapter is dedicated to empowering the next generation of aerospace engineers and researchers.
              </p>
              <p>
                Through hands-on workshops, technical lectures, competitions, and collaborative projects, we bridge the gap between theoretical knowledge and real-world applications in aerospace engineering.
              </p>
              <p>
                Join us in exploring the frontiers of space systems, radar technology, avionics, and navigation systems as we work together to advance technology for humanity.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE PILLARS SECTION */}
      <section id="pillars" className="relative z-10 py-20 px-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-black text-center mb-16 text-blue-400"
          >
            Our Core Pillars
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PillarCard
              icon="✈️"
              title="Avionics & Flight Systems"
              description="Developing the 'brain' of aircraft and spacecraft, focusing on integrated electronic systems, flight control, and cockpit automation."
            />
            <PillarCard
              icon="📡"
              title="Radar & Signal Processing"
              description="Exploring the frontier of sensing technology, from weather tracking and air traffic control to advanced synthetic aperture radar (SAR)."
            />
            <PillarCard
              icon="🛰️"
              title="Space Operations"
              description="Bridging the gap in satellite communications, orbital mechanics, and the ground stations required to maintain deep-space missions."
            />
            <PillarCard
              icon="🧭"
              title="Navigation & Guidance"
              description="Mastering the precision of GPS, inertial sensors, and autonomous guidance systems for drones and interstellar probes."
            />
          </div>
        </div>
      </section>

      {/* 4. EVENTS SECTION */}
      <section id="events" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-black text-center mb-16 text-blue-400"
          >
            Upcoming Events
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <EventCard
              type="Workshop"
              title="Satellite Ground Station 101"
              date="15th February 2026"
              dateObj="2026-02-15"
              description="A hands-on session on tracking LEO satellites using SDR (Software Defined Radio)."
              badge="Technical"
              badgeColor="bg-blue-500"
              registerUrl="https://forms.gle/example1"
            />
            <EventCard
              type="Guest Lecture"
              title="The Future of UAVs in Logistics"
              date="2nd March 2026"
              dateObj="2026-03-02"
              description="A talk by an industry expert on the integration of drones in modern supply chains."
              badge="Professional"
              badgeColor="bg-green-500"
              registerUrl="https://forms.gle/example2"
            />
            <EventCard
              type="Competition"
              title="CanSat Design Challenge"
              date="20th April 2026"
              dateObj="2026-04-20"
              description="Team-based event to design a probe that fits inside a soda can."
              badge="Upcoming"
              badgeColor="bg-purple-500"
              registerUrl="https://forms.gle/example3"
            />
          </div>
        </div>
      </section>

      {/* 5. DISTINGUISHED LECTURER PROGRAM SECTION */}
      <section id="dlp" className="relative z-10 py-20 px-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-slate-900/80 backdrop-blur-md p-10 rounded-[2.5rem] border border-blue-500/30 shadow-2xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-4xl md:text-5xl font-black text-center mb-8 text-blue-400"
            >
              AESS Distinguished Lecturer Program
            </motion.h2>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                One of the biggest perks of being an AESS member is exclusive access to the <span className="text-blue-400 font-semibold">Distinguished Lecturer Program (DLP)</span>. Our chapter regularly hosts world-class experts from leading aerospace organizations.
              </p>
              <p>
                These distinguished lecturers share cutting-edge research, industry insights, and career guidance in areas including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Advanced Radar Systems and Signal Processing</li>
                <li>Satellite Communication and Space Operations</li>
                <li>Avionics and Flight Control Systems</li>
                <li>Navigation and Guidance Technologies</li>
                <li>Autonomous Systems and AI in Aerospace</li>
              </ul>
              <p className="text-blue-400 font-semibold">
                Connect with global experts and expand your professional network through these exclusive sessions!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. BENEFITS OF JOINING AESS SECTION */}
      <section id="benefits" className="relative z-10 py-20 px-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-black text-center mb-16 text-blue-400"
          >
            Benefits of Joining AESS
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard
              icon="📚"
              title="AESS Systems Magazine"
              description="Stay current with the latest industry trends through our world-class monthly publication featuring tutorials and technical articles."
            />
            <BenefitCard
              icon="🌐"
              title="Global Networking"
              description="Connect with a niche community of aerospace professionals, from ISRO and NASA engineers to commercial aviation leaders."
            />
            <BenefitCard
              icon="🎓"
              title="Distinguished Lectures"
              description="Exclusive access to webinars and live sessions hosted by global experts in radar, space, and navigation systems."
            />
            <BenefitCard
              icon="👥"
              title="Technical Committees"
              description="Join specialized panels (like the Space Systems or Radar Systems Panel) to contribute to global engineering standards."
            />
            <BenefitCard
              icon="🚀"
              title="Career Advancement"
              description="Access to specialized job boards and mentorship programs specifically for the aerospace and defense sectors."
            />
            <BenefitCard
              icon="🎫"
              title="Conference Discounts"
              description="Get significant member-only registration discounts for major international symposia like the IEEE Radar Conference or DASC."
            />
          </div>
        </div>
      </section>

      {/* 7. RESOURCES SECTION */}
      <section id="resources" className="relative z-10 py-20 px-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-black text-center mb-16 text-blue-400"
          >
            Resource Library
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResourceLinkCard
              icon="📖"
              title="IEEE Xplore"
              description="Access thousands of peer-reviewed papers and journals in aerospace engineering."
              url="https://ieeexplore.ieee.org"
            />
            <ResourceLinkCard
              icon="📚"
              title="AESS Systems Magazine"
              description="Monthly publication with tutorials, technical articles, and industry insights."
              url="https://www.ieee-aess.org/publications/systems-magazine"
            />
            <ResourceLinkCard
              icon="🔬"
              title="Aerospace Journals"
              description="IEEE Transactions on Aerospace and Electronic Systems and related publications."
              url="https://www.ieee-aess.org/publications"
            />
            <ResourceLinkCard
              icon="📊"
              title="Workshop Materials"
              description="Access past workshop slide decks, presentations, and learning resources."
              url="#"
            />
            <ResourceLinkCard
              icon="📋"
              title="IEEE Standards"
              description="Aerospace and flight electronics standards and documentation."
              url="https://standards.ieee.org"
            />
            <ResourceLinkCard
              icon="🎓"
              title="Student Resources"
              description="Scholarships, grants, and opportunities for AESS student members."
              url="https://www.ieee-aess.org/education/students"
            />
          </div>
        </div>
      </section>

      {/* 8. PROJECTS SECTION */}
      <section id="projects" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-black text-center mb-16 text-blue-400"
          >
            Our Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              icon="🛰️"
              title="Satellite Ground Station"
              description="Our active ground station for tracking LEO satellites using Software Defined Radio (SDR) technology."
              status="Active"
            />
            <ProjectCard
              icon="🥫"
              title="CanSat Development"
              description="Designing and building CanSat probes that fit inside a standard soda can for atmospheric research."
              status="In Progress"
            />
            <ProjectCard
              icon="📡"
              title="Radar Signal Processing"
              description="Research projects on advanced radar signal processing and synthetic aperture radar (SAR) applications."
              status="Research"
            />
            <ProjectCard
              icon="✈️"
              title="UAV Systems"
              description="Developing autonomous guidance systems for unmanned aerial vehicles and drone applications."
              status="Development"
            />
            <ProjectCard
              icon="🧭"
              title="Navigation Systems"
              description="GPS and inertial navigation system integration projects for precision positioning."
              status="Research"
            />
            <ProjectCard
              icon="🛸"
              title="Space Communication"
              description="Exploring deep-space communication protocols and ground station operations."
              status="Planning"
            />
          </div>
        </div>
      </section>

      {/* 9. TEAM SECTION */}
      <section id="team" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-black text-center mb-16 text-blue-400"
          >
            Meet the Core Team
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamCard
              name="Dr. [Name]"
              position="Branch Counselor"
              role="Faculty Advisor"
            />
            <TeamCard
              name="[Name]"
              position="Chairman"
              role="Leadership"
            />
            <TeamCard
              name="[Name]"
              position="Vice Chairman"
              role="Operations"
            />
            <TeamCard
              name="[Name]"
              position="Secretary"
              role="Documentation"
            />
            <TeamCard
              name="[Name]"
              position="Treasurer"
              role="Finance"
            />
            <TeamCard
              name="[Name]"
              position="Webmaster"
              role="The person building this site!"
            />
            <TeamCard
              name="[Name]"
              position="Lead Researcher"
              role="Responsible for overseeing technical projects, white papers, and coordinating student-led research in aerospace domains."
            />
            <TeamCard
              name="[Name]"
              position="Research Coordinator"
              role="Manages data collection, stays updated on AESS journal calls, and assists members in publishing technical articles."
            />
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="relative z-10 py-12 px-6 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Left: Logo and Tagline */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">IEEE AESS CITNC</h3>
              <p className="text-slate-400 text-sm">
                Advancing Technology for Humanity
              </p>
            </div>

            {/* Center: Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="https://ieeexplore.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    IEEE Xplore
                  </a>
                </li>
                <li>
                  <a href="https://www.ieee-aess.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    AESS Global
                  </a>
                </li>
                <li>
                  <a href="https://www.ieee.org/membership/join/index.html" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    Join IEEE
                  </a>
                </li>
                <li>
                  <a href="https://ieee.citnc.co.in/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    IEEE CITNC
                  </a>
                </li>
                <li>
                  <a href="https://ieee.citnc.co.in/guidelines" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    IEEE Guidelines
                  </a>
                </li>
              </ul>
            </div>

            {/* Right: Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact Us</h4>
              <p className="text-slate-400 text-sm mb-2">
                Cambridge Institute of Technology
              </p>
              <p className="text-slate-400 text-sm mb-2">
                Kundana, Bangalore 562110
              </p>
              <a href="mailto:aesscitnc@gmail.com" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                aesscitnc@gmail.com
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            © 2026 IEEE AESS CITNC Cambridge Institute of Technology Chapter. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Pillar Card Component
const PillarCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="text-5xl mb-4 inline-block"
      role="img"
      aria-label={title}
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-bold mb-3 text-blue-400">{title}</h3>
    <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

// Event Card Component
const EventCard = ({ type, title, date, dateObj, description, badge, badgeColor, registerUrl }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ transformStyle: "preserve-3d" }}
    className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all"
  >
    <div className="flex items-start justify-between mb-4">
      <span className="text-xs text-slate-400 uppercase tracking-wider">{type}</span>
      <span className={`${badgeColor} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
        {badge}
      </span>
    </div>
    <h3 className="text-xl font-bold mb-2 text-blue-400">{title}</h3>
    <p className="text-blue-500 font-mono text-sm mb-4 font-semibold">{date}</p>
    {dateObj && <CountdownTimer targetDate={dateObj} />}
    <p className="text-slate-300 text-sm leading-relaxed mb-4">{description}</p>
    {registerUrl && (
      <motion.a
        href={registerUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-2 px-4 rounded-lg font-semibold text-sm transition-all shadow-[0_0_10px_rgba(59,130,246,0.5)]"
      >
        Register Now
      </motion.a>
    )}
  </motion.div>
);

// Benefit Card Component
const BenefitCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all"
  >
    <div className="text-4xl mb-4" role="img" aria-label={title}>{icon}</div>
    <h3 className="text-lg font-bold mb-3 text-blue-400">{title}</h3>
    <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

// Resource Link Card Component
const ResourceLinkCard = ({ icon, title, description, url }) => (
  <motion.a
    href={url}
    target={url !== '#' ? "_blank" : undefined}
    rel={url !== '#' ? "noopener noreferrer" : undefined}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all block"
  >
    <div className="text-4xl mb-4" role="img" aria-label={title}>{icon}</div>
    <h3 className="text-lg font-bold mb-3 text-blue-400">{title}</h3>
    <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
  </motion.a>
);

// Project Card Component
const ProjectCard = ({ icon, title, description, status }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -5, scale: 1.02, rotateY: 5 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ transformStyle: "preserve-3d" }}
    className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all"
  >
    <div className="text-5xl mb-4" role="img" aria-label={title}>{icon}</div>
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-xl font-bold text-blue-400">{title}</h3>
      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full border border-blue-500/30">
        {status}
      </span>
    </div>
    <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

// Team Card Component
const TeamCard = ({ name, position, role }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all text-center"
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold shadow-[0_0_20px_rgba(59,130,246,0.5)]"
    >
      {name.charAt(0)}
    </motion.div>
    <h3 className="text-lg font-bold mb-1 text-blue-400">{name}</h3>
    <p className="text-sm font-semibold text-slate-300 mb-2">{position}</p>
    <p className="text-xs text-slate-400">{role}</p>
  </motion.div>
);

export default App;
