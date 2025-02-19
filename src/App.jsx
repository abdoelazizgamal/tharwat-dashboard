import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/",
    element: <Dashboard />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;