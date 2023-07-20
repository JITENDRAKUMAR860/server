import React from 'react'
import { useRef } from 'react'
import {useDispatch} from 'react-redux';
import { addUser } from '../redux/user-slice';
const Add = () => {
    const emailid = useRef();
    const phone = useRef();
    const dispatch = useDispatch();
    const addNewUser = ()=>{
            const user = {'email':emailid.current.value, 'phone':phone.current.value};
            // dispatch contains action name , and action contains payload (data)
            dispatch(addUser(user)); // Send data to reducer
    }
  return (
    <div>
        <h1>User Personal Info</h1>
        <input ref = {emailid} type = 'text' placeholder='Type Email here'/>
        <br/>
        <input ref = {phone} type = 'text' placeholder='Type Phone here'/>
        <br/>
        <button onClick={addNewUser}>Add User</button>
    </div>
  )
}

export default Add