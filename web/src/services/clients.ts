import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {}
});

const getClients = async (): Promise<Array<any>> => {
  try {
    const response: AxiosResponse = await instance.get('/clients');

    const data = response.data;
    if (response.status === 200) {
      return data;
    } else {
      throw new Error(data.message || 'failed');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const createClient = async (data: any): Promise<void> => {
    try {
        const response: AxiosResponse = await instance.post('/clients', data);
    
        if (response.status === 200) {
          return;
        } else {
          throw new Error('failed');
        }
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

const delClient = async (id: string): Promise<void> => {
    try {
        const response: AxiosResponse = await instance.delete(`/clients/${id}`);
    
        if (response.status === 200) {
          return;
        } else {
          throw new Error('failed');
        }
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

const editClient = async (id: string, data: any): Promise<void> => {
    try {
        const response: AxiosResponse = await instance.put(`/clients/${id}`, data);
    
        if (response.status === 200) {
          return;
        } else {
          throw new Error('failed');
        }
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

export { getClients, createClient, delClient, editClient };