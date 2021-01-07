import {Player} from "./RosterService";
import _ from "lodash";

export interface Team {

  id: number;
  name: string;
  email: string;
  draftPos: number;
  players: Array<Player>
  playersRemaining?: number
  score?: number;
}

// export class TeamService{
const TeamService = () => {


  const teams: Array<Team> = [];

  const persistTeam = (team:Team):Promise<Response> => {

    console.log(window.name +"/team")
    return fetch(window.name +"/team");
    // .then(response => response.json())
    // .then(data => {
    //   this.setState({...this.state, teams: _.sortBy(data, 'draftPos')})

  }

  return {
    teams,
    persistTeam
  }
}

