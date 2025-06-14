import { useLayoutEffect } from 'react'
import { Outlet, useNavigate, useSearchParams } from 'react-router'

export default function Layout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  // Получаем все параметры как объект
  const paramsObject = Object.fromEntries(searchParams.entries())
  const hasParams = Object.keys(paramsObject).length > 0

  useLayoutEffect(() => {
    if (hasParams && paramsObject.access_token) {
      localStorage.setItem("access_token", paramsObject.access_token)
      navigate('/dashboard')
    } else if (localStorage.getItem("access_token")) {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }, [searchParams])
  return <Outlet />
}