import React, { useState } from "react";
import './style.css'


export default function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUserName] = useState('')

  const addUser = (name, email, username) => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        username: username
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => { 
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addUser(name, email, username)
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.username.value = "";
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1> Cadastro </h1>
          <p>Cadastrar usuários</p>
        </section>
        <form onSubmit={handleOnSubmit} >
          <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Nome de usuário" value={username} onChange={e => setUserName(e.target.value)} />
          <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  );
}