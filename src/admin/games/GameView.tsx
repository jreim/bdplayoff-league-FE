import * as React from "react";
import {FaTrashAlt, FaPencilAlt, FaPoop} from 'react-icons/fa';
import {Accordion, Card, Container, Row} from "react-bootstrap";
import _ from "lodash";
import {Game} from "../../services/GameService";
import Col from "react-bootstrap/Col";
import {Team} from "../../services/TeamService";
import {TeamRoster} from "../Score/TeamRoster";
import {PlayerScoreRow} from "./PlayerScoreRow";
import {getUrl} from "../../services/urlService";

interface IGameState {

  games:Array<Game>;

}
export class GameView extends React.Component<IGameState> {

  state:IGameState;
  constructor(pickParam: IGameState) {
    super(pickParam);
    this.state = {games:[]};
  }
  componentDidMount(): void {

    console.log("componentDidMount")
    this.loadTeams();
  }

  loadTeams() {

    console.log("loadTeams")
    fetch(getUrl() + "/game")
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({...this.state, games: _.sortBy(data, 'order')})
    })
  }

  render() {
    return (
      <Container>
        <Accordion >
          {this.state.games.map((game:Game)=>{
            return (<Card>
              <Accordion.Toggle as={Card.Header} eventKey={game.order.toString()}>
                <Row>
                  <Col lg={4}>{game.homeTeam.name} vs {game.awayTeam.name}</Col>
                </Row>
              </Accordion.Toggle>
              <Accordion.Collapse  eventKey={game.order.toString()}>
                <Card.Body>
                  {game.homeTeam.name}
                  <PlayerScoreRow key={game.homeTeam.name}
                  team={game.homeTeam}
                  players={[]}
                  round={game.round}
                  />
                  {game.awayTeam.name}
                  <PlayerScoreRow key={game.awayTeam.name}
                                  team={game.awayTeam}
                                  players={[]}
                                  round={game.round}
                  />
                </Card.Body>

              </Accordion.Collapse>
            </Card>);
          })}
        </Accordion>
      </Container>
      );

  }
}