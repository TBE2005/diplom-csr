import { Outlet } from 'react-router'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Navigation />
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        minHeight: 'calc(100vh - 80px)'
      }}>
        <Outlet />
      </main>
      <footer style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid #dee2e6',
        marginTop: '2rem'
      }}>
        <p style={{ margin: 0, color: '#6c757d' }}>
          © 2024 Diplom CSR. Создано с React Router v7 и TypeScript.
        </p>
      </footer>
    </div>
  )
}