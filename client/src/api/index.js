import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`;
  }
  return req;
});

export const logIn = (formData) => API.post('/form/auth', formData);
export const signUp = (formData) => API.post('/form/users', formData);
export const getStudents = () => API.get('/form/students');
export const getTeachers = () => API.get('/form/teachers');
export const addStudent = (formData) => API.post('/form/students', formData);
export const addTeacher = (formData) => API.post('/form/teachers', formData);
export const removeStudent = (formData) =>
  API.delete('/form/students', formData);
export const removeTeacher = (formData) =>
  API.delete('/form/teachers', formData);
