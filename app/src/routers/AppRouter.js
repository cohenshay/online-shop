import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import ChatPage from '../components/ChatPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NavBar from '../components/General/NavBar';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        {/* <PublicRoute path="/" component={LoginPage} exact={true} /> */}
        {/* <PublicRoute path="/main" component={NavBar}  /> */}
        <PublicRoute path="/" component={NavBar} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/chat" component={ChatPage} />
        <Route  component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
