import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UsersList = ({ users, userSelected,deleteUser }) => {

    return (
        <div>
            <ul className='cards'>
                {users.map(user => (
                    <div className='container-card'  key={user.id}>
                        <li className='card'>
                            <h6 className='title2'>{user.first_name} {user.last_name}</h6>
                            <p ><i className="fa-solid fa-envelope color"> </i> {user.email}</p>
                            <p><i className="fa-solid fa-cake-candles color"> </i> {user.birthday}</p>
                        </li>
                        <div>
                            <button className='Btnred' onClick={()=> {deleteUser(user.id)}}><i className="fa-solid fa-trash-can"></i></button>
                            <br/>
                            <button  className='Btn' onClick={() => {userSelected(user)}}><i className="fa-solid fa-pen"></i></button>
                        </div>
                    </div>

                ))}
            </ul>
        </div>
    );
};

export default UsersList;