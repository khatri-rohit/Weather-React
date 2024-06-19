import Home from './components/Home'
import Error from './components/Error'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

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
      <RouterProvider router={router} />
    </>
  )
}

export default App