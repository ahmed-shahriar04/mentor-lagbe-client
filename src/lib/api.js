import { getStoredAuth } from './auth-client';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://mentor-lagbe-server-xi.vercel.app/api';

/**
 * Universal API fetcher with automatic JWT Authorization header
 */
export async function fetchApi(endpoint, options = {}) {
  const auth = getStoredAuth();
  const token = auth?.token;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = `${API_BASE}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data?.message || `Request failed with status ${res.status}`;
      const error = new Error(errorMsg);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      const netError = new Error(`Cannot connect to backend server at ${API_BASE}. Please make sure your server is running.`);
      netError.isNetworkError = true;
      throw netError;
    }
    throw error;
  }
}

// API Service Methods
export const api = {
  // Tuitions
  getPublicTuitions: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return fetchApi(`/tuitions/public?${qs}`);
  },
  getFeaturedTuitions: () => fetchApi('/tuitions/featured'),
  getTuitionDetails: (id) => fetchApi(`/tuitions/${id}`),
  createTuition: (tuitionData) => fetchApi('/tuitions', { method: 'POST', body: JSON.stringify(tuitionData) }),
  getMyTuitions: () => fetchApi('/tuitions/tutor/my-tuitions'),
  updateTuition: (id, data) => fetchApi(`/tuitions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTuition: (id) => fetchApi(`/tuitions/${id}`, { method: 'DELETE' }),
  toggleTuitionStatus: (id) => fetchApi(`/tuitions/${id}/toggle-status`, { method: 'PATCH' }),
  getAdminTuitions: () => fetchApi('/tuitions/admin/all'),
  updateTuitionApproval: (id, approvalStatus) => fetchApi(`/tuitions/${id}/approval`, { method: 'PATCH', body: JSON.stringify({ approvalStatus }) }),

  // Applications
  applyForTuition: (appData) => fetchApi('/applications', { method: 'POST', body: JSON.stringify(appData) }),
  getMyApplications: () => fetchApi('/applications/student/my'),
  cancelApplication: (id) => fetchApi(`/applications/${id}`, { method: 'DELETE' }),
  getTutorApplicants: () => fetchApi('/applications/tutor/applicants'),
  updateApplicationStatus: (id, status) => fetchApi(`/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getStudentStats: () => fetchApi('/applications/student/stats'),
  getTutorStats: () => fetchApi('/applications/tutor/stats'),

  // Payments
  createCheckoutSession: (payload) =>
    fetchApi('/payments/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify(payload || {}),
    }),
  verifySession: (sessionId) => fetchApi(`/payments/verify-session/${sessionId}`),
  getMyPayments: () => fetchApi('/payments/my-history'),
  getAdminTransactions: () => fetchApi('/payments/admin/all'),

  // Users & Profile
  getCurrentUser: () => fetchApi('/users/me'),
  updateProfile: (profileData) => fetchApi('/users/profile', { method: 'PATCH', body: JSON.stringify(profileData) }),
  deleteMyAccount: () => fetchApi('/users/profile/me', { method: 'DELETE' }),
  getAllUsers: () => fetchApi('/users'),
  updateUserRole: (id, role) => fetchApi(`/users/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) }),
  deleteUser: (id) => fetchApi(`/users/${id}`, { method: 'DELETE' }),
  getAdminStats: () => fetchApi('/users/admin/stats'),

  // Bookmarks
  getBookmarks: () => fetchApi('/bookmarks'),
  addBookmark: (tuitionId) => fetchApi(`/bookmarks/${tuitionId}`, { method: 'POST' }),
  removeBookmark: (tuitionId) => fetchApi(`/bookmarks/${tuitionId}`, { method: 'DELETE' }),

  // Reviews
  getTuitionReviews: (tuitionId) => fetchApi(`/reviews/tuition/${tuitionId}`),
  submitReview: (tuitionId, reviewData) => fetchApi(`/reviews/tuition/${tuitionId}`, { method: 'POST', body: JSON.stringify(reviewData) }),
};
