import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Спасибо, ${formData.name}! Ваше сообщение отправлено.`)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h1>Контакты</h1>
      <p>Свяжитесь с нами через форму ниже:</p>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Имя:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Сообщение:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
          </label>
        </div>
        
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Отправить
        </button>
      </form>
    </div>
  )
}