'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = checking
  const [adminEmail, setAdminEmail] = useState('');
  const [tab, setTab] = useState('inquiries');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState('');
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [counts, setCounts] = useState({ inquiries: 0, visitors: 0, testimonials: 0 });

  // Check authentication on mount - BLOCKING
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      const storedEmail = localStorage.getItem('adminEmail');
      
      if (!token) {
        // NO TOKEN - REDIRECT IMMEDIATELY
        router.push('/admin/login');
        setIsAuthenticated(false);
        return;
      }
      
      // Verify token with backend
      try {
        const response = await fetch('/api/admin/login', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          // TOKEN INVALID - REDIRECT TO LOGIN
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminEmail');
          router.push('/admin/login');
          setIsAuthenticated(false);
          return;
        }
        
        // TOKEN VALID - ALLOW ACCESS
        setAdminEmail(storedEmail || '');
        setIsAuthenticated(true);
        
        // Load all tab counts
        loadAllCounts();
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/admin/login');
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, [router]);

  const loadAllCounts = async () => {
    try {
      const [inquiriesRes, visitorsRes, testimonialsRes] = await Promise.all([
        fetch('/api/export?type=inquiries&format=json'),
        fetch('/api/export?type=visitors&format=json'),
        fetch('/api/export?type=testimonials&format=json'),
      ]);

      const inquiriesData = await inquiriesRes.json();
      const visitorsData = await visitorsRes.json();
      const testimonialsData = await testimonialsRes.json();

      setCounts({
        inquiries: inquiriesData.data?.length || 0,
        visitors: visitorsData.data?.length || 0,
        testimonials: testimonialsData.data?.length || 0,
      });
    } catch (error) {
      console.error('Error loading counts:', error);
    }
  };

  // Load data when tab changes (only if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      setSelectedItems(new Set()); // Clear selected items when tab changes
      loadData();
    }
  }, [tab, isAuthenticated]);

  const handleLogout = async () => {
    try {
      // Call logout API to clear server-side cookie
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear localStorage
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminEmail')
      
      // Clear cookies (backup)
      document.cookie = 'adminToken=; path=/; max-age=0'
      document.cookie = 'adminEmail=; path=/; max-age=0'
      
      // Redirect to login
      router.push('/admin/login')
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/export?type=${tab}&format=json`);
      const result = await response.json();
      setData(result.data || []);
      
      // Update count for current tab
      setCounts((prev) => ({
        ...prev,
        [tab]: (result.data || []).length,
      }));
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

  const deleteInquiry = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      setActionLoading(parseInt(id));
      try {
        const response = await fetch(`/api/inquiries/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setMessage('✅ Inquiry deleted!');
          loadData();
        } else {
          setMessage('❌ Failed to delete inquiry');
        }
      } catch (error) {
        setMessage('❌ Failed to delete inquiry');
      }
      setActionLoading(null);
    }
  };

  const deleteVisitor = async (id: string) => {
    if (confirm('Are you sure you want to delete this visitor record?')) {
      setActionLoading(parseInt(id));
      try {
        const response = await fetch(`/api/visitors/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setMessage('✅ Visitor record deleted!');
          loadData();
        } else {
          setMessage('❌ Failed to delete visitor record');
        }
      } catch (error) {
        setMessage('❌ Failed to delete visitor record');
      }
      setActionLoading(null);
    }
  };

  const toggleSelectItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === data.length) {
      setSelectedItems(new Set());
    } else {
      const allIds = new Set(data.map((item) => String(item.id)));
      setSelectedItems(allIds);
    }
  };

  const deleteSelected = async () => {
    if (selectedItems.size === 0) {
      setMessage('❌ No items selected');
      return;
    }

    if (!confirm(`Delete ${selectedItems.size} item(s)? This cannot be undone!`)) {
      return;
    }

    setActionLoading(-1); // Loading state for bulk delete
    try {
      let successCount = 0;
      const ids = Array.from(selectedItems);

      for (const id of ids) {
        try {
          const endpoint =
            tab === 'inquiries'
              ? `/api/inquiries/${id}`
              : tab === 'visitors'
              ? `/api/visitors/${id}`
              : `/api/testimonials/${id}`;

          const response = await fetch(endpoint, { method: 'DELETE' });
          if (response.ok) {
            successCount++;
          }
        } catch (error) {
          console.error(`Failed to delete ${id}:`, error);
        }
      }

      setMessage(
        successCount === selectedItems.size
          ? `✅ All ${successCount} item(s) deleted successfully!`
          : `⚠️ Deleted ${successCount}/${selectedItems.size} items`
      );
      setSelectedItems(new Set());
      loadData();
    } catch (error) {
      setMessage('❌ Failed to delete selected items');
    }
    setActionLoading(null);
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
      {/* SHOW NOTHING WHILE CHECKING AUTH */}
      {isAuthenticated === null && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto mb-4"></div>
            <p className="text-brand-muted">Verifying access...</p>
          </div>
        </div>
      )}

      {/* SHOW NOTHING IF NOT AUTHENTICATED */}
      {isAuthenticated === false && (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-brand-muted">Redirecting to login...</p>
        </div>
      )}

      {/* SHOW ADMIN PANEL ONLY IF AUTHENTICATED */}
      {isAuthenticated === true && (
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
            Contact Forms ({counts.inquiries})
          </button>
          <button
            onClick={() => setTab('visitors')}
            className={`pb-4 px-6 font-semibold transition ${
              tab === 'visitors'
                ? 'border-b-2 border-yellow-500 text-yellow-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Visitor Forms ({counts.visitors})
          </button>
          <button
            onClick={() => setTab('testimonials')}
            className={`pb-4 px-6 font-semibold transition ${
              tab === 'testimonials'
                ? 'border-b-2 border-yellow-500 text-yellow-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Reviews ({counts.testimonials})
          </button>
        </div>

        {/* Export Options */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Export Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
            {selectedItems.size > 0 && (
              <button
                onClick={deleteSelected}
                disabled={actionLoading !== null}
                className="bg-red-700 hover:bg-red-800 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {actionLoading === -1 ? '⏳ Deleting...' : `🗑️ Delete Selected (${selectedItems.size})`}
              </button>
            )}
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
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedItems.size === data.length && data.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </th>
                    {tab === 'inquiries' ? (
                      <>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Phone</th>
                        <th className="px-6 py-3 text-left">Service</th>
                        <th className="px-6 py-3 text-left">Message</th>
                        <th className="px-6 py-3 text-left">Date</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                      </>
                    ) : tab === 'visitors' ? (
                      <>
                        <th className="px-6 py-3 text-left">Full Name</th>
                        <th className="px-6 py-3 text-left">Phone Number</th>
                        <th className="px-6 py-3 text-left">WhatsApp Number</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Submitted At</th>
                        <th className="px-6 py-3 text-left">Actions</th>
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
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(String(item.id))}
                          onChange={() => toggleSelectItem(String(item.id))}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </td>
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
                          <td className="px-6 py-4">
                            <button
                              onClick={() => deleteInquiry(item.id)}
                              disabled={actionLoading === item.id}
                              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm transition"
                            >
                              {actionLoading === item.id ? '...' : 'Delete'}
                            </button>
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
                          <td className="px-6 py-4">
                            <button
                              onClick={() => deleteVisitor(item.id)}
                              disabled={actionLoading === item.id}
                              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm transition"
                            >
                              {actionLoading === item.id ? '...' : 'Delete'}
                            </button>
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
            Total {tab === 'inquiries' ? 'Forms' : tab === 'visitors' ? 'Visitors' : 'Reviews'}: <span className="text-yellow-400 font-bold">{tab === 'inquiries' ? counts.inquiries : tab === 'visitors' ? counts.visitors : counts.testimonials}</span>
          </p>
        </div>
      </div>
      )}
    </div>
  );
}
