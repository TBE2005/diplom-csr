import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'

// Layout
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Users from './pages/Users'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'profile/:userId',
        element: <Profile />
      }
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
