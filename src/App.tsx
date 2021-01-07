import React from 'react';
import logo from './logo.svg';
import './App.css';
import {PlayerPage} from "./admin/PlayersPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps, Switch
} from "react-router-dom";
import {Players} from "./public/Players";
import {TeamPage} from "./admin/TeamPage";
import {DraftPage} from "./admin/DraftPage";
import {ScoresPage} from "./admin/Score/ScoresPage";
import {GameView} from "./admin/games/GameView";
import {Rules} from "./public/Rules";
const App: React.FC = () => {
  // window.name = process.env.REACT_APP_HOST==undefined?'not':process.env.REACT_APP_HOST;
  // window.name = "http://localhost:8080"
  window.name=''
  return (
      // <div className="App">
      //      <header className="App-header">
      //        <img src={logo} className="App-logo" alt="logo" />
      //      </header>
      //    </div>

    <Router>
      <div className="App">
        <ul className={"nav nav-tabs"} >
          <li className="nav-item">
            <a className="nav-link " href="/">Teams and Scores</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/playerPage">Player Page</a>
          </li>

          {/*<li className="nav-item">*/}
          {/*  <a className="nav-link" href="/teamPage">Team Page</a>*/}
          {/*</li>*/}

          <li className="nav-item">
            <a className="nav-link" href="/draftPage">Draft</a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/gamez">Games and stats</a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/rules">Rules</a>
          </li>

        </ul>


        {/*<nav>*/}
        {/*  /!*<Link to="/">Home</Link>*!/*/}
        {/*  <Link to="/foo">Players</Link>*/}
        {/*</nav>*/}
        <Switch>
          <Route exact path="/" component={ScoresPage} />
          <Route exact path="/playerPage" component={PlayerPage} />
          <Route exact path="/teamPage" component={TeamPage} />
          <Route exact path="/draftPage" component={DraftPage} />
          <Route exact path="/gamez" component={GameView} />
          <Route exact path="/rules" component={Rules} />
        </Switch>
      </div>
    </Router>

  );

  // return (
  //   <Router>
  //   <!--Each route is defined with Route-->
  //   <Route path="/" component={Home}/>
  // </Router>)
}

export default App;
