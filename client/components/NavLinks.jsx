import React from 'react';
import { Button } from '@material-ui/core';
import FacebookLogin from 'react-facebook-login';
const NavLinks = ({ isLoggedIn }) => {

  return (
    <div className="nav-links">
      {!isLoggedIn && <Button variant="contained" size="small" href="/auth/facebook" color="primary">
          Login with Facebook
        </Button>}
      {isLoggedIn && <Button variant="contained" size="small" href="/logout" color="primary">
          Logout
        </Button>}
    </div>
      // <FacebookLogin
      // appId="318062672725904"
      // autoLoad={true}
      // fields="name,email,picture"
      // onClick={componentClicked}
      // callback={responseFacebook} />
  );
};

export default NavLinks;
