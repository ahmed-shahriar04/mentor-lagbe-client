'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { getStoredAuth } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReceipt,
  faDownload,
  faPrint,
  faCheckCircle,
  faTimes,
  faGraduationCap,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    const auth = getStoredAuth();
    setUser(auth?.user || null);

    async function loadHistory() {
      try {
        const res = await api.getMyPayments();
        if (res.success && res.data) {
          setPayments(res.data);
        }
      } catch (err) {
        console.error('Failed to load payment history:', err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
            Billing & Invoices
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
            Payment History & Receipts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            View your verified Stripe transactions and download official payment vouchers.
          </p>
        </div>

        <Link
          href="/pricing"
          className="inline-flex items-center space-x-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition self-start sm:self-auto"
        >
          <FontAwesomeIcon icon={faCreditCard} className="w-3.5 h-3.5" />
          <span>View Pricing Plans</span>
        </Link>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
        </div>
      ) : payments.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-heading text-[11px]">
                <tr>
                  <th className="px-6 py-4 font-bold">Transaction / Invoice</th>
                  <th className="px-6 py-4 font-bold">Plan Details</th>
                  <th className="px-6 py-4 font-bold">Amount</th>
                  <th className="px-6 py-4 font-bold">Date & Time</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Receipt Voucher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p._id || p.stripeSessionId} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">
                      {p.transactionId ? p.transactionId.slice(-12) : p.stripeSessionId.slice(-12)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 block font-heading">
                        {p.planName === 'pro'
                          ? p.userRole === 'tutor'
                            ? 'Pro Tutor Plan'
                            : 'Pro Student Plan'
                          : p.planName}
                      </span>
                      <span className="text-[10px] text-slate-400 capitalize">Role: {p.userRole}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-600 text-sm">
                      ${p.amount?.toFixed(2)} {p.currency || 'USD'}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {p.paidAt ? new Date(p.paidAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }) : 'Recent'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-emerald-600" />
                        <span>Paid & Verified</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedReceipt(p)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition shadow-sm"
                      >
                        <FontAwesomeIcon icon={faReceipt} className="w-3 h-3" />
                        <span>View Voucher</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faReceipt} className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            No Payment Transactions Found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
            You are currently on the Free tier. When you upgrade to Pro via Stripe, your verified invoices and receipts will appear here.
          </p>
          <div className="mt-6">
            <Link
              href="/pricing"
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition inline-block"
            >
              Explore Pro Plans
            </Link>
          </div>
        </div>
      )}

      {/* Official Printable Receipt Voucher Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 print:m-0 print:p-0 print:border-none print:shadow-none">
            {/* Close Button (Hidden on Print) */}
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition print:hidden"
            >
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </button>

            {/* Printable Voucher Content */}
            <div id="printable-voucher" className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md">
                    <FontAwesomeIcon icon={faGraduationCap} className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 font-heading">
                      Mentor<span className="text-emerald-600">Lagbe</span>
                    </h2>
                    <p className="text-[10px] text-slate-400">Smart Tuition & Mentorship Platform</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Official Voucher
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">Dhanmondi 27, Dhaka-1209</p>
                </div>
              </div>

              {/* Receipt Meta */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-slate-400 font-medium">Billed To:</p>
                  <p className="font-bold text-slate-900 mt-0.5">{selectedReceipt.userName || user?.name || 'Customer'}</p>
                  <p className="text-slate-500">{selectedReceipt.userEmail || user?.email}</p>
                  <p className="text-[10px] text-slate-400 capitalize mt-0.5">Role: {selectedReceipt.userRole || user?.role}</p>
                </div>
                <div className="text-right space-y-1">
                  <div>
                    <span className="text-slate-400">Invoice ID: </span>
                    <span className="font-mono font-bold text-slate-800">
                      INV-{(selectedReceipt.transactionId || selectedReceipt.stripeSessionId || 'ML').slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Payment Date: </span>
                    <span className="font-semibold text-slate-800">
                      {selectedReceipt.paidAt ? new Date(selectedReceipt.paidAt).toLocaleDateString() : 'Today'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Gateway: </span>
                    <span className="font-semibold text-slate-800">Stripe Checkout</span>
                  </div>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-heading">
                    <tr>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3 text-center">Type</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-900">
                          {selectedReceipt.planName === 'pro'
                            ? selectedReceipt.userRole === 'tutor'
                              ? 'MentorLagbe Pro Tutor Plan'
                              : 'MentorLagbe Pro Student Plan'
                            : selectedReceipt.planName}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {selectedReceipt.userRole === 'tutor'
                            ? 'Unlimited tuition postings, verified mentor badge & priority search ranking.'
                            : 'Unlimited bookmarks, direct mentor contacts & priority booking queue.'}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-center text-slate-500 capitalize">
                        One-Time
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        ${selectedReceipt.amount?.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 border-t border-slate-200">
                    <tr>
                      <td colSpan="2" className="px-4 py-3 font-bold text-slate-800 text-right">
                        Total Paid:
                      </td>
                      <td className="px-4 py-3 font-extrabold text-emerald-600 text-right text-sm">
                        ${selectedReceipt.amount?.toFixed(2)} {selectedReceipt.currency || 'USD'}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Verified Stamp and Note */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-emerald-600" />
                  <span>Verified Electronic Payment Confirmation</span>
                </div>
                <div className="border-2 border-emerald-600 text-emerald-700 px-3 py-1 rounded-xl font-extrabold text-xs uppercase tracking-widest transform rotate-[-3deg]">
                  PAID IN FULL
                </div>
              </div>
            </div>

            {/* Modal Actions (Hidden on Print) */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-end space-x-3 print:hidden">
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handlePrintReceipt}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition flex items-center space-x-1.5"
              >
                <FontAwesomeIcon icon={faPrint} className="w-3.5 h-3.5" />
                <span>Print or Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
