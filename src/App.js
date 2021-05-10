import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import './App.css';

import 'semantic-ui-css/semantic.min.css';
import { Menu, Icon, Image } from 'semantic-ui-react';
import Particles from "react-particles-js";
import particleParams from './particles.json';

import WelcomePage from './pages/WelcomePage';
import ContactPage from './pages/ContactPage';
import Error404Page from './pages/Error404Page';
import DemoPage from './pages/DemoPage'

class App extends Component {

  constructor(props) {
    super(props);

    // init state here if needed
    this._isMounted = false;
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    console.log("Happy Rendering!");
    return (
        <Router>
          <Menu inverted stackable>

            <Menu.Item header>
              <Image size='mini' spaced src='../TritonCubed_LogoBase_Professional_White.png' /> TritonCubed
            </Menu.Item>

            <Menu.Item as={NavLink} to='/' exact>
              Welcome
            </Menu.Item>

            <Menu.Item as={NavLink} to='/teams' exact>
              Teams
            </Menu.Item>

            <Menu.Item as={NavLink} to='/projects' exact>
              Projects
            </Menu.Item>

            <Menu.Item as={NavLink} to='/sponsors' exact>
              Sponsors
            </Menu.Item>

            <Menu.Item as={NavLink} to='/contact' exact>
              Contact Us
            </Menu.Item>

            <Menu.Item as={NavLink} to='/demo' exact>
              Demo
            </Menu.Item>
          </Menu>

          {
            // uncomment when you want to try this out
            //<Particles id='particles-background' params={particleParams}/>
          }

          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/demo" component={DemoPage} />
            <Route path="*" component={Error404Page} />
          </Switch>
        </Router>
    );
  }
}

export default App;
