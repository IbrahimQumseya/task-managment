import axios from '../api/newAPI';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Button } from '@material-ui/core';

const GoogleAuth = () => {
  const [user, setUser] = useState();
  // const google = async () => {
  //   // const data = await axios.get('/auth/google');
  //   // console.log(data);
  //   window.open('http://localhost:3000/auth/google', '_self');
  // };
  const onSuccess = async (res) => {
    try {
      console.log(res);
      const result = await axios.post('/auth/google', {
        token: res,
      });

      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <GoogleLogin
        clientId='579634652295-dtugto5edpbn5qckt95bttviqb5g7d3s.apps.googleusercontent.com'
        onSuccess={onSuccess}
      />
      {/* <Button onClick={google} size='large'>
        SIGNITTT
      </Button> */}
    </div>
  );
};

export default GoogleAuth;
