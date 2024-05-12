import config from '../../config';
import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: `${config.API_URL}/api/v1`,
  headers: {}
});

const getAgents = async (): Promise<Array<any>> => {
  try {
    const response: AxiosResponse = await instance.get('/agents');

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

const createAgent = async (data: any): Promise<void> => {
    try {
        const response: AxiosResponse = await instance.post('/agents', data);
    
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

const delAgent = async (id: string): Promise<void> => {
    try {
        const response: AxiosResponse = await instance.delete(`/agents/${id}`);
    
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

const editAgent = async (id: string, data: any): Promise<void> => {
    try {
        const response: AxiosResponse = await instance.put(`/agents/${id}`, data);
    
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

const getAgent = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.get(`/agents/${id}`);

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

export { getAgents, createAgent, delAgent, editAgent, getAgent };