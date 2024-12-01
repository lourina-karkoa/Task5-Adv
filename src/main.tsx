import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './component/Login/Login.tsx'
import Favorites from './pages/Favorites/Favorites.tsx'
import OrderList from './pages/OrderList/OrderList.tsx'
import Products from './pages/Products/Products.tsx'
import Read from './component/Read/Read.tsx'
import Add from './component/Add/Add.tsx'
import Edit from './component/Edit/Edit.tsx'
import ReadItem from './component/ReadItem/ReadItem.tsx'
import Logup from './component/Logup/Logup.tsx'
const routes = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/Logup",
    element:<Logup/>
  },
  {
    path:"/Products",
    element:<Products/>,
    children:[
    {
      path:"/Products/Read",
      element:<Read/>,
    },
    {
      path:"/Products/ReadItem/:id",
      element:<ReadItem/>,
    },
    {
      path:"/Products/Add",
      element:<Add/>,
    },
    {
      path:"/Products/Edit/:id",
      element:<Edit/>,
    }
  ]
  },
  {
    path:"/Favorites",
    element:<Favorites/>
  },
  {
    path:"/OrderList",
    element:<OrderList/>
  },
],
{
  basename: "/Task5-Adv", 
}
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>,
)
