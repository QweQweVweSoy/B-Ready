import { useState } from 'react'
import './Home.css'

function Profile({ user, onUpdate }) {
  const [form, setForm] = useState(user)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(form)
    alert('Profile updated successfully!')
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
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
          placeholder="BRGY. EMPLOYEE ID NO."
          value={form.employeeId}
          onChange={handleChange}
          required
        />
        <button type="submit" className="update-btn">
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default Profile