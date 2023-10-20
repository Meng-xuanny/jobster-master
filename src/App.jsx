import { Landing, ErrorPage, Dashboard, Register } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AllJobs,
  AddJob,
  Profile,
  Stats,
  SharedLayout,
  ProtectedRoute,
} from "./pages/Dashboard/index";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute children={<SharedLayout />} />,
          children: [
            { index: true, element: <Stats /> },
            { path: "all-jobs", element: <AllJobs /> },
            { path: "add-job", element: <AddJob /> },
            { path: "profile", element: <Profile /> },
          ],
        },
        { path: "landing", element: <Landing /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
