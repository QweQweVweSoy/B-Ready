import { useState } from 'react'
import Chatbox from './Chatbox'
import './Home.css'

function Home({ user }) {
  const [showChatbox, setShowChatbox] = useState(false)

  // Sample data for all report types
  const [reports] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/100',
      type: 'Flood',
      address: '123 Main St, Barangay 1',
      date: '2023-10-15 14:30',
      summary: 'Water level reached 1 meter in residential area',
      status: 'approved'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100',
      type: 'Fire',
      address: '456 Oak St, Barangay 2',
      date: '2023-10-16 09:15',
      summary: 'Small electrical fire in apartment building',
      status: 'approved'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/100',
      type: 'Road Damage',
      address: '789 Pine St, Barangay 3',
      date: '2023-10-17 11:45',
      summary: 'Large pothole causing traffic issues',
      status: 'current'
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/100',
      type: 'Garbage Collection',
      address: '321 Elm St, Barangay 4',
      date: '2023-10-18 08:20',
      summary: 'Missed garbage collection on Tuesday',
      status: 'current'
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/100',
      type: 'Tree Hazard',
      address: '654 Maple St, Barangay 5',
      date: '2023-10-19 15:10',
      summary: 'Large tree branch hanging over power lines',
      status: 'pending'
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/100',
      type: 'Street Light',
      address: '987 Cedar St, Barangay 6',
      date: '2023-10-20 18:30',
      summary: 'Street light out on corner',
      status: 'pending'
    }
  ])

  // Filter reports based on status
  const approvedReports = reports.filter(report => report.status === 'approved')
  const currentReports = reports.filter(report => report.status === 'current')
  const pendingReports = reports.filter(report => report.status === 'pending')

  return (
    <div className="home-container">
      <h1>Welcome, {user.firstName}!</h1>
      
      <div className={`reports-dashboard ${user.accountType === 'admin' ? 'admin-view' : 'resident-view'}`}>
        {/* Approved Reports Section */}
        <div className="report-section">
          <h2>Approved Reports</h2>
          <div className="reports-container">
            {approvedReports.map(report => (
              <div key={report.id} className="report-card">
                <img src={report.image} alt={report.type} />
                <div className="report-details">
                  <h3>{report.type}</h3>
                  <p><strong>Address:</strong> {report.address}</p>
                  <p><strong>Date/Time:</strong> {report.date}</p>
                  <p><strong>Summary:</strong> {report.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Reports Section */}
        <div className="report-section">
          <h2>{user.accountType === 'admin' ? 'Current Reports' : 'Successful Requests & Warnings'}</h2>
          <div className="reports-container">
            {currentReports.map(report => (
              <div key={report.id} className="report-card">
                <img src={report.image} alt={report.type} />
                <div className="report-details">
                  <h3>{report.type}</h3>
                  <p><strong>Address:</strong> {report.address}</p>
                  <p><strong>Date/Time:</strong> {report.date}</p>
                  <p><strong>Summary:</strong> {report.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Reports Section (Admin only) */}
        {user.accountType === 'admin' && (
          <div className="report-section">
            <h2>Pending Reports</h2>
            <div className="reports-container">
              {pendingReports.map(report => (
                <div key={report.id} className="report-card">
                  <img src={report.image} alt={report.type} />
                  <div className="report-details">
                    <h3>{report.type}</h3>
                    <p><strong>Address:</strong> {report.address}</p>
                    <p><strong>Date/Time:</strong> {report.date}</p>
                    <p><strong>Summary:</strong> {report.summary}</p>
                    <div className="pending-actions">
                      <button className="approve-btn">Approve</button>
                      <button className="reject-btn">Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button 
        className="chatbox-toggle"
        onClick={() => setShowChatbox(true)}
      >
        💬
      </button>

      {showChatbox && (
        <Chatbox onClose={() => setShowChatbox(false)} />
      )}
    </div>
  )
}

export default Home