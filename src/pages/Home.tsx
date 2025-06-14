export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Главная страница</h1>
      <p>Добро пожаловать в приложение с React Router v7!</p>
      <div style={{ marginTop: '2rem' }}>
        <h3>Возможности:</h3>
        <ul>
          <li>Декларативный роутинг</li>
          <li>Навигация между страницами</li>
          <li>Динамические маршруты</li>
          <li>Обработка ошибок</li>
        </ul>
      </div>
    </div>
  )
}