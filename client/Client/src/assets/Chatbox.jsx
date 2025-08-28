import { useState, useRef, useEffect } from 'react';
import './Home.css';

function Chatbox({ onClose }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hello! How can we help you?", sender: "received" }
  ]);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { text: message, sender: "sent" }]);
    setMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message. We'll get back to you soon!", 
        sender: "received" 
      }]);
    }, 1000);
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please check permissions.");
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      // Convert to data URL and add as message
      const dataUrl = canvas.toDataURL('image/png');
      setMessages(prev => [...prev, { 
        image: dataUrl, 
        sender: "sent",
        type: "image"
      }]);
      
      stopCamera();
    }
  }

  return (
    <div className="chatbox-overlay" onClick={onClose}>
      <div className="chatbox-container" onClick={(e) => e.stopPropagation()}>
        <div className="chatbox-header">
          <h3>B-READY</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="chatbox-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.type === "image" ? (
                <img src={msg.image} alt="Sent" className="chat-image" />
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {cameraActive && (
          <div className="camera-view">
            <video ref={videoRef} autoPlay playsInline />
            <div className="camera-controls">
              <button onClick={capturePhoto}>Capture</button>
              <button onClick={stopCamera}>Cancel</button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="chatbox-input">
          <input
            type="text"
            placeholder="Type a message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="chatbox-actions">
            <button 
              type="button" 
              className="action-btn"
              onClick={cameraActive ? stopCamera : startCamera}
            >
              {cameraActive ? '✖' : '📷'}
            </button>
            <button type="submit" className="action-btn">
              ➤
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Chatbox;