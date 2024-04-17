import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CameraPage from './pages/camera-page';
import HomePage from './pages/home-page';
import PicturePage from './pages/picture-page';
import MapPage from './pages/map-page';

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/camera" element={<CameraPage />} />
      <Route path="/picture" element={<PicturePage />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  </Router>
);
