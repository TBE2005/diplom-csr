import { useLayoutEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router'

export default function Layout() {
  const [searchParams] = useSearchParams()
  // Получаем все параметры как объект
  const paramsObject = Object.fromEntries(searchParams.entries())
  const hasParams = Object.keys(paramsObject).length > 0

  useLayoutEffect(() => {
    async function detect() {
      if (hasParams && paramsObject.access_token) {
        localStorage.setItem("access_token", paramsObject.access_token)
        window.location.href = 'https://tbe2005.github.io/diplom-csr/?/dashboard'
      } else if (localStorage.getItem("access_token")) {
        const res = await fetch("https://cool-goldfish-200.convex.site/user/getByAccessToken?" + new URLSearchParams({
          access_token: String(localStorage.getItem("access_token"))
        }), {
          method: "GET",
        });
        if (!(res.status === 401 || res.status === 400 || res.status === 404)) {
          window.location.href = 'https://tbe2005.github.io/diplom-csr/?/dashboard'
        }
      }
    }
    detect()
  }, [searchParams])
  return <Outlet />
}
