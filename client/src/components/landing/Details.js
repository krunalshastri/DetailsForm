import React, { useState, useEffect } from 'react';
import Data from './Data';
import * as api from '../../api/index';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const Details = () => {
  const [studList, setStudList] = useState([]);
  const [teaList, setTeaList] = useState([]);
  const [age, setAge] = useState('');
  const [subject, setSubject] = useState('');
  const [isMounted, setIsMounted] = useState(true);
  const history = useHistory();
  const classes = useStyles();

  useEffect(async () => {
    const sdata = await api.getStudents();
    setStudList(sdata.data);
    const tdata = await api.getTeachers();
    setTeaList(tdata.data);

    if (isMounted) setIsMounted(false);
  }, [isMounted]);

  function handleOnSubmit(text) {
    return async (event) => {
      event.preventDefault();
      if (text === 'student') {
        const data = await api.addStudent({ age });
        setAge('');
        setIsMounted(true);
      } else {
        const data = await api.addTeacher({ subject });
        setSubject('');
        setIsMounted(true);
      }
    };
  }

  const handleOnChange = (event) => {
    if (event.target.name === 'age') {
      setAge(event.target.value);
    } else {
      setSubject(event.target.value);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Button
        color='secondary'
        variant='contained'
        size='small'
        onClick={handleLogout}
        className={classes.Button}
      >
        LogOut
      </Button>
      <Data
        type='Teacher'
        age=''
        subject='subject'
        additional='Subject'
        list={teaList}
        changeMounted={() => setIsMounted(true)}
      />

      <form onSubmit={handleOnSubmit('teacher')}>
        <TextField
          name='subject'
          value={subject}
          label='Subject'
          onChange={handleOnChange}
        ></TextField>

        <Button
          color='primary'
          variant='contained'
          size='small'
          type='submit'
          children='teacher'
        >
          Add yourself as a Teacher
        </Button>
      </form>
      <Data
        type='Student'
        age='age'
        subject=''
        additional='Age'
        list={studList}
        changeMounted={() => setIsMounted(true)}
      />
      <form onSubmit={handleOnSubmit('student')}>
        <TextField
          name='age'
          label='Age'
          value={age}
          onChange={handleOnChange}
        ></TextField>
        <Button
          color='primary'
          variant='contained'
          size='small'
          type='submit'
          children='student'
        >
          Add yourself as a Student
        </Button>
      </form>
    </div>
  );
};

export default Details;
