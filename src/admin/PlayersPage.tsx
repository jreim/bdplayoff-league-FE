import * as React from "react";
import './PlayerPage.css'
import {NflTeam} from "../services/NflTeamService";
import {Roster} from "./Roster";
import _ from "lodash";
import {Player} from "../services/RosterService";
import {Team} from "../services/TeamService";
import {getUrl} from "../services/urlService";
import {TeamPage} from "./TeamPage";
import {FaTrashAlt} from "react-icons/fa";
import Table from "react-bootstrap/Table";
// import Timeout = NodeJS.Timeout;

export interface PlayerPageProps {
  nflTeams: Array<NflTeam>;
  players: Array<Player>;
  teams: Array<Team>;
  totalPicks: number;
  lastPick: string;
}
export class PlayerPage extends React.Component<PlayerPageProps> {

  state:PlayerPageProps;
  // timer:Timeout;
  constructor(pro:PlayerPageProps) {
    super(pro);
    this.state = {nflTeams:[],players:[], teams:[], totalPicks: 0, lastPick: ""};
    this.getPlayers = this.getPlayers.bind(this)
    // setInterval(()=> this.getPlayers(), 1000);
  }
  getPlayers(){
    this.setState({nflTeams: [], isLoading: true,players: []});
    fetch(getUrl() +"/player")
    .then(response => response.json())
    .then(data =>{
      this.setState({ players: data, isLoading: true})
      return fetch(getUrl() +"/static/nflTeams")
      .then(response => response.json())
      .then(data =>{
        this.setState({nflTeams: data, isLoading: false});
        return fetch(getUrl() +"/team")
        .then(response => response.json())
        .then(data => {
          this.setTotalPicks(data);
          this.setState({...this.state, teams: _.sortBy(data, 'draftPos')})
          // setInterval(()=>{
          //   // this.setState({...this.state, lastPick: Date.now().toString()});
          //   if(this.state.totalPicks == 0){
          //     return;
          //   }
          //   fetch(getUrl() +"/draft/currentPick/"+ (this.state.totalPicks))
          //   .then(response => response.text())
          //   .then(data =>{
          //     if(data === "LOAD"){
          //       this.getPlayers()
          //     }
          //   });
          // }, 15000);


        })
      } )
    } );
  }

  setTotalPicks(teams: Array<Team>){
    var num:number = 0;
    this.state.players.map((val: Player) =>{
      if(val.team1){
        num = num +1;
      }

      if(val.team2){
        num = num +1;
      }
    });
    this.setState({...this.state, totalPicks: num})
  }
  componentDidMount() {
    this.getPlayers();
  }

  getNeeds(team: Team):string{
    var players:Array<string>;
    players = ["QB","RB","RB","WR/TE","WR/TE","WR/TE","K","DST"];
    console.log(team.players)
    if(team.players){
      for(var p of team.players) {
        var jawn:string = p.position;
        if(jawn === "TE" || jawn =="WR"){
          jawn="WR/TE";
        }
        if (players.indexOf(jawn) > -1) {
          players.splice(players.indexOf(jawn), 1);
        }
      }
    }
    return JSON.stringify(players);
  }



  getStyle(idx:number):string{

    var roundNum = Math.floor(this.state.totalPicks / this.state.teams.length) + 1;
    //pick on way up
    if(roundNum % 2 === 0 ){
      console.log("this.state.totalPicks " + this.state.totalPicks)
      console.log("this.state.teams.length " + this.state.teams.length)
      console.log("idx " + idx)

      if(this.state.totalPicks % this.state.teams.length === ( (this.state.teams.length-1) - idx) ) {
        return "dude";
      }

    }
    //pick on way down ( odd round 1-n)
    else{
      if(this.state.totalPicks % this.state.teams.length === idx){
        return "dude";
      }
    }

    return "";
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {_.filter(this.state.nflTeams,
            (data:NflTeam)=> {return data.conf === 'AFC'}).map(
              (value:NflTeam, index:number) => {
            return(
              <div className="col"  key={value.name}>
                   <div className="row ">
                     <h3 className="col-12">{value.name}</h3>
                   </div>
              <div className="row">
                <Roster key={value.name} players={_.filter(this.state.players, (data: Readonly<Player>) =>{
                  return data.nflTeam.name === value.name;
                }) }/>
              </div>
              </div>)})}
        </div>

        <div className="row">
          {_.filter(this.state.nflTeams,(data:NflTeam)=> {return data.conf === 'NFC'}).map((value:NflTeam, index:number) => {
            return(
              <div className="col" key={value.name}>
                <div className="row justify-content-center">
                  <h3>{value.name}</h3>
                </div>
                <div className="">
                  <Roster key={value.name} players={_.filter(this.state.players, (data: Readonly<Player>) =>{
                    return data.nflTeam.name === value.name;
                  }) }/>
                </div>
              </div>)})}
        </div>

        <div className="row">
          <h2 className="col-4">Current Round: {Math.floor(this.state.totalPicks / this.state.teams.length) + 1}</h2>
          <h2 className="col-4">Current Pick: {( this.state.totalPicks % this.state.teams.length)+1}</h2>
          <h2 className="col-4">Last Pick at : {this.state.totalPicks}</h2>
        </div>

        <div className="row">
          <Table size={"sm"}>
            <thead>
            <tr>
              <th>Draft Pos</th>
              <th>Name</th>
              <th>remaining</th>
            </tr>
            </thead>
            <tbody>
            {this.state.teams.map((value: Team, indx: number) => {
              return (
                <tr className={this.getStyle(indx)}>
                  <td>{value.draftPos}</td>
                  <td>{value.name}</td>
                  <td>{this.getNeeds(value)}</td>
                </tr>
              );
            })
            }
            </tbody>
          </Table>
        </div>
      </div>
    );

  }
}
