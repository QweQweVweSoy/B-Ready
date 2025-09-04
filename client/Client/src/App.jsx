import './App.css'
import LandingPage from './assets/LandingPage.jsx'
import Signup from './assets/Signup.jsx'
import Home from './assets/Home.jsx'
import Profile from './assets/Profile.jsx'
import { useState } from 'react'

function App() {
  const [showMenu, setShowMenu] = useState(false)
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)

  const handleSignup = (userData) => {
    setUser(userData)
    setPage('home')
    setShowMenu(false) // Close menu after signup
  }

  const handleNavigation = (pageName) => {
    setPage(pageName)
    setShowMenu(false) // Close menu after navigation
  }

  return (
    <>
      <header className='navbar-header'>
        <title>B-Ready</title>
        <nav className='navbar'>
          <h2 className='navbar-title'>B-READY</h2>
          <button className='menu-icon' onClick={() => setShowMenu(!showMenu)}>
            ☰
          </button>
        </nav>
      </header>
      
      {/* Sidebar Navigation */}
      {showMenu && (
        <div className="sidebar">
          <button className="close-btn" onClick={() => setShowMenu(false)}>×</button>
          <ul className='sidebar-links'>
            <li>
              <button onClick={() => handleNavigation('home')}>Home</button>
            </li>
            
            {user ? (
              <>
                <li>
                  <button onClick={() => handleNavigation('profile')}>Account Settings</button>
                </li>
                {user.accountType === 'resident' ? (
                  <>
                    <li>
                      <button onClick={() => handleNavigation('rescue-units')}>Rescue Units</button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('safety-tips')}>Safety Tips</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button onClick={() => handleNavigation('map-zones')}>Map Disaster Zones</button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('status-update')}>Status Update</button>
                    </li>
                  </>
                )}
              </>
            ) : (
              <li>
                <button onClick={() => handleNavigation('signup')}>Signup</button>
              </li>
            )}
          </ul>
        </div>
      )}
      
      <main>
        {page === 'home' && user ? (
          <Home user={user} />
        ) : page === 'signup' ? (
          <Signup onSignup={handleSignup} />
        ) : page === 'profile' ? (
          <Profile user={user} onUpdate={setUser} />
        ) : page === 'rescue-units' ? (
          <div>Rescue Units Page - Under Construction</div>
        ) : page === 'safety-tips' ? (
          <div>Safety Tips Page - Under Construction</div>
        ) : page === 'map-zones' ? (
          <div>Map Disaster Zones Page - Under Construction</div>
        ) : page === 'status-update' ? (
          <div>Status Update Page - Under Construction</div>
        ) : (
          <LandingPage />
        )}
      </main>
    </>
  )
}

export default App