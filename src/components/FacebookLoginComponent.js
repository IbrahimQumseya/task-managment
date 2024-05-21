import { Button } from '@material-ui/core';
import React from 'react';
// import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import { sentFacebookAuth } from '../api/authAPI';
import { login } from '../features/user/userSlice';

const FacebookLoginComponent = () => {
  const dispatch = useDispatch();
  const componentClicked = (res) => {
    console.log(res);
    // dispatch(sentFacebookAuth(res.accessToken));
  };
  const responseFacebook = (res) => {
    console.log('callback', res);
    dispatch(sentFacebookAuth(res.accessToken));
  };

  // const componentTest = () => {
  //   FB.getLoginStatus(function (response) {
  //     statusChangeCallback(response);
  //   });
  // };
  return (
    <div>
      {/* <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        fields='name,email'
        onClick={componentClicked}
        callback={responseFacebook}
        onFailure={componentClicked}
      /> */}
      {/* <Button onClick={google} /> */}
    </div>
  );
};

export default FacebookLoginComponent;
