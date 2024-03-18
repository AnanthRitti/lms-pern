import Auth from "./pages/auth/Auth.jsx"
// import { useSelector, useDispatch } from 'react-redux'
// // import { setToken } from './redux/features/auth/authSlice.js' 
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Admin from './pages/admin/Admin.jsx';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Teacher from "./pages/teacher/Teacher.jsx";
import { useCookies } from 'react-cookie'
import Student from "./pages/student/Student.jsx";
import TeacherCourses from "./pages/teacher/TeacherCourses.jsx";
import TeacherAssig from "./pages/teacher/TeacherAssig.jsx";
import TeacherProfile from "./pages/teacher/TeacherProfile.jsx";
import  store  from "./redux/store.js";
import { Provider } from 'react-redux'

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
      element:  <ProtectedRoute  userType={"teacher"}></ProtectedRoute>,
      children: [
        {
          path: "home",
          element:<Teacher/>
        },
        {
          path: "courses",
          element:<TeacherCourses/>
        },
        {
          path: "assignments",
          element:<TeacherAssig/>
        },
        {
          path: "profile",
          element:<TeacherProfile/>
        },
      ]
    },
    {
      path: "/student",
      element:  <ProtectedRoute userType={"student"}></ProtectedRoute>,
      children:[
        {
          path:"home",
          element:<Student/>
        }
      ]
    }

  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>  
    </>
  )
}

export default App
