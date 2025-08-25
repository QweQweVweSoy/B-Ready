import './App.css'
import LandingPage from './assets/LandingPage.jsx'
import Signup from './assets/Signup.jsx'
import { useState } from 'react'

function App() {
  const [showMenu, setShowMenu] = useState(true)
  const [page, setPage] = useState('home')

  return (
    <>
      <header className='navbar-header'>
        <nav className='navbar'>
          <button className='menu-btn' onClick={() => setShowMenu(!showMenu)}>
            Menu
          </button>
          {showMenu && (
            <ul className='nav-links'>
              <li>
                <button onClick={() => setPage('signup')}>Signup</button>
              </li>
              <li>
                <button onClick={() => setPage('home')}>Home</button>
              </li>
            </ul>
          )}
        </nav>
      </header>
      <main>
        {page === 'home' ? <LandingPage /> : <Signup />}
      </main>
    </>
  )
}

export default App
