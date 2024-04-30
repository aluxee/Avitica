import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { Navigate } from 'react-router-dom';


import { useContext } from 'react';
import { LoggedContext } from './context/LoggedProvider';


import LandingHome from './components/Navigation/HomeInterface/LandingHome/LandingHome';
import LandingPage from './components/Navigation/HomeInterface/LandingPage/LandingPage';
import About from './components/Navigation/HomeInterface/About/About';
import Features from './components/Navigation/HomeInterface/Features/Features';
import * as sessionActions from './store/session';
import Home from './components/Home/Home';
import ShopDetails from './components/Shop/ShopDetails';
import Inventory from './components/Inventory/Inventory';
// import



function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // to see css, set the value to true, use in main component
  const sessionUser = useSelector(state => state.session.user)
  const { loggedIn, setLoggedIn } = useContext(LoggedContext)

  console.log("%c 🚀 ~ file: App.jsx:19 ~ Layout ~ sessionUser: ", "color: orange; font-size: 25px", sessionUser)


  useEffect(() => {

    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  const loginRedirect = sessionUser ? <Navigate to="/tasks" replace /> : null;

  useEffect(() => {
    if (sessionUser) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [loggedIn, sessionUser])


  return (
    <>
      {!isLoaded ?
        <div className='loading'>
          <div className='loading-spinner'>...</div>
        </div>
        : (
          <>
            <Navigation isLoaded={isLoaded} />
            <Outlet>
              {loggedIn === false &&
                <>
                  {/* <Swiper /> */}
                  <LandingPage />
                </>}
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
        element: <LandingHome />,
        children: [
          {
            path: '/',
            element: <LandingPage />
          },
          {
            path: '/about',
            element: <About />,
          },
          {
            path: '/features',
            element: <Features />,
          },
        ],
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
