import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, useHistory, Switch, withRouter, Link, Route } from 'react-router-dom';
import history from '../history';

import Header from './Header';
import Results from './Results';
import Profile from './Profile';
import Search from './Search';


const App = props => {
  const [isLoggedIn, setIsLoggedIn] = useState('false');
  const [address, setAddress] = useState('');

  // TO-DO: Need logic to test if logged in (Facebook cookie & GET request to sessions database)
  // This is a last-minute attempt to get this to work

  // useEffect(() => {
  //   fetch('/checklogin')
  //     // .then(data => data.json())
  //     .then(data => {
  //       console.log(data);
  //       if (data.status === 314) {
  //         console.log("User is not logged in");
  //       } else {
  //         console.log(data);
  //         setIsLoggedIn('true');
  //         console.log("User is logged in!");
  //       }
  //     })
  // }, [])


  // takes google autocomplete result and parses into object for backend
  const onAddressSubmit = (address) => {
    let splitAddress = address.description.split(', ');
    const addressObj = {};
    addressObj['addressLine'] = splitAddress[0];
    addressObj['city'] = splitAddress[1];
    addressObj['state'] = splitAddress[2];
    setAddress(addressObj);
    history.push('/results')
  }

  // google places is a paid api... insert your key here
  const API_KEY = '';

  return (
    <React.Fragment>
      <Header />
      {/* wrapped router with history object because it was the only way we could figure out how to render results page while keeping our address state */}
      <Router history={ history }>
        <Switch>
          <Route path='/results'>
            <Results address={ address } isLoggedIn={ isLoggedIn } />
          </Route>
          <Route path='/profile'>
            <Profile address={ address }/>
          </Route>
          <Route exact path='/' >
            <Search address={ address } apiKey={ API_KEY } onSubmit={ onAddressSubmit }/>
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
};

export default App;
