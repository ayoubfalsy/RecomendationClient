import React, { Component } from 'react'
import JsonData from './data/data.json';
import Home from "./components/Home/Home";
import {BrowserRouter , Route, Router, Switch} from 'react-router-dom';
import history from './history';
import Inscription from "./components/Login/Inscription";
import Login from "./components/Login/Login";
import ForgotPwd from "./components/Login/ForgotPwd";
import Profile from "./Profile/Profile";

export class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          landingPageData: {},
      }
  }

  getlandingPageData() {
    this.setState({landingPageData : JsonData})
  }

  componentDidMount() {
    this.getlandingPageData();
  }

  render() {
    return (
      <div>

          <BrowserRouter >
              <Router history={history}>
                  <Switch>
                      <Route  path="/LoginUser" name="Login" component={Login}/>
                      <Route  path="/Inscription" name="Inscription" component={Inscription}/>
                      <Route  path="/Mdpoublier" name="Mdpoublier" component={ForgotPwd}/>
                      <Route  path="/Profile" name="Profile" component={Profile}/>
                      <Route  exact path="/" name="Home" component={Home}/>
                  </Switch>
              </Router>
          </BrowserRouter >
      </div>
    )
  }
}

export default App;
