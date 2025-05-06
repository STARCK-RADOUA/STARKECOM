import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/////////////////////////////////////////    MATERIAL UI    ////////////////////////////////
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Avatar, Button } from "@material-ui/core";


import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

///////////////////////////////////////      MATERIAL UI ICONS     ///////////////////////////////
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import PeopleIcon from "@material-ui/icons/People";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";

////////////////////////////////////////     REDUX          /////////////////////////////////////
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/userAction";

///////////////////////////////////////     CUSTOM STYLE    /////////////////////////////////////
import { useStyle } from "./customStyle/allFormsScreen";

import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
const crypto = require('crypto');
const RegisterScreen = ({isMobile, history, location, API }) => {
  const classes = useStyle();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    false
  );
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const register = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = register;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();

    //DISPATCH REGISTER
    if (password === confirmPassword) {
      dispatch(registerUser(API, name, email, password));
    } else {
      setMessage("Password does not match");
    }
  };

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function encryptUserId(userId, privateKey) {
  const cipher = crypto.createCipher('aes-256-cbc', privateKey);
  var encryptedId = cipher.update(userId, 'utf8', 'hex');
  encryptedId += cipher.final('hex');
  return encryptedId;
}

// Function to decrypt encrypted user ID


  const firstLoginDataGoogle = credentialResponse => {
    const credentialResponseDecoded = parseJwt(credentialResponse.credential) 
  console.log(credentialResponseDecoded);
  
  const privateKey = '3124a650f8938aee579c95641085d8e5210780239bb15aca9f697f2d6711338f';
// Access user data from the decoded token
const userEmail = credentialResponseDecoded.email;
const userName = credentialResponseDecoded.name;
const userId = credentialResponseDecoded.sub;
const encryptedId = encryptUserId(userId, privateKey);

// Now you can use this data as needed
console.log('User Email:', userEmail);
console.log('User Name:', userName);
console.log('User id:', userId);


    //DISPATCH LOGIN
    
   
    dispatch(registerUser(API, userName, userEmail, encryptedId));
};
return (
  <>
    {/* /// add custom title in Register Screen / */}
    <Meta title="eShop Register" />

    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={false} md={3}>
        <img
          src="/assets/images/auth/shopping_app.svg"
          className={isMobile ? classes.display : classes.image}
          alt="Login"
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6} component={Paper} elevation={0}>
        <Paper elevation={14} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PeopleIcon />
          </Avatar>
          <Typography className={classes.heading} component="h1" variant="h5">
            Sign Up
          </Typography>

          {/*///////////////////////////////    LOADER    /////////////////////////////////////////*/}
          {loading && <Loader />}

          <form className={classes.form}>
            <FormControl variant="outlined" className={classes.input}>
              <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-name"
                placeholder="Your Name"
                required
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <PeopleIcon className={classes.icon} />
                  </InputAdornment>
                }
                labelWidth={55}
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.input}>
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                placeholder="Email Address"
                required
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon className={classes.icon} />
                  </InputAdornment>
                }
                labelWidth={54}
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.input}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                placeholder="Password"
                required
                type={passwordVisibility ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon className={classes.icon} />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setPasswordVisibility(!passwordVisibility)}
                      onMouseDown={e => e.preventDefault()}
                      edge="end"
                    >
                      {passwordVisibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={90}
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.input}>
              <InputLabel htmlFor="outlined-adornment-confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmPassword"
                placeholder="Confirm Password"
                required
                type={confirmPasswordVisibility ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon className={classes.icon} />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}
                      onMouseDown={e => e.preventDefault()}
                      edge="end"
                    >
                      {confirmPasswordVisibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={168}
              />
            </FormControl>

            {/*//////////////////////     VALIDATION ERROR MESSAGE     ////////////////////////*/}

            {error && <Message varient="error">{error}</Message>}
            {message && <Message varient="error">{message}</Message>}

            <Button
              className={classes.button}
              onClick={submitHandler}
              size="large"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
            <GoogleLogin 
          onSuccess={firstLoginDataGoogle}
          onError={() => {
          console.log('Login Failed');
}}
/>;


            <Grid container>
              <Grid item>
                <Typography component="h5" className={classes.login}>
                  Already Registered? &nbsp;
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
                    variant="body2"
                  >
                    Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={false} sm={false} md={3}>
        <img
          src="/assets/images/auth/shopping.svg"
          className={isMobile ? classes.display : classes.image2}
          alt="Login"
        />
      </Grid>
    </Grid>
  </>
);
};

export default RegisterScreen;
