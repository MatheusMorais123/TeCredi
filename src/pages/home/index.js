import React, { useEffect, useState } from "react";
import './style.css'
import PaginationComponent from "../../components/pagination";
import Modal from "../../components/modal";
import Header from "../../components/header";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [usersTodos, setUserTodos] = useState([]);
    const [itensPerPage, setItensPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ascendingSort, setAscendingSort] = useState(true)
    const pages = Math.ceil(users.length / itensPerPage);

    const startIndex = currentPage * itensPerPage;
    
    const endIndex = startIndex + itensPerPage;
    
    const currentItens = users.slice(startIndex, endIndex);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                setUsers(res)
            });
    }, []);

    const Delete = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.status !== 200) {
                    return;
                } else {
                    setUsers(
                        users.filter((user) => {
                            return user.id !== id;
                        })
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onGet = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(res => {
                setUserTodos(res)
            });
    };

    function Todo(id) {
        onGet(id);
        setIsModalVisible(true);
    };

    function sortByName() {

        const result = users.sort((a, b) => {
    
          if(ascendingSort) {
            return a.name > b.name ? 1 : -1
          } else {
            return a.name > b.name ? -1 : 1
          }
        });
    
        setUsers([...result]);
        setAscendingSort(!ascendingSort)
    };
    
    return (
        
        <div id="page-home">
            <Header />
            <div className="container">
                <h3>
                    Lista de usuários
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Endereço</th>
                            <th>Emissão</th>
                            <th>Telefone</th>
                            <th>WebSite</th>
                            <th>Compania</th>
                            <th><button className="button-generic" onClick={() => sortByName()}>Ordenar</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItens && currentItens.map((e) => (
                            <tr key={e.id}>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.address.street}</td>
                                <td>{e.phone}</td>
                                <td>{e.phone}</td>
                                <td>{e.website}</td>
                                <td>{e.company.name}</td>
                                <td><button className="button-generic" onClick={() => Delete(e.id)}>Deletar</button></td>
                                <td><button className="button-generic" onClick={() => Todo(e.id)}>Tarefas</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isModalVisible ? (
                    <Modal onClose={() => setIsModalVisible(false)}>
                        <div className="list">
                            <ul>
                                <h4>Resumo</h4>
                                {usersTodos.map((e) => (
                                    <li key={e.id}>
                                        <p>Titulo: {e.title}</p>
                                        <p>Tarefa: {e.completed == true ? "Concluída" : "Não concluída"}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </Modal>
                ) : null}
                <PaginationComponent pages={pages} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    );
}