import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import NewReport from './pages/NewReport';

import { Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />
  },
{
  path: "/",
  element: <Layout />,
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