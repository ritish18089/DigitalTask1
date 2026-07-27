import axios from 'axios';
import { Lead, LeadStatus } from '../types';

const API_URL = '/api';

export const submitLead = async (data: any) => {
  const response = await axios.post(`${API_URL}/leads`, data);
  return response.data;
};

export const adminLogin = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/admin/login`, { username, password });
  return response.data; // { token: '...' }
};

export const fetchLeads = async (token: string): Promise<Lead[]> => {
  const response = await axios.get(`${API_URL}/admin/leads`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const searchLeads = async (token: string, q: string): Promise<Lead[]> => {
  const response = await axios.get(`${API_URL}/admin/leads/search`, {
    params: { q },
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateLeadStatus = async (token: string, id: number, status: LeadStatus): Promise<Lead> => {
  const response = await axios.put(`${API_URL}/admin/leads/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteLead = async (token: string, id: number) => {
  const response = await axios.delete(`${API_URL}/admin/leads/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
