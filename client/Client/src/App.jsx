import './App.css'
import LandingPage from './assets/LandingPage.jsx'
import Signup from './assets/Signup.jsx'
import Home from './assets/Home.jsx'
import Profile from './assets/Profile.jsx'
import { useState } from 'react'

function App() {
  const [showMenu, setShowMenu] = useState(true)
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)

  const handleSignup = (userData) => {
    setUser(userData)
    setPage('home')
  }

  return (
    <>
      <header className='navbar-header'>
        <nav className='navbar'>
          
          <button className='menu-btn' onClick={() => setShowMenu(!showMenu)}>
            Menu
          </button>
          <h2 className='navbar-title'>B-READY</h2>
          {showMenu && (
            <ul className='nav-links'>
              {user ? (
                <li>
                  <button onClick={() => setPage('profile')}>Profile</button>
                </li>
              ) : (
                <li>
                  <button onClick={() => setPage('signup')}>Signup</button>
                </li>
              )}
              <li>
                <button onClick={() => setPage('home')}>Home</button>
              </li>
            </ul>
          )}
        </nav>
      </header>
      <main>
        {page === 'home' && user ? (
          <Home user={user} />
        ) : page === 'signup' ? (
          <Signup onSignup={handleSignup} />
        ) : page === 'profile' ? (
          <Profile user={user} onUpdate={setUser} />
        ) : (
          <LandingPage />
        )}
      </main>
    </>
  )
}

export default App