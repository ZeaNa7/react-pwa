import { createBrowserRouter } from 'react-router-dom';
import CameraPage from './components/pages/camera-page';
import HomePage from './components/pages/home-page';
import PicturePage from './components/pages/picture-page';
import MapPage from './components/pages/map-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/camera',
    element: <CameraPage />,
  },
  {
    path: '/pictures',
    element: <PicturePage />,
  },
  {
    path: '/map',
    element: <MapPage />,
  },
]);
