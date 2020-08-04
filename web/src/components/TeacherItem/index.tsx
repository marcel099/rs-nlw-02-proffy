import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://pbs.twimg.com/profile_images/1210212385576955905/PCYCf6KR_400x400.jpg" alt="Marcelo Lupatini"/>
        <div>
          <strong>Marcelo Lupatini</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sem mauris, consequat sit amet volutpat sit amet, dictum at odio. Nulla facilisi.
        Quisque quis condimentum risus, nec efficitur erat. Pellentesque semper magna id libero faucibus, at eleifend ligula suscipit. Suspendisse elit lorem, cursus a lacus id, posuere convallis tortor. Quisque non diam convallis, posuere lacus at, consectetur nibh. Etiam facilisis pulvinar neque non accumsan. Pellentesque elementum bibendum posuere.
        <br/> <br/>
        Quisque sed consectetur justo, ac consectetur est. Sed pulvinar mi non dui ultricies aliquet. Etiam sed lacus in ex pellentesque euismod eget non mauris.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem;