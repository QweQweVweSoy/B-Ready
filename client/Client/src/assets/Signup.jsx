import { useState } from 'react'
import './Signup.css' // Importing the CSS file for styles

function Signup({ onSignup }) {
  const [scene, setScene] = useState(1)
  const [accountType, setAccountType] = useState('')
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    middleInitial: '',
    birthday: '',
    address: '',
    employeeId: ''
  })

  const privacyTerms = `
    Privacy Policy:
    We value your privacy. Your personal information will be securely stored and only used for account verification and service provision.

    Terms of Agreement:
    By creating an account, you agree to abide by our community guidelines and provide accurate information. You consent to the processing of your data for service purposes.
  `

  const handleTypeSelect = (type) => {
    setAccountType(type)
    setScene(2)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    setScene(3)
  }

  const handleAgree = () => {
    // Create user data object with form data and account type
    const userData = {
      ...form,
      accountType
    };
    
    // Pass the user data to the parent component
    onSignup(userData);
  }

  // Check if all required fields are filled
  const allFieldsFilled =
    form.lastName.trim() &&
    form.firstName.trim() &&
    form.middleInitial.trim() &&
    form.birthday.trim() &&
    form.address.trim() &&
    form.employeeId.trim()

  return (
    
    <div className="signup-container">

       <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>
      {scene === 1 && (
        <>
          <h2>Create your account, choose account type wisely</h2>
          <div className="signup-type-btns">
            <button
              className="signup-type-btn"
              onClick={() => handleTypeSelect('admin')}
            >
              Administrator
            </button>
            <button
              className="signup-type-btn"
              onClick={() => handleTypeSelect('resident')}
            >
              Resident User
            </button>
          </div>
        </>
      )}

      {scene === 2 && (
        <>
          <h2>
            {accountType === 'admin'
              ? 'Create your account as admin!'
              : 'Create your account as resident!'}
          </h2>
          <form className="signup-form">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="middleInitial"
              placeholder="Middle Initial"
              value={form.middleInitial}
              onChange={handleChange}
              maxLength={1}
            />
            <input
              type="date"
              name="birthday"
              placeholder="Birthday"
              value={form.birthday}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="employeeId"
              placeholder="BRGY. EMPLOYEE ID NO. (Your ID Number is Your Pass)"
              value={form.employeeId}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="signup-next-btn"
              onClick={handleNext}
              disabled={!allFieldsFilled}
            >
              Next Page
            </button>
          </form>
          <div className="signup-terms">
            By creating an account, you agree to the terms & service and privacy policy.
          </div>
        </>
      )}

      {scene === 3 && (
        <>
          <h2>Privacy Policy & Terms of Agreement</h2>
          <pre className="signup-privacy">
            {privacyTerms}
          </pre>
          <button
            className="signup-agree-btn"
            onClick={handleAgree}
          >
            I Agree
          </button>
        </>
      )}
    </div>
  )
}

export default Signup