import Auth from "./pages/Auth"
import { useSelector, useDispatch } from 'react-redux'
// import { setToken } from './redux/features/auth/authSlice.js' 
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Admin from './pages/Admin.jsx';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Teacher from "./pages/Teacher.jsx";
import { useCookies } from 'react-cookie'
import Student from "./pages/Student.jsx";


function App() {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const token = cookie.authToken;
  // const dispatch = useDispatch()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute userType={"admin"} ><Admin /></ProtectedRoute>,
    },
    {
      path: "/login",
      element : <Auth />
    },
    {
      path: "/teacher",
      element:  <ProtectedRoute  userType={"teacher"}><Teacher/></ProtectedRoute>,
    },
    {
      path: "/student",
      element:  <ProtectedRoute userType={"student"}><Student/></ProtectedRoute>,
    }

  ]);

  return (
    <>
       
      <RouterProvider router={router} />
       
    </>
  )
}

export default App
