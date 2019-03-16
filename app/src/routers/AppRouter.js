import React from 'react';
import { Router, BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import ChatPage from '../components/Chat/ChatPage';
import LoginPage from '../components/LoginPage';
import addItem from '../components/AddItem';
import Main from '../components/Main/Main';
import ItemDetails from '../components/Items/ItemDetails';
import NavBar from "../components/NavBar/NavBar";
import ContactUs from '../components/ContactUs';
import Payment from '../components/Payment';
import Cart from '../components/Cart';
import UserDetails from '../components/UserDetails/UserDetails';
import PrivateChat from '../components/Chat/PrivateChat';
import About from '../components/About';

export const history = createHistory();

const AppRouter = () => (

  <Router history={history}>
    <div className="main">
      <NavBar />
      <div className="content-area">
          <Switch>
          <Route path="/userDetails" component={UserDetails} exact={true} />
            <Route path="/login" component={LoginPage} exact={true} />
            <Route path="/" component={Main} exact={true} />
            <Route path="/addItem" component={addItem} />
            <Route path="/about" component={About} />
            <Route path="/ContactUs" component={ContactUs} />
            <Route path="/payment" component={Payment} />
            <Route path="/chat/:subject" component={ChatPage} />
            <Route path="/privateChat/:otheUser" component={PrivateChat} />
            {/* <Route path="/chat/" component={ChatPage}  exact={true}/> */}
            <Route path="/ItemDetails" component={ItemDetails} />
            <Route path="/cart" component={Cart} />
            <Route component={NotFoundPage} />
          </Switch>
      </div>
    </div>

  </Router>
);


export default AppRouter;
