"use client"

import NavBar from '@/components/Navbar';
import GlobalStyle from '../../styles/global';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createAgent, getAgents } from '@/services/agents';

const Content = styled.main`
  text-align: center;
  margin-top: 50px;
`;

type Agents = {
  id: string
  name: string
  email: string
  status: string
}

export default function Agents() {
  const [agents, setAgents] = useState<Array<Agents>>([]);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [loaded, setLoaded] = useState(false);

  const loadAgents = async () => {
    getAgents().
      then((data) => {
        const agents = new Array<Agents>; 
        data.map((c) => agents.push({id: c.id, name: c.name, email: c.email, status: c.status }))

        setAgents(agents);
      }).
      catch((err) => {
        console.log(err) 
        alert('Alguma coisa deu errado. Tente novamente mais tarde.')
      })
  }

  useEffect(() => {
    if (!loaded) {
      loadAgents();
      setLoaded(true);
    }
  }, [loaded])

  const handleAdd = (e: any) => {
    e.preventDefault();
    createAgent({ name: nameInput, email: emailInput }).
      then(() => {
        setLoaded(false);
      }).
      catch((err) => alert('Alguma coisa deu errado. Tente novamente mais tarde.'))
  };

  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Content>
        <div className='flex-column items-center justify-center p-10'>
          <h1 className="text-3xl mb-4">Agentes</h1>
          <form onSubmit={handleAdd} className="mb-6">
            <div className='flex flex-column gap-5'>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Digite o nome"
                className="w-full p-2 mb-2 text-black"
              />
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Digite o email"
                className="w-full p-2 mb-2 text-black"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded">
              {"Adicionar"}
            </button>
          </form>
          <ul>
            {agents.map(c => (
              <li key={c.id} className="flex justify-between items-center mb-2 p-2 bg-gray-800 rounded">
                <div className="flex space-x-20">
                  <span>{c.name}</span>
                  <span>{c.email}</span>
                </div>
                <div>
                  <Link className="bg-blue-500 hover:bg-blue-600 py-1 px-3 mr-2 rounded" href={`agentes/${c.id}`}>
                    View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Content>
    </>
  );
}