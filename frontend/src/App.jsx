import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import Home from './components/Home/Home';
import ShopDetails from './components/Shop/ShopDetails';
import Inventory from './components/Inventory/Inventory';
// import 



function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      {!isLoaded ?
        <div className='loading'>
          <div className='loading-spinner'>...</div>
        </div>
        : (
          <Navigation isLoaded={isLoaded} />
        )
      }
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element:
          <>
            <Home />
          </>
      },
      {
        path: '/stats',
        element: <>

        </>
      },
      {
        path: '/tasks',
        element:
          <>
            {/* <Task />
            <Outlet /> */}
          </>
      },
      {
        path: '/shop',
        element: <ShopDetails />
      },
      {
        path: '/inv',
        element: <Inventory />
      }
    ]
  }
]);


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
