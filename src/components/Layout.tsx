import { useLayoutEffect } from 'react'
import { Outlet, useNavigate, useSearchParams } from 'react-router'

export default function Layout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  // Получаем все параметры как объект
  const paramsObject = Object.fromEntries(searchParams.entries())
  const hasParams = Object.keys(paramsObject).length > 0

  useLayoutEffect(() => {
    async function detect() {
      if (hasParams && paramsObject.access_token) {
        localStorage.setItem("access_token", paramsObject.access_token)
        navigate('/dashboard')
      } else if (localStorage.getItem("access_token")) {
        const res = await fetch("https://cool-goldfish-200.convex.cloud/user/getByAccessToken?" + new URLSearchParams({
          access_token: String(localStorage.getItem("access_token"))
        }), {
          method: "GET",
        });
        if (res.status === 401 || res.status === 400) {
          navigate('/')
        } else {
          navigate('/dashboard')
        }
      } else {
        navigate('/')
      }
    }
    detect()
  }, [searchParams])
  return <Outlet />
}