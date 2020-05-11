import React, { Component } from 'react';
import {
  BrowserRouter, NavLink, Route, Switch
} from 'react-router-dom';
import { Menu, Header, Icon, Sidebar, Button, Label, Sticky } from 'semantic-ui-react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import FrontPage from './pages/FrontPage';
import AboutPage from './pages/AboutPage';
import Error404Page from './pages/Error404Page';

class App extends Component {

  constructor(props) {
    super(props);

    // init state here if needed
    this.handleItemClick = this.handleItemClick.bind(this);
    this._isMounted = false;
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleItemClick(e, {name}) {
    if (this._isMounted)
      this.setState({activeItem: name})
  }

  render() {
    console.log("Happy Rendering!");
    const {activeItem} = this.state;
    console.log("Active item is:");
    console.log(activeItem);
    return (
        <BrowserRouter>
          <Menu>

            <NavLink to="/">
              <Menu.Item link name="front" active={activeItem === "front"} onClick={this.handleItemClick}>
                Front
              </Menu.Item>
            </NavLink>

            <NavLink to="/about">
              <Menu.Item link name="about" active={activeItem === "about"} onClick={this.handleItemClick}>
                About
              </Menu.Item>
            </NavLink>

          </Menu>

          <div>
            <br/>
            <Switch>
              <Route exact path="/" component={FrontPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route path="*" component={Error404Page} />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
