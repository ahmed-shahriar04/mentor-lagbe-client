import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Smart Tuition & Mentorship Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              Find Your <span className="text-emerald-600">Ideal Tutor</span> or Mentorship Batch Today
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Connect with top university graduates, experienced lecturers, and verified mentors in Bangladesh. Filter by subject, class level, mode, and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Link
                href="/tuitions"
                className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/25 transition transform hover:-translate-y-0.5 text-center"
              >
                Browse All Tuitions
              </Link>
              <Link
                href="/sign-up"
                className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl transition text-center"
              >
                Register as a Tutor
              </Link>
            </div>
            {/* Quick stats mini-bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 border-t border-slate-200/80">
              <div>
                <p className="text-2xl font-extrabold text-slate-900 font-heading">500+</p>
                <p className="text-xs text-slate-500">Verified Tutors</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 font-heading">12,000+</p>
                <p className="text-xs text-slate-500">Enrolled Students</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 font-heading">99.4%</p>
                <p className="text-xs text-slate-500">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Hero Image Illustration */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
                  alt="Students learning and receiving mentorship"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
              {/* Floating review card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">BUET & DU Mentors</p>
                  <p className="text-[10px] text-slate-500">Subject-wise 1-on-1 & Batch Care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
