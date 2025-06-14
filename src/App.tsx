function App() {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1>Diplom CSR</h1>
      <p>React + TypeScript + Vite приложение</p>
      <p>Успешно развернуто на GitHub Pages! 🚀</p>
      <div style={{ marginTop: '2rem' }}>
        <button 
          onClick={() => alert('Приложение работает!')}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Проверить функциональность
        </button>
      </div>
    </div>
  )
}

export default App
