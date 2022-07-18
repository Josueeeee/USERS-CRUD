import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'

const UsersForm = ({ getModal, getUserList, selectUser, deSelectUser, closeModal }) => {
    const { register, reset, handleSubmit } = useForm();
    const [passwordgt, setPasswordgt ] =useState(false);
    useEffect(() => {
        if (selectUser !== null) {
            {
                reset({
                    first_name: selectUser.first_name,
                    last_name: selectUser.last_name,
                    email: selectUser.email,
                    password: selectUser.password,
                    birthday: selectUser.birthday
                })
            }
        }
    }, [selectUser])

    const submit = (data) => {
        if (selectUser !== null) {
            axios.put(`https://users-crud1.herokuapp.com/users/${selectUser.id}/`, data)
                .then(() => {
                    getUserList()
                    reset()
                    getModal()
                    deSelectUser()
                })
                .catch(error => { alert(error.response) })
        } else {
            axios.post("https://users-crud1.herokuapp.com/users/", data)
                .then(() => {
                    getUserList()
                    reset()
                    getModal()
                })
                .catch(error => { alert(error.response) })
        }
    }

    const passwordaction =() =>{
        setPasswordgt(!passwordgt)
    }
    console.log(passwordgt)
    return (
        <form  className='form' onSubmit={handleSubmit(submit)}>
            <button className='Btnred' onClick={() => closeModal()}> x</button>
            {selectUser !== null ?( <h3 className='title'>EDIT USER</h3>) :( <h3 className='title'>CREATE USER</h3>)}
                <div className='inputContainer'>
                <input type="text" className='input' id='firstName' {...register('first_name')} />
                <label htmlFor="firstName" className='label'>First Name</label> 
                </div>

                <div className='inputContainer'>
                <input type="text" className='input' id='LastName' {...register('last_name')} />
                <label htmlFor="LasttName" className='label'>Last Name</label>
                </div>
              
              <div className='inputContainer'>
                <input type="email" className='input' id='email' {...register('email')} />
                <label htmlFor="email" className='label'>Email</label>
              </div>

                <div className='inputContainer'>
             
                <input type={passwordgt ? "text": "password"} className='input' id='password' {...register('password')} /> 
                <label htmlFor="password" className='label' >password</label>
                </div >   <button className='BtnM'  type='button' onClick={()=> {passwordaction()}}>{passwordgt ? "hide": "show"}</button>

                <div className='inputContainer'>
                <input type="date" className='input' id='birthday' {...register('birthday')} />
                <label htmlFor="birthday" className='label'>birthday</label>
                </div>             
                <div>
                    <button className='Btn'>{selectUser !== null ? "Edit" : "Create"}</button>
                </div>
          
        </form>
    );
};

export default UsersForm;