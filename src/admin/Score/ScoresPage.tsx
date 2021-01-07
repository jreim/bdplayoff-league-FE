import * as React from "react";
import './ScoresPage.css'
import Col from "react-bootstrap/Col";
import _ from "lodash";

import {Accordion, Card, Container, Row} from "react-bootstrap";
import {Team} from "../../services/TeamService";
import {TeamRoster} from "./TeamRoster";
import {getUrl} from "../../services/urlService";

export interface ScorePageState {
  teams: Array<Team>;
}
export class ScoresPage extends React.Component<ScorePageState>{

  state:ScorePageState;

  constructor(state:ScorePageState) {
    super(state);
    this.state = {teams:[]};
    // this.loadTeams();
  }

  loadTeams(){
    fetch(getUrl() +"/team/scoreView")
    // fetch("http://20200103t024800-dot-bdsplayoffleague.appspot.com/team/scoreView")
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // this.setState({...this.state, teams: _.orderBy(data, 'id','desc')})
      this.setState({...this.state, teams:data})
    })
  }
  componentDidMount(): void {
    this.loadTeams();
  }



  render() {
    return (
      // <Container>
      //   <Accordion >
      //     <Card >
      //       <Row className={"header"}>
      //         <Col lg={4}>Team Name</Col>
      //         <Col lg={2}>Players remaining</Col>
      //         <Col lg={2}>Score</Col>
      //         <Col lg={2}>Details</Col>
      //       </Row>
      //     </Card>
      //     {this.state.teams.map( (team:Team, index)=>{
      //       // return (<div key={index}>{team.name } asdfadsf</div>)
      //       return (
      //         <Card key={team.name}>
      //
      //           <Accordion.Toggle as={Card.Header} eventKey={team.name} >
      //           <Row>
      //             {/*sdfg*/}
      //         {/*  <Col lg={4}>{team.name}</Col>*/}
      //         {/*  <Col lg={2}>{team.playersRemaining}</Col>*/}
      //         {/*  <Col lg={2}>{team.score}</Col>*/}
      //           </Row>
      //         </Accordion.Toggle>
      //         <Accordion.Collapse  eventKey={team.name}>
      //         {/*  /!*<Card.Body>*!/*/}
      //         {/*  /!*  <TeamRoster*!/*/}
      //         {/*  /!*    key={team.id}*!/*/}
      //         {/*  /!*    players={team.players}/>*!/*/}
      //         {/*  /!*</Card.Body>*!/*/}
      //         {/*    yasssss*/}
      //         </Accordion.Collapse>
      //
      //       </Card>);
      //     })}
      //   </Accordion>
      //
      // </Container>


      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <Row>
              <Col lg={4}>Team Name</Col>
              <Col lg={2}>Players remaining</Col>
              <Col lg={2}>Score</Col>
              {/*<Col lg={2}>Details</Col>*/}
            </Row>
          </Accordion.Toggle>
        </Card>

        {
          this.state.teams.map( (team:Team, index)=>{
            return (
              <Card key={team.name}>
                <Accordion.Toggle as={Card.Header} eventKey={team.name}>
                  <Row>
                    <Col lg={4}>{team.name}</Col>
                      <Col lg={2}>{team.playersRemaining}</Col>
                      <Col lg={2}>{team.score}</Col>
                    </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={team.name}>
                  <Card.Body>
                    <TeamRoster
                      key={team.id}
                      players={team.players}/>
                  </Card.Body>
              </Accordion.Collapse>
            </Card>
            ) ;
          })
        }

      </Accordion>


    );
  }
}