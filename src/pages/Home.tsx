import { useSearchParams, Link } from 'react-router'

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Получаем все параметры как объект
  const paramsObject = Object.fromEntries(searchParams.entries())
  const hasParams = Object.keys(paramsObject).length > 0

  // Функция для добавления тестовых параметров
  const addTestParams = () => {
    setSearchParams({
      name: 'Иван',
      age: '25',
      city: 'Москва',
      timestamp: Date.now().toString()
    })
  }

  // Функция для очистки параметров
  const clearParams = () => {
    setSearchParams({})
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Главная страница</h1>
      <p>Добро пожаловать в приложение с React Router v7!</p>
      
      {/* Отображение search параметров */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        backgroundColor: hasParams ? '#e3f2fd' : '#f8f9fa',
        borderRadius: '8px',
        border: `1px solid ${hasParams ? '#2196f3' : '#dee2e6'}`
      }}>
        <h3>Search Parameters:</h3>
        {hasParams ? (
          <div>
            <p style={{ color: '#1976d2', fontWeight: 'bold' }}>
              Найдены параметры в URL:
            </p>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}>
              {Object.entries(paramsObject).map(([key, value]) => (
                <div key={key} style={{ marginBottom: '0.5rem' }}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={clearParams}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Очистить параметры
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ color: '#6c757d' }}>
              Параметры в URL отсутствуют
            </p>
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={addTestParams}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '1rem'
                }}
              >
                Добавить тестовые параметры
              </button>
              
              <Link
                to="/?search=react&category=tutorial&level=advanced"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}
              >
                Пример с параметрами
              </Link>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Возможности:</h3>
        <ul>
          <li>Декларативный роутинг</li>
          <li>Навигация между страницами</li>
          <li>Динамические маршруты</li>
          <li>Обработка ошибок</li>
          <li><strong>Search Parameters</strong> - отображение и управление URL параметрами</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Примеры URL с параметрами:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/?user=admin&role=moderator"
              style={{ color: '#007bff', textDecoration: 'none' }}
            >
              /?user=admin&role=moderator
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/?filter=active&sort=date&page=1"
              style={{ color: '#007bff', textDecoration: 'none' }}
            >
              /?filter=active&sort=date&page=1
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/?theme=dark&lang=ru&debug=true"
              style={{ color: '#007bff', textDecoration: 'none' }}
            >
              /?theme=dark&lang=ru&debug=true
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}