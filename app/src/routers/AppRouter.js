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

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/login" component={LoginPage} exact={true} />
        {/* <PublicRoute path="/main" component={NavBar}  /> */}
        <PublicRoute path="/" component={Main} exact={true} />
        <PublicRoute path="/addItem" component={addItem} />
        <PrivateRoute path="/dashboard" component={DashboardPage} exact={true} />
        <PrivateRoute path="/chat" component={ChatPage} />
        <Route  component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
