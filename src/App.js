import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import { Switch, Route, Link } from 'react-router-dom';

import AddMember from "./components/AddMember"
import Member from "./components/Member"
import MemberList from "./components/MemberList"
import AddTeam from './components/AddTeam';
import Team from './components/Team';
import TeamList from './components/TeamList';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/teams" className="navbar-brand">
          balaas
        </a>

        <div className="navbar-nav mr-auto">
        <li className="nav-item">
            <Link to={"/teams"} className="nav-link">
              Teams
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/addteam"} className="nav-link">
              Add Team
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/members"} className="nav-link">
              Members
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/addmember"} className="nav-link">
              Add Member
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">  
        <Switch>
          <Route exact path={["/", "/teams"]} component={TeamList} />
          <Route exact path="/addteam" component={AddTeam}/>
          <Route exact path="/team/:id" component={Team}/>

          <Route exact path="/members" component={MemberList} />
          <Route exact path="/addmember" component={AddMember} />
          <Route path="/member/:id" component={Member} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
