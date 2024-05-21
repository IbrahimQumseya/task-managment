import { Avatar, Button, Container, CssBaseline, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  createUserDetails,
  fetchGetUserDetails,
  getUserProfileImage,
  updateUserDetails,
  updateUserProfile,
} from '../../api/userAPI';
import { selectUser, setUserFirstnameLastname } from '../../features/user/userSlice';
import SignIn from '../SignIn';
import { styled } from '@mui/material/styles';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useTranslation } from 'react-i18next';
import BasicAlerts from '../../components/BasicAlerts';

const Input = styled('input')({
  display: 'none',
});

const ProfileUser = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userDetails = useSelector((state) => state.user.userDetails);
  const status = useSelector((state) => state.user);
  const user = useSelector(selectUser);
  const doesUserHaveProfilePicture = useSelector((state) => state.user.user.profileImage);
  const selectUserProfileImage = useSelector((state) => state.user.profileImage);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [telephone, setTelephone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idUser, setIdUser] = useState('');

  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [enableEdit, setEnableEdit] = useState(true);

  useEffect(() => {
    dispatch(fetchGetUserDetails());
    if (doesUserHaveProfilePicture) {
      dispatch(getUserProfileImage());
    }
  }, [dispatch, doesUserHaveProfilePicture]);

  // useEffect(() => {
  //   if (!selectUserProfileImage.match('blob:')) {
  //     dispatch(getUserProfileImage());
  //   }
  // }, [dispatch, selectUserProfileImage]);

  useEffect(() => {
    setImage(selectUserProfileImage || null);
    setLocation(userDetails.location || '');
    setNumber(userDetails.number || '');
    setTelephone(userDetails.telephone || '');
    setAddress(userDetails.address || '');
    setLastName(user.lastName);
    setFirstName(user.firstName);
    setIdUser(user.id);

    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }, [userDetails, user, message, selectUserProfileImage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        userDetails.location &&
        userDetails.address &&
        (userDetails.telephone || userDetails.telephone === 0) &&
        (userDetails.number || userDetails.number === 0) &&
        user.firstName &&
        user.lastName
      ) {
        const bodyParameters = {
          firstName,
          lastName,
          location,
          address,
          number: String(number),
          telephone: String(telephone),
        };
        dispatch(updateUserDetails(bodyParameters));
        setEnableEdit(!enableEdit);
        setMessage('User has been updated cu success');
        dispatch(setUserFirstnameLastname({ firstName, lastName }));
      }
      if (
        !userDetails.location &&
        !userDetails.address &&
        (!userDetails.number || !userDetails.number === 0) &&
        (!userDetails.telephone || !userDetails.telephone === 0)
      ) {
        const bodyParameters = {
          idUser,
          location,
          address,
          number: String(number),
          telephone: String(number),
        };
        console.log(bodyParameters);
        dispatch(createUserDetails(bodyParameters));
      }
    } catch (error) {
      //ErrorMessage
    } finally {
      dispatch(fetchGetUserDetails());
    }
  };

  const handleChangeImage = (e) => {
    let formData = new FormData();
    let file = e.target.files[0];
    if (file) {
      formData.append('file', file);
      dispatch(updateUserProfile(formData));
    }
    if (!image.match('blob:')) {
      console.log('match');
      dispatch(getUserProfileImage());
    }
  };

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleChangeTelephone = (e) => {
    setTelephone(e.target.value);
  };

  if (isAuthenticated) {
    return (
      <Container maxWidth='md' component='main'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Stack direction='row' spacing={2} m={3} style={{ width: 100, height: 100 }}>
            <label htmlFor='icon-button-file'>
              <Input accept='image/*' id='icon-button-file' type='file' onChange={handleChangeImage} />
              <IconButton color='primary' aria-label='upload picture' component='span'>
                <Avatar alt='Remy Sharp' src={selectUserProfileImage || image} sx={{ width: 100, height: 100 }} />
              </IconButton>
            </label>
          </Stack>
          <Typography component='h1' variant='h5'>
            {t('UserDetails')}
          </Typography>
          <Box
            sx={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'right',
              alignSelf: 'flex-end',
              marginRight: 5,
            }}
          >
            <IconButton
              type='submit'
              onClick={() => setEnableEdit(!enableEdit)}
              sx={{ mt: 3, mb: 2, height: 45, width: 50 }}
            >
              <ModeEditIcon />
            </IconButton>
          </Box>
          {status.isFulfilled && (
            <Box sx={{ m1: 2 }} component='form' noValidate>
              <TextField
                margin='normal'
                fullWidth
                id='firstName'
                type='firstName'
                disabled={enableEdit}
                label={t('firstName')}
                InputLabelProps={{
                  shrink: true,
                }}
                value={firstName}
                onChange={handleChangeFirstName}
              />
              <TextField
                margin='normal'
                fullWidth
                id='lastName'
                type='lastName'
                disabled={enableEdit}
                label={t('lastName')}
                InputLabelProps={{
                  shrink: true,
                }}
                value={lastName}
                onChange={handleChangeLastName}
              />
              <TextField
                margin='normal'
                fullWidth
                id='location'
                disabled={enableEdit}
                label={t('location')}
                InputLabelProps={{
                  shrink: true,
                }}
                value={location}
                // value={location ? location : userDetails.location}
                onChange={handleChangeLocation}
              />

              <TextField
                margin='normal'
                fullWidth
                id='number'
                type='number'
                disabled={enableEdit}
                label={t('number')}
                InputLabelProps={{
                  shrink: true,
                }}
                value={number}
                onChange={handleChangeNumber}
              />
              <TextField
                margin='normal'
                fullWidth
                id='telephone'
                type='number'
                disabled={enableEdit}
                InputLabelProps={{
                  shrink: true,
                }}
                label={t('telephone')}
                value={telephone}
                onChange={handleChangeTelephone}
              />
              <TextField
                margin='normal'
                fullWidth
                id='address'
                label={t('address')}
                disabled={enableEdit}
                InputLabelProps={{
                  shrink: true,
                }}
                value={address}
                onChange={handleChangeAddress}
              />
              {message && <BasicAlerts severity='success' message={message} />}
              <Grid container>
                <Button
                  type='submit'
                  onClick={handleSubmit}
                  variant='contained'
                  sx={{ mt: 3, mb: 2, height: 45 }}
                  disabled={enableEdit}
                >
                  {t('SubmitChanges')}
                </Button>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    );
  }
  return <SignIn />;
};

export default ProfileUser;
