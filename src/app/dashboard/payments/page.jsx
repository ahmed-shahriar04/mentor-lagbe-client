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

  const handlePrintReceipt = (receipt) => {
    const p = receipt || selectedReceipt;
    if (!p) return;

    const invoiceNo = `INV-${(p.transactionId || p.stripeSessionId || 'ML').slice(-8).toUpperCase()}`;
    const paymentDate = p.paidAt
      ? new Date(p.paidAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : 'Today';
    const planTitle =
      p.planName === 'pro'
        ? p.userRole === 'tutor'
          ? 'MentorLagbe Pro Tutor Plan (1 Month)'
          : 'MentorLagbe Pro Student Plan (1 Month)'
        : p.planName;
    const planDesc =
      p.userRole === 'tutor'
        ? 'Unlimited tuition batch postings, verified mentor badge & priority search ranking for 1 month.'
        : 'Unlimited bookmarks, direct mentor contacts & priority booking queue for 1 month.';
    const amountStr = `$${Number(p.amount || 0).toFixed(2)} ${p.currency || 'USD'}`;
    const userName = p.userName || user?.name || 'Customer';
    const userEmail = p.userEmail || user?.email || '';
    const userRole = p.userRole || user?.role || 'student';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Invoice Voucher - ${invoiceNo}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 20mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      background: #ffffff;
      color: #0f172a;
      font-size: 13px;
      line-height: 1.5;
    }
    body {
      padding: 24px;
    }
    .voucher-card {
      max-width: 680px;
      margin: 0 auto;
      border: 1.5px solid #cbd5e1;
      border-radius: 20px;
      padding: 32px 36px;
      background: #ffffff;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 22px;
      margin-bottom: 22px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: #059669;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }
    .logo-icon svg {
      width: 26px;
      height: 26px;
      fill: #ffffff;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .brand-title span {
      color: #059669;
    }
    .brand-sub {
      font-size: 11px;
      color: #64748b;
      margin-top: 1px;
    }
    .badge-voucher {
      background: #ecfdf5;
      color: #065f46;
      border: 1.5px solid #a7f3d0;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: inline-block;
    }
    .address {
      font-size: 11px;
      color: #64748b;
      margin-top: 6px;
      text-align: right;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 22px;
    }
    .meta-title {
      font-size: 11px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 3px;
    }
    .meta-value-bold {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
    }
    .meta-sub {
      font-size: 12px;
      color: #475569;
      margin-top: 2px;
    }
    .meta-right {
      text-align: right;
      font-size: 12px;
    }
    .meta-row {
      margin-top: 4px;
    }
    .invoice-id {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-weight: 700;
      color: #0f172a;
    }
    .table-box {
      border: 1.5px solid #e2e8f0;
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 22px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    th {
      background: #f1f5f9;
      padding: 12px 16px;
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      color: #475569;
      border-bottom: 1px solid #e2e8f0;
    }
    td {
      padding: 14px 16px;
      font-size: 13px;
      border-bottom: 1px solid #f1f5f9;
    }
    .item-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 14px;
    }
    .item-desc {
      font-size: 11px;
      color: #64748b;
      margin-top: 3px;
      line-height: 1.4;
    }
    tfoot td {
      background: #f8fafc;
      font-weight: 700;
      border-top: 1.5px solid #e2e8f0;
      border-bottom: none;
    }
    .total-amount {
      font-size: 16px;
      font-weight: 800;
      color: #059669;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 6px;
    }
    .verified-note {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #059669;
      font-weight: 600;
    }
    .paid-stamp {
      border: 2px solid #059669;
      color: #059669;
      padding: 6px 16px;
      border-radius: 10px;
      font-weight: 900;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      transform: rotate(-2deg);
    }
  </style>
</head>
<body>
  <div class="voucher-card">
    <div class="header">
      <div class="brand">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
        </div>
        <div>
          <div class="brand-title">Mentor<span>Lagbe</span></div>
          <div class="brand-sub">Smart Tuition & Mentorship Platform</div>
        </div>
      </div>
      <div>
        <div class="badge-voucher">Official Voucher</div>
        <div class="address">Dhanmondi 27, Dhaka-1209, Bangladesh</div>
      </div>
    </div>

    <div class="meta-grid">
      <div>
        <div class="meta-title">Billed To</div>
        <div class="meta-value-bold">${userName}</div>
        <div class="meta-sub">${userEmail}</div>
        <div class="meta-sub" style="text-transform: capitalize;">Role: ${userRole}</div>
      </div>
      <div class="meta-right">
        <div><span style="color:#64748b;">Invoice ID: </span><span class="invoice-id">${invoiceNo}</span></div>
        <div class="meta-row"><span style="color:#64748b;">Payment Date: </span><strong>${paymentDate}</strong></div>
        <div class="meta-row"><span style="color:#64748b;">Billing Cycle: </span><strong>1 Month (Monthly)</strong></div>
        <div class="meta-row"><span style="color:#64748b;">Gateway: </span><strong>Stripe Checkout</strong></div>
      </div>
    </div>

    <div class="table-box">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align: center;">Billing Cycle</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="item-title">${planTitle}</div>
              <div class="item-desc">${planDesc}</div>
            </td>
            <td style="text-align: center; color: #475569; font-weight: 600;">1 Month</td>
            <td style="text-align: right; font-weight: 700; font-size: 14px;">${amountStr}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="text-align: right; padding-right: 18px;">Total Paid:</td>
            <td style="text-align: right;" class="total-amount">${amountStr}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="footer">
      <div class="verified-note">
        <svg style="width: 18px; height: 18px; fill: #059669;" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
        <span>Verified Electronic Payment Confirmation</span>
      </div>
      <div class="paid-stamp">PAID IN FULL</div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    };
  </script>
</body>
</html>`;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
    } else {
      window.print();
    }
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
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                    </svg>
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
                    <span className="text-slate-400">Billing Cycle: </span>
                    <span className="font-semibold text-slate-800">1 Month (Monthly)</span>
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
                        1 Month (Monthly)
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
