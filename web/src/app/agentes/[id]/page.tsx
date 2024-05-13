"use client"

import NavBar from '@/components/Navbar';
import GlobalStyle from '../../../styles/global';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { delClient, editClient } from '@/services/clients';
import { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import { getAgent } from '@/services/agents';
import Papa from 'papaparse';

const Content = styled.main`
  text-align: center;
  margin-top: 50px;
`;

type Clients = {
  id: string
  name: string
  email: string
  contact: string
  address: string
  status: string
  agent: string
}

type Agent = {
  id: string;
  name: string;
  email: string;
}

const Page: NextPage = () => {
  const path = usePathname();
  const id = path.substring(path.lastIndexOf('/') + 1);

  const [agent, setAgent] = useState<Agent>();
  const [clients, setClients] = useState<Array<Clients>>([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [agentInput, setAgentInput] = useState('');
  const [editingId, setEditingId] = useState<string|null>(null);

  const [loaded, setLoaded] = useState(false);

  const loadClients = async () => {
    getAgent(id).
      then((data) => {
        console.log(data)
        const clients = new Array<Clients>; 
        data.clients.map((c: { id: any; name: any; email: any; contact: any; address: any; status: any; agent: any; }) => clients.push({id: c.id, name: c.name, email: c.email, contact: c.contact, address: c.address, status: c.status, agent: c.agent}))

        setClients(clients);
        setAgent({
          id: id,
          name: data.name,
          email: data.email
        })
      }).
      catch((err) => {
        console.log(err) 
        alert('Alguma coisa deu errado. Tente novamente mais tarde.')
      })
  }

  useEffect(() => {
    if (!loaded) {
      loadClients();
      setLoaded(true);
    }
  }, [loaded])

  const handleExportCSV = () => {
    const filteredClients = filterStatus != "" ? clients.filter(c => c.status == filterStatus) : clients;
    const csv = Papa.unparse(filteredClients, {
      columns: ['id', 'name', 'email', 'contact', 'address', 'status', 'agent'],
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'clients.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    editClient(editingId || '', { name: nameInput, email: emailInput, contact: contactInput, status: statusInput, address: addressInput, agent: agentInput }).
      then(() => {
        setLoaded(false);
      }).
      catch((err) => alert('Alguma coisa deu errado. Tente novamente mais tarde.'))
  };

  const handleDelete = (id: any) => {
    delClient(id).
      then(() => {
        setLoaded(false);
      }).
      catch((err) => alert('Alguma coisa deu errado. Tente novamente mais tarde.'))
  };

  const handleEdit = (id: string) => {
    const ToEdit = clients.find(c => c.id === id);
    if (ToEdit) {
      setNameInput(ToEdit.name);
      setEmailInput(ToEdit.email);
      setStatusInput(ToEdit.status);
      setAddressInput(ToEdit.address);
      setContactInput(ToEdit.contact);
      setAgentInput(ToEdit.agent);
    }
    setEditingId(id);
  };
  
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Content>
        <div className='flex-column items-center justify-center p-10'>
          <div className='justify-items-start mb-4'>
            <h1 className="text-3xl mb-4">Agente</h1>
            <div>
              <p>Id: {id}</p>
              <p>Nome: {agent?.name}</p>
              <p>Email: {agent?.email}</p>
            </div>
          </div>
          <h1 className="text-3xl mb-4">Clientes</h1>
          <form onSubmit={handleUpdate} className="mb-6">
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
            <div className='flex flex-column gap-5'>
              <input
                type="text"
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                placeholder="Digite o contato"
                className="w-full p-2 mb-2 text-black"
              />
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="Digite o endereco"
                className="w-full p-2 mb-2 text-black"
              />
            </div>
            <div className='flex flex-column gap-5'>
              <select 
                name="status" 
                id="status" 
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value)} 
                className="w-full p-2 mb-2 text-black"
                disabled={!editingId}
              >
                <option value="1">Aguardando</option>
                <option value="2">Em Atendimento</option>
                <option value="3">Proposta Feita</option>
                <option value="4">Não completa</option>
                <option value="5">Vendido</option>
              </select>
              <input
                type="text"
                value={agentInput}
                onChange={(e) => setAgentInput(e.target.value)}
                disabled
                className="w-full p-2 mb-2 text-black"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded">
              {"Atualizar"}
            </button>
          </form>
          <ul>
            {clients.map(c => (
              <li key={c.id} className="flex justify-between items-center mb-2 p-2 bg-gray-800 rounded">
                <div className="flex space-x-20">
                  <span>{c.name}</span>
                  <span>{c.email}</span>
                  <span>{c.contact}</span>
                  <span>{c.address}</span>
                </div>
                <div>
                  <button onClick={() => handleEdit(c.id)} className="bg-yellow-500 hover:bg-yellow-600 py-1 px-3 mr-2 rounded">Edit</button>
                  <button onClick={() => handleDelete(c.id)} className="bg-red-500 hover:bg-red-600 py-1 px-3 rounded">Delete</button>
                </div>
              </li>
            ))}
          </ul>
          {
            clients.length > 0 && (
              <div className='flex flex-col items-start'>
                <h3 className="text-3xl my-5">Exportar</h3>
                <div className="filter-export-section items-start flex gap-5">
                  <button onClick={handleExportCSV} className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded ">
                    Export
                  </button>
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="p-2 mb-2 text-black">
                    <option value="">Select Status</option>
                    <option value="1">Aguardando</option>
                    <option value="2">Em Atendimento</option>
                    <option value="3">Proposta Feita</option>
                    <option value="4">Não completa</option>
                    <option value="5">Vendido</option>
                  </select>
                </div>
              </div>
            )
          }
        </div>
      </Content>
    </>
  );
}

export default Page;