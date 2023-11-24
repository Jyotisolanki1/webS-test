import React from 'react'
import { useState, useEffect } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {Form ,Row,Col, Button} from 'react-bootstrap';
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.js';

export default function LoginScreen() {
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();
    const {userInfo} = useSelector((state)=>state.auth);

   

    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate,userInfo])
    
    const submitHandler = async(e) =>{
        e.preventDefault();
       try {   
         
           const res = await login({email ,password}).unwrap();
          
            dispatch(setCredentials({...res}));
           
             navigate('/');       
       } catch (err) {
     
       toast.error(err?.data?.message || err.error)
       }
    }
  return (
   <>
    <h1>Sign In</h1>
    <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='email'>
        <Form.Label>Email addrress</Form.Label>
        <Form.Control
        type="email"
        placeholder='Enter Email'
        value = {email}
        onChange={(e)=>setEmail(e.target.value)}
         />
      </Form.Group>
      <Form.Group className='my-2' controlId='password'>
        <Form.Label>Email password</Form.Label>
        <Form.Control
        type="password"
        placeholder='Enter Password'
        value = {password}
        onChange={(e)=>setPassword(e.target.value)}
         />
      </Form.Group>
      {isLoading && <Loader></Loader>}
      <Form.Group>
        <Button type='submit' variant='primary' className='mt-2'>Sing in</Button>
        <Row className='py-3'>
            <Col>New customer <Link to='/register'>Register</Link></Col>
        </Row>
      </Form.Group>
    </Form>
   </>
  )
}
