import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { Navigate } from 'react-router-dom';

import LandingPage from './components/Navigation/LandingPage';
import * as sessionActions from './store/session';
import Home from './components/Home/Home';
import ShopDetails from './components/Shop/ShopDetails';
import Inventory from './components/Inventory/Inventory';
// import



function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  const [loggedIn, setLoggedIn] = useState(false);

  console.log("%c 🚀 ~ file: App.jsx:19 ~ Layout ~ sessionUser: ", "color: orange; font-size: 25px", sessionUser)


  useEffect(() => {

    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);
  console.log("%c 🚀 ~ file: App.jsx:28 ~ Outside Layout ~ sessionUser: ", "color: orange; font-size: 25px", sessionUser)
  const loginRedirect = sessionUser ? <Navigate to="/tasks" replace /> : null;

  useEffect(() => {
    if (sessionUser) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [loggedIn, sessionUser])

  console.log("%c 🚀 ~ file: App.jsx:39 ~ Layout ~ loggedIn: ", "color: pink; font-size: 25px", loggedIn)

  return (
    <>
      {!isLoaded ?
        <div className='loading'>
          <div className='loading-spinner'>...</div>
        </div>
        : (
          <>
            <Navigation isLoaded={isLoaded} setLoggedIn={setLoggedIn} />
            <Outlet>
              {loggedIn === false ?
                <LandingPage /> : <Home />
              }
            </Outlet>
            {loginRedirect}
          </>
        )
      }
    </>

  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/tasks',
        element: <Home />
      },
      {
        path: '/stats',
        element: <></>
      },
      {
        path: '/shop',
        element: <ShopDetails />
      },
      {
        path: '/inv',
        element: <Inventory />
      },
      {
        path: '*',
        element: <h1 style={{ "position": "relative", "top": "10rem" }}>Uh oh! Page not found</h1>
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
