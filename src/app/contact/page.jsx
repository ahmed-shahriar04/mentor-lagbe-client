'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhoneAlt,
  faClock,
  faPaperPlane,
  faCheckCircle,
  faQuestionCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Student Inquiry',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return toast.error('Please fill in your name, email, and message.');
    }

    setSubmitting(true);
    // Simulate instant sending
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Thank you! Your message has been sent to the MentorLagbe support team. We will respond within 24 hours.', {
        duration: 5000,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'Student Inquiry',
        subject: '',
        message: '',
      });
    }, 700);
  };

  const faqs = [
    {
      q: 'How do I apply for a tuition batch as a student?',
      a: 'Browse through our approved tuition batches on the Browse Tuitions page, click on any batch to view details, and click "Apply For This Tuition". The mentor will receive your schedule preferences and contact you upon acceptance.',
    },
    {
      q: 'How does mentor verification work?',
      a: 'Tutors upload proof of academic credentials, student ID/certificates, and board results. Verified mentors receive the official blue Pro Verified Mentor badge on their profile and batch listings.',
    },
    {
      q: 'Is online payment secure on MentorLagbe?',
      a: 'Yes. All upgrade transactions are handled via Stripe Checkout with end-to-end encryption. You receive an official downloadable PDF voucher immediately upon payment.',
    },
    {
      q: 'What if I have an emergency scheduling issue?',
      a: 'You can directly contact your accepted mentor via their verified phone number unlocked in your Student Dashboard or reach out to our emergency support hotline.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold border border-emerald-200/50 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>24/7 Academic Support</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Get in Touch With Us
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Have questions about tuition batches, tutor verification, or student applications? Our dedicated support team in Dhaka is here to help.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">Our Office</h4>
              <p className="text-xs font-bold text-slate-900 mt-1">Dhanmondi 27</p>
              <p className="text-xs text-slate-500">Dhaka-1209, Bangladesh</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">Email Us</h4>
              <p className="text-xs font-bold text-slate-900 mt-1">support@mentorlagbe.com</p>
              <p className="text-xs text-slate-500">Fast 24-hour response</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faPhoneAlt} className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">Hotline</h4>
              <p className="text-xs font-bold text-slate-900 mt-1">+880 1700-000000</p>
              <p className="text-xs text-slate-500">Toll-free student help</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faClock} className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">Operating Hours</h4>
              <p className="text-xs font-bold text-slate-900 mt-1">Sat – Thu</p>
              <p className="text-xs text-slate-500">9:00 AM – 9:00 PM BST</p>
            </div>
          </div>
        </div>

        {/* Contact Form & FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">Send Us a Direct Message</h3>
              <p className="text-xs text-slate-500 mt-1">Fill out the form below and an academic advisor will get back to you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sadia Rahman"
                    required
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. student@gmail.com"
                    required
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 017XXXXXXXX"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50/50"
                  >
                    <option value="Student Inquiry">Student & Tuition Inquiry</option>
                    <option value="Tutor Verification">Tutor Application & Verification</option>
                    <option value="Payment/Stripe">Payment & Stripe Invoicing</option>
                    <option value="Report an Issue">Report an Issue / Academic Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we assist you?"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us more about your query or batch requirements..."
                  required
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50/50"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-7 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-md shadow-emerald-600/25 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick FAQ Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-6">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faQuestionCircle} className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">Frequently Asked Questions</h3>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <h5 className="text-xs font-bold text-slate-900">{faq.q}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency note */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-green-600 text-white shadow-md">
              <div className="flex items-center space-x-2 mb-2">
                <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-emerald-200" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Fast Turnaround</h4>
              </div>
              <p className="text-xs text-emerald-50 leading-relaxed">
                Most student queries and tutor batch verification submissions are reviewed and answered within 2 hours during active operating shifts.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
