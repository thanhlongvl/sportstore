import React, { Component } from 'react';
import './assets/W3.css';
import './assets/style.css';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Banner from './components/Banner';
import routes from './routers';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
              <Header />
              <div className="content">
                <Banner />
		            <br/>
                <div className="w3-row">
                  <Sidebar />
                    {this.showcontent(routes)}
                </div>
              </div>
              <Footer />
          </div>
      </Router>
    );
  }

  showcontent = (routes) => {
    var result = null;
    if (routes.length >0 ) {
      result = routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} exact={route.exact} component={route.main}  />
        )
      });
    }
    return <Switch>{result}</Switch>
  }
}

export default App;
