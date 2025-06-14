import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'

// Layout
import Layout from './components/Layout'

// Pages
import NotFound from './pages/NotFound'
import Landing from './pages/Landing'
import DashboardLayout from './components/DashboardLayout'

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
            element: <Landing />
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
    <RouterProvider router={router} />
  </StrictMode>,
)
