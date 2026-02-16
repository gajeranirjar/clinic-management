import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/layout/Loading";
import PrivateRoute from "./components/UI/PrivateRoute";
import AppLayout from "./components/layout/AppLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ErrorPage } from "./pages/ErrorPage";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import RoleRedirect from "./components/UI/RoleRedirect";
import { UserDashboard } from "./pages/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorPatientDetails from "./pages/doctor/DoctorPatientDetails";
import { receptionistDashboardLoader } from "./api/receptionist";
import { doctorDashboardLoader, doctorPatientDetailsLoader } from "./api/doctor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Loading />,
    children: [
      { index: true, element: <RoleRedirect /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "user",
        element: (
          <PrivateRoute role="user">
            <UserDashboard />
          </PrivateRoute>
        ),
      },

      {
        path: "doctor",
        element: (
          <PrivateRoute role="doctor">
            <DoctorDashboard />
          </PrivateRoute>
        ),
        loader: doctorDashboardLoader,
      },
      {
        path: "doctor/patient/:patientId",
        element: (
          <PrivateRoute role="doctor">
            <DoctorPatientDetails />
          </PrivateRoute>
        ),
        loader: doctorPatientDetailsLoader,
      },

      {
        path: "receptionist",
        element: (
          <PrivateRoute role="receptionist">
            <ReceptionistDashboard />
          </PrivateRoute>
        ),
        loader: receptionistDashboardLoader,
      },

      {
        path: "admin",
        element: (
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} fallbackElement={<Loading />} />;

export default App;
