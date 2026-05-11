'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [tab, setTab] = useState('inquiries');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, [tab]);

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

  const downloadCSV = async () => {
    setExporting(true);
    try {
      const response = await fetch(`/api/export?type=${tab}&format=csv`);
      const blob = await response.blob();
      
      // Create download link
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
        setMessage(`✅ CSV sent to ${email}! (${result.count} records)`);
        setEmail('');
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to send email');
    }
    setExporting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400 mb-8">Manage inquiries and testimonials</p>

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
            {/* Download CSV */}
            <button
              onClick={downloadCSV}
              disabled={exporting || data.length === 0}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              {exporting ? '⏳ Processing...' : '📥 Download as CSV'}
            </button>

            {/* Send via Email */}
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
                    ) : (
                      <>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Review</th>
                        <th className="px-6 py-3 text-left">Date</th>
                        <th className="px-6 py-3 text-left">Submitted</th>
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
                          <td className="px-6 py-4 text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4">{item.name}</td>
                          <td className="px-6 py-4 truncate max-w-xs">{item.quote}</td>
                          <td className="px-6 py-4">{item.date}</td>
                          <td className="px-6 py-4 text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</td>
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
            Total {tab === 'inquiries' ? 'Forms' : 'Reviews'}: <span className="text-yellow-400 font-bold">{data.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
