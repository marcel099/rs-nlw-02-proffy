import React from 'react';

import LockScreen from '../../components/LockScreen';
import Input from '../../components/Input';

import './styles.css';

function Login() {
  return (
    <main id="login-wrapper">
      <LockScreen />
      <section>
        <form>
        <legend>Seus dados</legend>
          <Input
            name="name"
            label="Nome completo"
          />
          </form>
      </section>
    </main>
  );
}

export default Login;