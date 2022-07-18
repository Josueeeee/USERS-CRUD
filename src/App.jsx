import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import UsersForm from './components/UsersForm';
import UsersList from './components/UsersList';


function App() {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([])
  const [selectUser, setSelectUser] = useState(null)

  const getModal = () => {
    setModal(!modal)
  }

  const deSelectUser = () => {
    setSelectUser(null)
  }
  useEffect(() => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res => { setUsers(res.data) })
  }, [])

  const getUserList = () => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res => { setUsers(res.data) })
  }

  const deleteUser = (id) => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => {
        getUserList()
      }
      )
  }
  const userSelected = (user) => {
    getModal();
    setSelectUser(user);
  }
  const closeModal = () => {
    setSelectUser(null);
    setModal(!modal)
  }

  return (
    <div className="App">
      <div className='container'>
        <h1 className='title' style={{color: "white"}}>User</h1>
        <div>
          <button className='Btn' onClick={getModal}><i className="fa-solid fa-plus"></i> Create User</button>
        </div>
      </div>
      {
        modal ? (
          <div className='container-modal'>
            <div className='modal modal-close'>
              <div className='signupFrm'>
              <UsersForm getModal={getModal} getUserList={getUserList} selectUser={selectUser} deSelectUser={deSelectUser}  closeModal={closeModal} />
              </div>
            </div>
          </div>
        ) : (
          <>
          </>
        )
      }
      <div>
        <UsersList users={users} userSelected={userSelected} deleteUser={deleteUser} />
      </div>
    </div>
  )
}

export default App
