import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './Auth/Register/Register'
import Login from './Auth/Login/Login'
import { Slide, ToastContainer } from 'react-toastify';
import Home from './Home'
import PrivateRoutes from './PrivateRoutes'
import Layout from './Layout'
import { ThemeContext } from "./context/ThemeContext";
import CreateProduct from './CreateProduct'


const Main: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme)

  function getInitialTheme() {

    const theme = localStorage.getItem('theme')
    return theme ? JSON.parse(theme) : 'light'
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    }, {
      path: "register",
      element: <Register />
    },
    {
      path: "layout",
      element: [
        <PrivateRoutes>
          <ThemeContext.Provider value={[theme, setTheme]}>
            <div className={`${theme} theme`} >
              <Layout />
            </div>
          </ThemeContext.Provider>
        </PrivateRoutes>
      ],
      children: [
        {
          path: "Home",
          element: (
            <PrivateRoutes>
              <ThemeContext.Provider value={[theme, setTheme]}>
                <div className={`${theme} theme`} >
                  <Home />
                </div>
              </ThemeContext.Provider>
            </PrivateRoutes>
          )
        }, {
          path: "Create",
          element: (
            <CreateProduct />
          )
        }
      ]
    }
  ])
  return (
    <StrictMode>
      <RouterProvider router={routes} />
      <ToastContainer autoClose={1500} transition={Slide} />
    </StrictMode>
  );
};


createRoot(document.getElementById('root')!).render(<Main />);
