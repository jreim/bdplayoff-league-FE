import * as React from "react";
import {Player} from "../../services/RosterService";
import {Card, Col, Row} from "react-bootstrap";
import './TeamRoster.css'
export interface TeamRosterState {
  players: Array<Player>;
}
export class TeamRoster extends React.Component<TeamRosterState> {

  state:TeamRosterState;

  constructor(params: TeamRosterState) {
    super(params);
    var players: Array<string>;
    players = ["QB", "RB", "RB", "WR/TE", "WR/TE", "WR/TE", "K", "DST"];
    var orderedPlayers:Array<Player>;
    this.state = {players:[]};
    var positions: Array<string>;
    positions = ["QB", "RB", "WR", "TE", "K", "DST"];
    positions.map((position:string)=>{
      params.players.map((player)=>{
        if(player.position === position){
          this.setState({...this.state, players:this.state.players.push(player)})
        }
      })
    });

  }

  render(){

  return(
    <Card.Body className={"teamHeader"}>
      <Row>

        <Col lg={"1"} >
          Pos.
        </Col>
      <Col lg={"2"} >
        Player
      </Col>

        <Col lg={"1"} >
          Wild card
        </Col>

        <Col lg={"1"} >
          Divisonal
        </Col>

        <Col lg={"2"} >
          Championship
        </Col>

        <Col lg={"2"} >
          Super bowl
        </Col>
        <Col lg={"1"} >
          Total
        </Col>


        </Row>
      {this.state.players.map((player:Player) => {

        return(
          <Row className={(player.eliminated ? "eliminated":"")} key={player.id}>

          <Col lg={"1"} >
            {player.position}
          </Col>

          <Col lg={"2"} >
          {player.name}
          </Col>

          <Col lg={"1"} >
            {player.wcw == undefined ? "x": player.wcw.score }
          </Col>

          <Col lg={"1"} >
            {player.div == undefined ? "x": player.div.score }
          </Col>

          <Col lg={"2"} >
            {player.champ == undefined ? "x": player.champ.score }
          </Col>

          <Col lg={"2"} >
            {player.sb == undefined ? "x": player.sb.score }
          </Col>
          <Col lg={"1"} >
            {(player.wcw == undefined ? 0:  player.wcw.score) +
            (player.div == undefined ? 0: player.div.score ) +
            (player.champ == undefined ? 0: player.champ.score )
            +
            (player.sb == undefined ? 0: player.sb.score )}
          </Col>
          </Row>)
      })}
    </Card.Body>

  );
  }
}