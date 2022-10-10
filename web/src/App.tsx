import React from 'react';

import { Routes } from './routes/index.routes';
import { AuthContextProvider } from './contexts/AuthContext';

import './assets/styles/global.css';

function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}

export default App;
