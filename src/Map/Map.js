import React, {Component} from 'react';
import auth0Client from '../Auth';

class Map extends Component {

  render() {
    if (!auth0Client.isAuthenticated()) {
      auth0Client.signIn();
    }

    document.getElementById('mapstuff').style.display = 'block';

    return (
      <div className="container">
        <div className="row">
        </div>
      </div>
    )
  }
}

export default Map;