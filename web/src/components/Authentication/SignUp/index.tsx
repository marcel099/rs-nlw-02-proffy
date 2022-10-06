import React, { FormEvent, useState } from 'react';
import { InnerLabelInput } from '../../InnerLabelInput';
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
        <InnerLabelInput
          name="name"
          label="Nome"
          autoComplete="given-name"
          autoCapitalize="words"
          value={firstName}
          onChange={ (e) => setFirstName(e.target.value) }
        />
        <InnerLabelInput
          name="last-name"
          label="Sobrenome"
          autoComplete="family-name"
          autoCapitalize="words"
          value={lastName}
          onChange={ (e) => setLastName(e.target.value) }
        />
        <InnerLabelInput
          name="email"
          label="E-mail"
          autoComplete="email"
          autoCapitalize="off"
          value={email}
          onChange={ (e) => setEmail(e.target.value) }
        />
        <InnerLabelInput
          name="password"
          label="Senha"
          type="password"
          autoComplete="new-password"
          autoCapitalize="off"
          isPasswordField
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
