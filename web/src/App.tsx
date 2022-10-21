import { AuthContextProvider } from '@contexts/AuthContext';
import { Routes } from '@routes/index.routes';

import './shared/styles/global.css';

export function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}
