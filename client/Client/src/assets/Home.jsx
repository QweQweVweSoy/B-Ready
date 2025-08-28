import { useState } from 'react'
import Chatbox from './Chatbox'
import './Home.css'

function Home({ user }) {
  const [showChatbox, setShowChatbox] = useState(false)
  // Sample reports data - in a real app this would come from an API
  const [reports] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/100',
      type: 'Flood',
      address: '123 Main St, Barangay 1',
      date: '2023-10-15 14:30',
      summary: 'Water level reached 1 meter in residential area'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100',
      type: 'Fire',
      address: '456 Oak St, Barangay 2',
      date: '2023-10-16 09:15',
      summary: 'Small electrical fire in apartment building'
    }
  ])

  return (
    <div className="home-container">
      <h1>Welcome, {user.firstName}!</h1>
      
      <div className="reports-container">
        <h2>Approved Reports</h2>
        {reports.map(report => (
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