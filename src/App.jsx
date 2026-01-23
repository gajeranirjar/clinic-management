import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { ErrorPage } from "./pages/ErrorPage";
import { DoctorDashboard } from "./pages/DoctorDashboard";
import { ReceptionistDashboard } from "./pages/ReceptionistDashboard";
import AppLayout from "./components/layout/AppLayout";
import { Register } from "./pages/Register";
import PrivateRoute from "./components/UI/PrivateRoute";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/doctor",
          element: (
            <PrivateRoute role="doctor">
              <DoctorDashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "/receptionist",
          element: (
            <PrivateRoute role="doctor">
              <ReceptionistDashboard />
            </PrivateRoute>
          ),
        },
      ]
    },
  ])

  return <RouterProvider router={router} />
}

export default App;