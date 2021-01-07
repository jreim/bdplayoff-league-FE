import React from "react";
import {NflTeam} from "../../services/NflTeamService";
import {Player} from "../../services/RosterService";
import {Button, Card, Col, Form, Row, Table, ToggleButton} from "react-bootstrap";
import './gameview.css'
import _ from "lodash";
import {PlayerStatEntry} from "./PlayerStatEntry";

interface IPlayerScoreRow {
  team: NflTeam
  players: Array<Player>;
  round:string;
}

export class PlayerScoreRow extends React.Component<IPlayerScoreRow> {

  state: IPlayerScoreRow;

  constructor(pickParam: IPlayerScoreRow) {
    super(pickParam);
    this.state = {team: pickParam.team, players: [], round: pickParam.round};
    this.hit = this.hit.bind(this);
  }

  componentDidMount(): void {
    fetch(window.name + "/player/scoreView/byTeam?team="+this.state.team.name)
    .then(response => response.json())
    .then(data => {
      var filterd = _.filter(data, (p: Player) => {
        return (p.nflTeam.name === this.state.team.name && (!_.isUndefined(p.team1) ))
      });
      this.setState({
        ...this.state, players: filterd
      });
    });

  }


  hit(e: React.ChangeEvent<HTMLInputElement>) {
    this.state.players.map((player: Player) => {
      if (e.target.id === player.id + ".passYd") {
        player.wcw.passYd = parseInt(e.target.value);
      }
    })
    // console.log(e.target.id);
  }


  render() {
    return (
      <Card.Body className={"teamHeader"}>

        <Row>
          <Col lg={"12"}>
            <Table striped bordered hover variant="dark" size={"small"}>
              <thead>
              <tr>
                <th className={"nameClass"}>Pos</th>
                <th className={"nameClass"}>Player</th>
                <th>passYd</th>
                <th>recYd</th>
                <th>rushYd</th>
                <th>tPt</th>
                <th>rushTd</th>
                <th>passRecTd</th>
                <th>fg</th>
                <th>xp</th>
                <th>dst</th>
                <th>eliminated</th>
                <th>go</th>
              </tr>
              </thead>
              <tbody>
              {this.state.players.map((player: Player) => {
                return (
                  <PlayerStatEntry key={player.id} player={player} round={this.state.round}/>
                )
              })}
              </tbody>
            </Table>
          </Col>
        </Row>

      </Card.Body>
    );
  }
}