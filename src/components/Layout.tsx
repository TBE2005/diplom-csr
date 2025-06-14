import { useLayoutEffect } from 'react'
import { Outlet, useNavigate, useSearchParams } from 'react-router'

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

import { DirectionProvider, MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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
        const res = await fetch("https://yoomoney.ru/api/account-info", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
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
  return <DirectionProvider>
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <ConvexProvider client={convex}>
          <Outlet />
        </ConvexProvider>
      </ModalsProvider>
    </MantineProvider>
  </DirectionProvider>
}