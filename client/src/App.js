import React, {Fragment, useState} from 'react';
import './App.css';
import Boards from "./containers/Boards"
import About from "./containers/About"
import Theme from "./containers/Theme"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {
  const [task, setTask] = useState("");
  return <Fragment>
    <Router>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <a className="navbar-brand" href="#">DuoRoadmap</a>
  <ul className="navbar-nav">
    <li className="nav-item active">
      <Link className="nav-link" to="/">Home</Link>
    </li>
    <li className="nav-item">
     <Link  className="nav-link"  to="/about">About</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link"  to="/boards">Topics</Link>
    </li>
    <li className="nav-item">
      <a className="nav-link disabled" href="#">Disabled</a>
    </li>
  </ul>

  <form className="form-inline" action="/action_page.php">
    <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
    <button className="btn btn-success" type="submit">Search</button>
  </form>
</nav>

      <div>
      
       

        <Switch>
          <Route path="/boards/:id">
            <Theme/>
          </Route>

          <Route path="/boards">
            <Boards/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/">
            <Boards/>
          </Route>
          
          

      

        </Switch>
      </div>
      
    </Router>
    
   
  </Fragment>;
}

export default App;
