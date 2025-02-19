import { createBrowserRouter, RouterProvider, Navigate, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import NewReport from './pages/NewReport';
import Layout from './Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
    loader: () => {
      const token = localStorage.getItem('token');
      if (token) {
        return redirect('/');
      }
      return null;
    },
  },
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "new-report",
        element: <NewReport />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;