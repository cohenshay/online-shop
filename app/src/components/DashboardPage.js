import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const DashboardPage = () => (
  <div>
    Dashboard page content2
    <Link to="/chat">Chat</Link>
  </div>
);

export default DashboardPage;
