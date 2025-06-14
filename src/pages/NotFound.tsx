import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      minHeight: '50vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0', color: '#dc3545' }}>404</h1>
      <h2 style={{ margin: '1rem 0' }}>Страница не найдена</h2>
      <p style={{ marginBottom: '2rem', color: '#6c757d' }}>
        Извините, запрашиваемая страница не существует.
      </p>
      
      <div>
        <Link 
          to="/"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            marginRight: '1rem'
          }}
        >
          На главную
        </Link>
        
        <Link 
          to="/about"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          О проекте
        </Link>
      </div>
    </div>
  )
}