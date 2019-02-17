import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import ChatPage from '../components/ChatPage';
import LoginPage from '../components/LoginPage';
import addItem from '../components/AddItem';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Main from '../components/Main/Main';
import NavBar from "../components/General/NavBar";

export const history = createHistory();

const AppRouter = () => (

  <Router history={history}>
    <div className="main">
      <NavBar />
      <div>
        <Switch>

          <PublicRoute path="/login" component={LoginPage} exact={true} />
          {/* <PublicRoute path="/main" component={NavBar}  /> */}
          <PublicRoute path="/" component={Main} exact={true} />
          <PublicRoute path="/addItem" component={addItem} />
          <PublicRoute path="/dashboard" component={DashboardPage} exact={true} />
          <PublicRoute path="/chat" component={ChatPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>

  </Router>
);


export default AppRouter;
