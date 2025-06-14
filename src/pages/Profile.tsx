import { useParams, useNavigate } from 'react-router'

export default function Profile() {
  const { userId } = useParams()
  const navigate = useNavigate()

  const users = [
    { id: '1', name: 'Алексей Иванов', role: 'Разработчик', email: 'alex@example.com' },
    { id: '2', name: 'Мария Петрова', role: 'Дизайнер', email: 'maria@example.com' },
    { id: '3', name: 'Дмитрий Сидоров', role: 'Менеджер', email: 'dmitry@example.com' }
  ]

  const user = users.find(u => u.id === userId)

  if (!user) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Пользователь не найден</h1>
        <p>Пользователь с ID {userId} не существует.</p>
        <button 
          onClick={() => navigate('/users')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Вернуться к списку пользователей
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Профиль пользователя</h1>
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '1.5rem', 
        marginTop: '1rem',
        maxWidth: '400px'
      }}>
        <h2>{user.name}</h2>
        <p><strong>Роль:</strong> {user.role}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user.id}</p>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <button 
          onClick={() => navigate('/users')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '1rem'
          }}
        >
          Назад к списку
        </button>
        
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          На главную
        </button>
      </div>
    </div>
  )
}