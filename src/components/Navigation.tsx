import { Link, useLocation } from 'react-router'

export default function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/about', label: 'О проекте' },
    { path: '/users', label: 'Пользователи' },
    { path: '/contact', label: 'Контакты' }
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav style={{
      backgroundColor: '#f8f9fa',
      padding: '1rem 2rem',
      borderBottom: '1px solid #dee2e6',
      marginBottom: '0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link 
          to="/" 
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#007bff',
            textDecoration: 'none'
          }}
        >
          Diplom CSR
        </Link>
        
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: '2rem'
        }}>
          {navItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: isActive(item.path) ? '#007bff' : '#495057',
                  fontWeight: isActive(item.path) ? 'bold' : 'normal',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  backgroundColor: isActive(item.path) ? '#e3f2fd' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}