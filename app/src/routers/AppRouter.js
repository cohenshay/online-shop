import React from 'react';
import { Router, BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import ChatPage from '../components/Chat/ChatPage';
import LoginPage from '../components/LoginPage';
import addItem from '../components/AddItem';
import Main from '../components/Main/Main';
import ItemDetails from '../components/Items/ItemDetails';
import NavBar from "../components/General/NavBar";

export const history = createHistory();

const AppRouter = () => (

  <Router history={history}>
    <div className="main">
      <NavBar />
      <div className="content-area">
          <Switch>
            <Route path="/login" component={LoginPage} exact={true} />
            <Route path="/" component={Main} exact={true} />
            <Route path="/addItem" component={addItem} />
            <Route path="/chat/:subject" component={ChatPage} />
            <Route path="/ItemDetails" component={ItemDetails} />
            <Route component={NotFoundPage} />
          </Switch>
      </div>
    </div>

  </Router>
);


export default AppRouter;
