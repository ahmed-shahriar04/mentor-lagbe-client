'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function AdminTransactionsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getAdminTransactions();
        if (res.success) setPayments(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          Stripe Subscription Transactions
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Detailed log of all Pro Plan upgrades and transaction records.
        </p>
      </div>

      {loading ? (
        <div className="h-64 bg-white rounded-2xl animate-pulse"></div>
      ) : payments.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-5 py-3.5">Role</th>
                  <th className="px-5 py-3.5">Amount</th>
                  <th className="px-5 py-3.5">Transaction ID</th>
                  <th className="px-5 py-3.5">Payment Date</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {p.userName}
                      <span className="block text-[11px] text-slate-400 font-mono font-normal">{p.userEmail}</span>
                    </td>
                    <td className="px-5 py-4 uppercase font-bold text-slate-700">{p.userRole}</td>
                    <td className="px-5 py-4 font-bold text-emerald-600">${p.amount} {p.currency}</td>
                    <td className="px-5 py-4 font-mono text-slate-700 text-[11px] truncate max-w-xs">{p.transactionId}</td>
                    <td className="px-5 py-4">{new Date(p.paidAt).toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {p.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500">No payment records found.</p>
        </div>
      )}
    </div>
  );
}
