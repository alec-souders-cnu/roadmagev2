import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Map from './Map/Map';
import Callback from './Callback';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import Survey from './Survey/Survey';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }


  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  // async submit(username, temperament, transmission, vehicle, time, fuel) {
  //   var express = require('express');
  //   var app = express();
  //   var mysql = require('mysql');
  //   var bodyParser = require('body-parser');

  //   app.use(bodyParser.json());
  //   app.use(bodyParser.urlenconded({extended: false}));
  //   app.use(express.static('public'));

  //   var connection = mysql.createConnection({
  //       host: 'roadmagev2.cdauati8nzkb.us-east-1.rds.amazonaws.com',
  //       user: 'admin',
  //       password: 'Wrxtra!5',
  //       database: 'roadmagev2'
  //   });

  //   connection.connect();

  //   app.post('/data', function(req, res){
        
  //       var sql = "INSERT INTO `userinfo` (user, temperament, transmission, vehicle, time, fuel) VALUES ('"+username+"','"+temperament+"','"+transmission+"','"+vehicle+"','"+time+"','"+fuel+"') ON DUPLICATE KEY UPDATE";
  //       connection.query(sql, function(err, result){
  //           if(err) throw err;

  //           console.log("info updated");
  //       });
  //       res.send(username);
  //   });

  //   app.listen(3000,function(){
  //     console.log("Sever listening on port 3306");
  //   });
  // }

  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={Map}/>
        <Route exact path='/callback' component={Callback}/>
        <SecuredRoute path='/survey' component={Survey} />
      </div>
    );
  }
}

export default withRouter(App);