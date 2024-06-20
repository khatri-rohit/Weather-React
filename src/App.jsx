import Home from './components/Home'
import Error from './components/Error'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './components/Theme-context'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/*',
      element: <Error />
    }
  ])

  return (
    <>
      <ThemeProvider >
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App