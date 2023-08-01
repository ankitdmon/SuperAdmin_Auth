import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Header from './Components/Header';
import EditUser from './Pages/EditUser';
import ChangePassword from './Pages/ChangePassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from './redux/store';
import TodoList from './Pages/TodoList';
import ProtectedRoutes from './Components/ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path:"/",
        element: <ProtectedRoutes component={<TodoList />}/>
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path:"/signup",
        element: <SignUp />
      },
      {
        path:"/edituser",
        element: <ProtectedRoutes component={<EditUser />}/>
      },
      {
        path:"/changepassword",
        element: <ProtectedRoutes component={<ChangePassword />}/>
      }

    ]
  },
 
]);
    
ReactDOM.createRoot(document.getElementById("root")).render(
<Provider store={store}>

  <ToastContainer position="bottom-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
  <RouterProvider router={router} />
</Provider>
);
