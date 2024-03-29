import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <AppBar color="transparent" position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Link to="/camera" style={{ textDecoration: 'none', color: 'inherit' }}>
            Cam
          </Link>
        </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Link to="/pictures" style={{ textDecoration: 'none', color: 'inherit' }}>
            Photos
          </Link>
        </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Link to="/map" style={{ textDecoration: 'none', color: 'inherit' }}>
            Map
          </Link>
        </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Link to="/chat" style={{ textDecoration: 'none', color: 'inherit' }}>
            Chat
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default App;
