import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (
    <nav className="navbar navbar-light bg-light fixed-top">
      <Link className="navbar-brand" to="/">
      <img src="https://i.postimg.cc/tgT9CrR3/roadmagelogocropped.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        RoadMage
      </Link>
      {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-secondary navbar-btn" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <label className="mr-2 text-secondary" id="userdisplay">{auth0Client.getProfile().name}</label>
          <Link to="/">
          <button className="btn btn-primary navbar-btn" >Home</button>
          </Link>
          <Link to="/survey">
          <button className="btn btn-primary navbar-btn" >Survey</button>
          </Link>
          <button className="btn btn-primary navbar-btn" onClick={() => {signOut()}}>Sign Out</button>
        </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);