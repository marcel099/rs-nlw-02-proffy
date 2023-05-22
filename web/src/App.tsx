import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from '@contexts/AuthContext';
import { Routes } from '@routes/index.routes';

import './shared/styles/global.css';

import { HotToastContainer } from '@components/HotToastContainer';

export function App() {
  return (
    <>
      <HotToastContainer />
      <AuthContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}
