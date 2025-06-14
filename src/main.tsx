import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

// Layout
import Layout from './components/Layout'

// Pages
import NotFound from './pages/NotFound'
import Landing from './pages/Landing'
import DashboardLayout from './components/DashboardLayout'
import Targets from './pages/Targets'
import Donations from './pages/Donations'
import Alerts from './pages/Alert'
import Goals from './pages/Goals'


import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

import { DirectionProvider, MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL || 'https://cool-goldfish-200.convex.cloud');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Targets />
          },
          {
            path: "donations",
            element: <Donations />
          }, {
            path: "alerts",
            element: <Alerts />
          }, {
            path: "goals",
            element: <Goals />
          },
        ]
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
], {
  basename: '/diplom-csr'
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DirectionProvider>
      <MantineProvider>
        <ModalsProvider>
          <Notifications />
          <ConvexProvider client={convex}> <RouterProvider router={router} />
          </ConvexProvider> 
          </ModalsProvider>
      </MantineProvider>
    </DirectionProvider>
  </StrictMode>,
)
