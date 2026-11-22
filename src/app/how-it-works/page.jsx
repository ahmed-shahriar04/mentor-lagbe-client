'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faUserGraduate,
  faChalkboardTeacher,
  faCreditCard,
  faShieldCheck,
  faComments,
  faCheckCircle,
  faArrowRight,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function HowItWorksPage() {
  const studentSteps = [
    {
      step: '01',
      title: 'Search & Filter Batches',
      desc: 'Browse hundreds of verified tuitions by subject, class level, mode (Online/Offline), and fee budget using advanced real-time filters.',
      icon: faSearch,
    },
    {
      step: '02',
      title: 'Free Application Submission',
      desc: 'Select preferred days, pick class shift timetable, and provide notes for your mentor with zero upfront charge.',
      icon: faCalendarCheck,
    },
    {
      step: '03',
      title: 'Mentor Confirmation & Direct Call',
      desc: 'Once the tutor accepts your application, view mentor phone number, platform links, and routine schedule instantly.',
      icon: faComments,
    },
    {
      step: '04',
      title: 'Optional Pro Student Upgrade ($10)',
      desc: 'Get unlimited tuition bookmarks, verified Student Pro badge, and priority review queue for limited seat batches.',
      icon: faCreditCard,
    },
  ];

  const tutorSteps = [
    {
      step: '01',
      title: 'Register & Complete Profile',
      desc: 'Create your Tutor account, upload a genuine photo, fill in your educational background, university, and contact info.',
      icon: faUserGraduate,
    },
    {
      step: '02',
      title: 'Post Tuition Batches',
      desc: 'Create tuition listings with title, subject, class level, days per week, preferred class time shift, and detailed syllabus.',
      icon: faChalkboardTeacher,
    },
    {
      step: '03',
      title: 'Admin Verification & Go-Live',
      desc: 'Our academic administrators verify listings for quality and authenticity before publishing them publicly on the portal.',
      icon: faShieldCheck,
    },
    {
      step: '04',
      title: 'Manage Applicants & Pro Perks ($15)',
      desc: 'Accept or reject student applications. Free tutors can post up to 2 batches; Pro tutors unlock unlimited listings and verified badge.',
      icon: faCreditCard,
    },
  ];

  const faqs = [
    {
      q: 'Is it completely free to browse and apply for tuitions?',
      a: 'Yes! Both browsing approved tuitions and submitting student applications are 100% free with standard accounts. Upgrading to Pro is an optional one-time feature for unlimited bookmarks or unlimited tutor postings.',
    },
    {
      q: 'How are mentors verified on MentorLagbe?',
      a: 'Every tuition listing goes through an administrative review queue. Admins inspect the syllabus, fee reasonableness, and contact authenticity before approving posts for public listing.',
    },
    {
      q: 'What payment methods are supported for Pro upgrades?',
      a: 'We support all major international and local cards via Stripe encrypted checkout (Visa, MasterCard, American Express). After payment, your account badge is activated immediately.',
    },
    {
      q: 'How does the timetable and routine work?',
      a: 'Tutors configure their weekly class frequency and preferred time shift (Morning, Afternoon, Evening, Night). Students can pick matching days in their application modal to finalize their routine.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Step-by-Step Guide
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-3">
            How MentorLagbe Works
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            A transparent and secure bridge connecting dedicated students with verified university mentors across Bangladesh.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tuitions"
              className="px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition"
            >
              Browse Tuitions
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition"
            >
              View Pro Plans
            </Link>
          </div>
        </div>

        {/* Section 1: For Students */}
        <div className="mb-20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <FontAwesomeIcon icon={faUserGraduate} className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-heading">
                Learner Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                For Students & Parents
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentSteps.map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FontAwesomeIcon icon={s.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 font-heading">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: For Tutors */}
        <div className="mb-20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <FontAwesomeIcon icon={faChalkboardTeacher} className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
                Educator Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                For Mentors & Coaching Teachers
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutorSteps.map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <FontAwesomeIcon icon={s.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 font-heading">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Frequently Asked Questions */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
              Answers & Information
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-bold text-slate-900 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                  {f.q}
                </h4>
                <p className="text-xs text-slate-600 mt-2 pl-6 leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 sm:p-12 text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Ready to Begin Your Mentorship Journey?
          </h3>
          <p className="text-emerald-100 text-sm max-w-xl mx-auto mt-2">
            Join thousands of students and mentors achieving academic excellence with MentorLagbe today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/tuitions"
              className="px-6 py-3 text-sm font-bold bg-white text-emerald-800 hover:bg-slate-100 rounded-xl transition shadow-md"
            >
              Explore Batches
            </Link>
            <Link
              href="/sign-up"
              className="px-6 py-3 text-sm font-bold bg-emerald-800/60 hover:bg-emerald-800 text-white rounded-xl border border-emerald-400/40 transition"
            >
              Register Free Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
