import React from 'react';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import * as api from '../../api/index';

const Data = (props) => {
  const type = props.type;

  const currentUser = JSON.parse(localStorage.getItem('user'));
  async function handleOnClick() {
    if (type == 'Student') {
      const data = await api.removeStudent();
      props.changeMounted();
    } else {
      const data = await api.removeTeacher();
      props.changeMounted();
    }
  }

  return (
    <div>
      <h1> {props.type} Data </h1>
      <div className='margins'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>{props.additional}</th>
            </tr>
          </thead>
          <tbody>
            {props.list.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  {props.additional === 'Age' ? (
                    <td>{item.age}</td>
                  ) : (
                    <td>{item.subject}</td>
                  )}
                  <td>
                    {currentUser?.profile.email === item.email && (
                      <DeleteIcon onClick={handleOnClick} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Data;
