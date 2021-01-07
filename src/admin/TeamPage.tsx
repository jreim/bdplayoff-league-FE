import * as React from "react";
import Table from "react-bootstrap/Table";
import './Team.css'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Team} from "../services/TeamService";
import _ from "lodash";
import {FaTrashAlt} from 'react-icons/fa';
import {getUrl} from "../services/urlService";

export interface TeamPageProps {
  teamName: string;
  teamEmail: string;
  teams: Array<Team>;
}
export class TeamPage extends React.Component<TeamPageProps> {

  state:TeamPageProps;

  constructor(state:TeamPageProps) {
    super(state);
    this.state = {teamName: "", teamEmail:"", teams:[]}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.randomDraft = this.randomDraft.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.getNeeds = this.getNeeds.bind(this);
  }

  loadTeams(){
    fetch(getUrl() +"/team")
    .then(response => response.json())
    .then(data => {
      this.setState({...this.state, teams: _.sortBy(data, 'draftPos')})
    })
  }
  componentDidMount(): void {
    this.loadTeams();
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log(this.state);
    e.preventDefault();
    fetch(getUrl()  +'/team', {
      method: 'POST',
      body: JSON.stringify({"name": this.state.teamName, "email": this.state.teamEmail}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(res => {
      this.state.teams.push(res);
      this.setState({...this.state, teams: _.sortBy(this.state.teams, 'draftPos'),
          teamName: "", teamEmail:""})
    }).catch(err => {
      alert(err);
    });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'name') {
      this.setState({...this.state, teamName: event.target.value});
    }
    if (event.target.id === 'email') {
      this.setState({...this.state, teamEmail: event.target.value});
    }

  }

  randomDraft() {

    fetch(getUrl() +"/team/shuffle")
    .then(response => response.json())
    .then(data => {
      this.setState({...this.state, teams: _.sortBy(data, 'draftPos')})
    })
  };

  deleteTeam(id:number){
    fetch(getUrl() +"/team/"+id,{
      method: "DELETE"})
    .then(data => {
      this.setState({...this.state, teams: _.sortBy(data, 'draftPos')})
    })
  }

  startDraft(){
    fetch(getUrl() +"/draft/start",{
      method: "GET"})
    .then(data => {
      alert("Draft is started , no mo teams can be added.")
    })
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

  render() {
    return (
      <div className={"row"}>
        <Table size={"sm"}>
          <thead>
          <tr>
            <th>Draft Pos</th>
            <th>Name</th>
            <th>email</th>
            <th>remaining</th>
            <th>util</th>
          </tr>
          </thead>
          <tbody>
          {this.state.teams.map((value: Team, indx: number) => {
            return (
              <tr>
                <td>{value.draftPos}</td>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{this.getNeeds(value)}</td>
                <td><FaTrashAlt onClick={()=>{this.deleteTeam(value.id)}}/></td>
              </tr>
            );
          })
          }
          </tbody>
        </Table>
        <div className={"row"}>

        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Control id="name" type="text" value={this.state.teamName} onChange={this.handleChange}/>
            </Col>
            <Col>
              <Form.Control id="email" type="text" value={this.state.teamEmail} onChange={this.handleChange}/>

            </Col>
            <Col>
              <Button variant="primary" type="submit">
                Add Team
              </Button>
            </Col>

            <Col>
              <Button variant="primary" onClick={this.randomDraft}>
                shuffle draft
              </Button>

            </Col>

            <Col>
              <Button variant="primary" onClick={this.startDraft}>
                Start draft
              </Button>

            </Col>
          </Form.Row>

        </Form>
      </div>

    )
  }
}