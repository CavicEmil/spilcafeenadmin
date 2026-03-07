import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Landing from './views/Landing';
import Import from './views/Import';
import Dashboard from './views/Dashboard';
import './App.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/import',
        element: <Import />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
],
  {
    basename:"/spilcafeenadmin",
  } 
);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}