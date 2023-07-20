import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../redux/user-slice';

const View = () => {
    const {loading, users} = useSelector(state=>state.userSlice);
    console.log('::::: Users ', users, 'Loading ', loading);
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(fetchUsers());
    },[]);
  return (
    <div>
     
       {loading?<p>User Fetching...</p>:users.map((user,index)=><p key ={index} >{user.email} {user.phone}</p>)} 
      {/* {users.length === 0?<p>No Record Found....</p>:users.map((user,index)=><p key ={index} >{user.email} {user.phone}</p>)} */}
    </div>
  )
}

export default View