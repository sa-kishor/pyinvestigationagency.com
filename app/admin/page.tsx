'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [tab, setTab] = useState('inquiries');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState('');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const storedEmail = localStorage.getItem('adminEmail');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    setAdminEmail(storedEmail || '');
    setIsAuthenticated(true);
  }, [router]);

  // Load data when tab changes (only if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [tab, isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/export?type=${tab}&format=json`);
      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      setData([]);
    }
    setLoading(false);
  };

  const approveReview = async (id: number) => {
    setActionLoading(id);
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'APPROVED' }),
      });
      if (response.ok) {
        setMessage('✅ Review approved!');
        loadData();
      }
    } catch (error) {
      setMessage('❌ Failed to approve review');
    }
    setActionLoading(null);
  };

  const rejectReview = async (id: number) => {
    setActionLoading(id);
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'REJECTED' }),
      });
      if (response.ok) {
        setMessage('✅ Review rejected!');
        loadData();
      }
    } catch (error) {
      setMessage('❌ Failed to reject review');
    }
    setActionLoading(null);
  };

  const deleteReview = async (id: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setActionLoading(id);
      try {
        const response = await fetch(`/api/testimonials/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setMessage('✅ Review deleted!');
          loadData();
        }
      } catch (error) {
        setMessage('❌ Failed to delete review');
      }
      setActionLoading(null);
    }
  };

  const downloadCSV = async () => {
    setExporting(true);
    try {
      const response = await fetch(`/api/export?type=${tab}&format=csv`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tab}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setMessage('✅ CSV downloaded successfully!');
    } catch (error) {
      setMessage('❌ Failed to download CSV');
    }
    setExporting(false);
  };

  const sendViaEmail = async () => {
    if (!email) {
      setMessage('❌ Please enter an email address');
      return;
    }
    setExporting(true);
    try {
      const response = await fetch('/api/export-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: tab, email }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(`✅ CSV sent to ${email}!`);
        setEmail('');
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to send email');
    }
    setExporting(false);
  };

  const getStatusClass = (status: string) => {
    const baseClass = 'px-3 py-1 rounded text-sm font-semibold';
    if (status === 'APPROVED') {
      return `${baseClass} bg-green-900 text-green-400`;
    } else if (status === 'REJECTED') {
      return `${baseClass} bg-red-900 text-red-400`;
    } else {
      return `${baseClass} bg-yellow-900 text-yellow-400`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Loading/Auth Check */}
      {!isAuthenticated && (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      )}

      {isAuthenticated && (
        <div className="max-w-7xl mx-auto">
          {/* Header with Logout */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Logged in as: <span className="text-brand-gold">{adminEmail}</span></p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setTab('inquiries')}
            className={`pb-4 px-6 font-semibold transition ${
              tab === 'inquiries'
                ? 'border-b-2 border-yellow-500 text-yellow-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Contact Forms ({data.length})
          </button>
          <button
            onClick={() => setTab('visitors')}
            className={`pb-4 px-6 font-semibold transition ${
              tab === 'visitors'
                ? 'border-b-2 border-yellow-500 text-yellow-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Visitor Forms ({data.length})
          </button>
          <button
            onClick={() => setTab('testimonials')}
            className={`pb-4 px-6 font-semibold transition ${
              tab === 'testimonials'
                ? 'border-b-2 border-yellow-500 text-yellow-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Reviews ({data.length})
          </button>
        </div>

        {/* Export Options */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Export Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={downloadCSV}
              disabled={exporting || data.length === 0}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              {exporting ? '⏳ Processing...' : '📥 Download as CSV'}
            </button>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={sendViaEmail}
                disabled={exporting || data.length === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {exporting ? '⏳' : '📧'}
              </button>
            </div>
          </div>
          {message && (
            <p className={`mt-4 ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </div>

        {/* Data Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <p className="p-6 text-center">Loading...</p>
            ) : data.length === 0 ? (
              <p className="p-6 text-center text-gray-400">No data yet</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700 border-b border-gray-600">
                    {tab === 'inquiries' ? (
                      <>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Phone</th>
                        <th className="px-6 py-3 text-left">Service</th>
                        <th className="px-6 py-3 text-left">Message</th>
                        <th className="px-6 py-3 text-left">Date</th>
                      </>
                    ) : tab === 'visitors' ? (
                      <>
                        <th className="px-6 py-3 text-left">Full Name</th>
                        <th className="px-6 py-3 text-left">Phone Number</th>
                        <th className="px-6 py-3 text-left">WhatsApp Number</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Submitted At</th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Rating</th>
                        <th className="px-6 py-3 text-left">Review</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Date</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700 transition">
                      {tab === 'inquiries' ? (
                        <>
                          <td className="px-6 py-4">{item.name}</td>
                          <td className="px-6 py-4 text-blue-400">{item.email}</td>
                          <td className="px-6 py-4">{item.phone}</td>
                          <td className="px-6 py-4 text-yellow-400">{item.serviceType}</td>
                          <td className="px-6 py-4 truncate max-w-xs">{item.message}</td>
                          <td className="px-6 py-4 text-gray-400">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                        </>
                      ) : tab === 'visitors' ? (
                        <>
                          <td className="px-6 py-4 font-semibold">{item.fullName}</td>
                          <td className="px-6 py-4">{item.phoneNumber}</td>
                          <td className="px-6 py-4 text-green-400">{item.whatsappNumber || 'Not provided'}</td>
                          <td className="px-6 py-4 text-blue-400">{item.email}</td>
                          <td className="px-6 py-4 text-gray-400">
                            {new Date(item.submittedAt).toLocaleDateString()}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4">{item.name}</td>
                          <td className="px-6 py-4">{'⭐'.repeat(item.rating || 5)}</td>
                          <td className="px-6 py-4 truncate max-w-xs">{item.quote || item.text}</td>
                          <td className="px-6 py-4">
                            <span className={getStatusClass(item.status || 'APPROVED')}>
                              {item.status || 'APPROVED'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-400">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 space-x-2">
                            {item.status !== 'APPROVED' && (
                              <button
                                onClick={() => approveReview(item.id)}
                                disabled={actionLoading === item.id}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm transition"
                              >
                                {actionLoading === item.id ? '...' : 'Approve'}
                              </button>
                            )}
                            {item.status !== 'REJECTED' && (
                              <button
                                onClick={() => rejectReview(item.id)}
                                disabled={actionLoading === item.id}
                                className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm transition"
                              >
                                {actionLoading === item.id ? '...' : 'Reject'}
                              </button>
                            )}
                            <button
                              onClick={() => deleteReview(item.id)}
                              disabled={actionLoading === item.id}
                              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm transition"
                            >
                              {actionLoading === item.id ? '...' : 'Delete'}
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <p className="text-gray-400">
            Total {tab === 'inquiries' ? 'Forms' : tab === 'visitors' ? 'Visitors' : 'Reviews'}: <span className="text-yellow-400 font-bold">{data.length}</span>
          </p>
        </div>
        </div>
      )}
    </div>
  );
}
