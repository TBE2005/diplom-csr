import { useLayoutEffect } from 'react'
import { Outlet, useSearchParams, useLocation } from 'react-router'

export default function Layout() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  // Получаем все параметры как объект
  const paramsObject = Object.fromEntries(searchParams.entries())
  const hasParams = Object.keys(paramsObject).length > 0

  useLayoutEffect(() => {
    async function detect() {
      // Проверяем, находимся ли мы на специальных страницах, которые не должны редиректить
      const isSpecialPage = location.pathname.includes('/dashboard') ||
        location.pathname.startsWith('/alert/') ||
        location.pathname.startsWith('/goal/') ||
        (location.pathname !== '/' && location.pathname.split('/').length === 2 && location.pathname !== '/dashboard')


      if (hasParams && paramsObject.access_token) {
        localStorage.setItem("access_token", paramsObject.access_token)
        window.location.href = 'https://tbe2005.github.io/diplom-csr/?/dashboard'
      } else if (localStorage.getItem("access_token")) {
        const res = await fetch("https://cool-goldfish-200.convex.site/user/getByAccessToken?" + new URLSearchParams({
          access_token: String(localStorage.getItem("access_token"))
        }), {
          method: "GET",
        });
        if (!(res.status === 401 || res.status === 400 || res.status === 404) && !isSpecialPage) {
          window.location.href = 'https://tbe2005.github.io/diplom-csr/?/dashboard'
        }
      }
    }
    detect()
  }, [searchParams, location.pathname])
  return <Outlet />
}
