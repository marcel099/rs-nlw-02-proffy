import React, { FormEvent, useState } from 'react';
import Input from '../../Input';
import { SubmitFormButton } from '../SubmitFormButton';

import './styles.css';

export function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleCreateUser(e: FormEvent) {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
    }

    console.log(data);
  }

  return (
    <main id="sign-up-container">
      <h1>Cadastro</h1>
      <p>Preencha os dados abaixo<br/>para começar</p>

      <form onSubmit={handleCreateUser}>
        <Input
          name="name"
          label="Nome"
          value={firstName}
          onChange={ (e) => setFirstName(e.target.value) }
        />
        <Input
          name="last-name"
          label="Sobrenome"
          value={lastName}
          onChange={ (e) => setLastName(e.target.value) }
        />
        <Input
          name="email"
          label="E-mail"
          value={email}
          onChange={ (e) => setEmail(e.target.value) }
        />
        <Input
          name="password"
          label="Senha"
          value={password}
          onChange={ (e) => setPassword(e.target.value) }
        />

        <footer className="submit-button-container">
          <SubmitFormButton
            type="submit"
            title="Concluir cadastro"
          />
        </footer>
      </form>
    </main>
  )
}
