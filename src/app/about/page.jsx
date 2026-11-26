'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faShieldAlt,
  faUsers,
  faChalkboardTeacher,
  faHandshake,
  faCheckCircle,
  faLightbulb,
  faClock,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

export default function AboutPage() {
  const pillars = [
    {
      icon: faShieldAlt,
      title: 'Verified Educator Network',
      desc: 'Every mentor goes through rigorous academic credentials verification, ensuring learners learn from trusted university graduates and experienced teachers.',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: faHandshake,
      title: 'Zero Middleman Exploitation',
      desc: 'Traditional tuition media often siphon 50% or more from teachers. MentorLagbe creates direct, transparent connections with zero hidden deductions.',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: faClock,
      title: 'Structured Shifts & Routines',
      desc: 'No more confusing or unpredictable class schedules. Each batch clearly outlines days per week, monthly fees, and shift times (morning, afternoon, or evening).',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: faGraduationCap,
      title: 'Board & Admission Focus',
      desc: 'From SSC and HSC syllabus mastery to engineering and medical admission coaching, find dedicated subject-wise batches tailored to Bangladesh curriculum.',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  const targetAudiences = [
    {
      role: 'For Students & Learners',
      subtitle: 'Achieve Academic Excellence',
      points: [
        'Search tuition batches by subject, mode (Online/Offline), and budget',
        'Direct application tracking with real-time acceptance notifications',
        'Bookmarking system to save and compare favorite mentors',
        'Access to genuine verified mentor contact details upon acceptance',
      ],
      href: '/tuitions',
      btnText: 'Browse Tuitions',
      color: 'border-blue-200 bg-blue-50/40',
      btnColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      role: 'For Mentors & Educators',
      subtitle: 'Build a Sustainable Tutoring Career',
      points: [
        'Post and manage tuition batches with custom schedules and locations',
        'Review student applications, preferred days, and academic needs',
        'Official Blue Verified Pro Mentor badge to build instant trust',
        'Direct student communication unlocked immediately on enrollment',
      ],
      href: '/sign-up',
      btnText: 'Become a Mentor',
      color: 'border-emerald-200 bg-emerald-50/40',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Breadcrumb & Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold border border-emerald-200/50 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>About MentorLagbe</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Empowering Education Across Bangladesh
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            MentorLagbe is a next-generation smart tuition matching and mentorship platform designed to connect qualified university graduates, experienced lecturers, and passionate learners safely and transparently.
          </p>
        </div>

        {/* Our Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faLightbulb} className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mb-3">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To eliminate the hassles, safety doubts, and middleman commissions of finding reliable home or online tuition. We believe every student in Bangladesh deserves access to qualified mentors who genuinely understand their curriculum and learning pace.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-700">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
              Transparent, Direct, and Trust-Centric
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faUsers} className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mb-3">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To build Bangladesh's most dependable academic mentorship ecosystem where tutors earn fair compensation for their expertise, and learners from all boards (Dhaka, Rajshahi, Chittagong, English Medium & Madrasah) achieve their dream university admissions and board exam results.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center text-xs font-bold text-blue-700">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
              Accessible Education for Every Academic Stage
            </div>
          </motion.div>
        </div>

        {/* 4 Core Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
              Why We Are Different
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
              The 4 Pillars of MentorLagbe
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${item.color}`}>
                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-heading mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Who We Serve */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
              Platform Benefits
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
              Designed For Both Learners & Tutors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {targetAudiences.map((aud, i) => (
              <div
                key={i}
                className={`p-8 sm:p-10 rounded-3xl border ${aud.color} bg-white shadow-sm flex flex-col justify-between`}
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                    {aud.role}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 font-heading mt-1 mb-4">
                    {aud.subtitle}
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {aud.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start text-xs sm:text-sm text-slate-700">
                        <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-emerald-600 mr-2.5 mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Link
                    href={aud.href}
                    className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition shadow-sm ${aud.btnColor}`}
                  >
                    <span>{aud.btnText}</span>
                    <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-8 sm:p-14 shadow-xl text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Ready to Upgrade Your Academic Journey?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Join hundreds of successful learners and verified mentors across Dhaka, Chittagong, Sylhet, and all over Bangladesh today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/tuitions"
                className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition shadow-lg"
              >
                Browse All Batches
              </Link>
              <Link
                href="/sign-up"
                className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-lg border border-emerald-500"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
