// components/MyComponent.js

import React, { useEffect } from 'react';

import Card from 'react-bootstrap/Card';

import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../slices/authSlice';
import Loader from '../components/Loader';

const User = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state)=>state.auth); 
  const data = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(fetchData(userInfo._id||userInfo.id));
  }, [dispatch]);
console.log(data)

  return (
    <div>
      {data?data.map((user)=>{
        return(<div> <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>user details:-</Card.Title>
          <Card.Text>
            <div><b>Name:-</b>
  {user.name} </div>
  <div><b>Email:-</b>
  {user.email} </div>
  <div><b>Mobile:-</b>
  {user.mobileNumber} </div>
           </Card.Text>
         
        </Card.Body>
      </Card>
      <br/></div>)
      }):<Loader />}
   
    </div>
  );
};

export default User;
