import { Link } from 'react-router'

export default function Users() {
  const users = [
    { id: '1', name: 'Алексей Иванов', role: 'Разработчик' },
    { id: '2', name: 'Мария Петрова', role: 'Дизайнер' },
    { id: '3', name: 'Дмитрий Сидоров', role: 'Менеджер' }
  ]

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Список пользователей</h1>
      <p>Нажмите на пользователя, чтобы посмотреть его профиль:</p>
      
      <div style={{ marginTop: '2rem' }}>
        {users.map(user => (
          <div 
            key={user.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#f8f9fa'
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0' }}>
              <Link 
                to={`/profile/${user.id}`}
                style={{
                  color: '#007bff',
                  textDecoration: 'none'
                }}
              >
                {user.name}
              </Link>
            </h3>
            <p style={{ margin: 0, color: '#6c757d' }}>{user.role}</p>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <Link 
          to="/"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          На главную
        </Link>
      </div>
    </div>
  )
}