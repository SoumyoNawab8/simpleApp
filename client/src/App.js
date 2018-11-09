import React, { Component } from 'react';
import Header from './header'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './auth/login';
import Register from './auth/register';

class Home extends Component {
  render(){
    return(
      <div className="jumbotron text-center">
  <h1 className="display-4">Hello, Visitor!</h1>
  <p className="lead">This is a simple MERN app.</p>
  <hr className="my-4" />
  <p>You can register yourself and can login.<br/>
    Please use top navigation to signup and register.<br/>
    Thank You
  </p>
</div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
       <Header />
       <Route exact path="/" component={Home} />
       <Route exact path="/login" component={Login} />
       <Route exact path="/register" component={Register} />

      </div>
      </Router>
    );
  }
}

export default App;
