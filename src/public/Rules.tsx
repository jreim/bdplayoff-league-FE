import React from "react";
import {Card, ListGroup, Table} from "react-bootstrap";

export interface RulesProps {}
//   teamName: string;
//   teamEmail: string;
//   teams: Array<Team>;
// }
export class Rules extends React.Component<RulesProps> {

  constructor(state:RulesProps) {
    super(state);
  }

  render() {
    return (
      <div className="container-fluid">
        <Card className="text-left">
          <Card.Header>Players</Card.Header>
          <Card.Body>
            <Table striped bordered size="sm">
              <thead>
              <tr>
                <th>TD Distance</th>
                <th>Rushing</th>
                <th>Receiving & Passing</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>0-9 yards</td>
                <td>10 pts</td>
                <td>5 pts</td>
              </tr>
              <tr>
                <td>10-19 yards</td>
                <td>12 pts</td>
                <td>6 pts</td>
              </tr>
              <tr>
                <td>20-29 yards</td>
                <td>14 pts</td>
                <td>7 pts</td>
              </tr>
              <tr>
                <td>30-39 yards</td>
                <td>16 pts</td>
                <td>8 pts</td>
              </tr>
              <tr>
                <td>40-49 yards</td>
                <td>18 pts</td>
                <td>9 pts</td>
              </tr>
              <tr>
                <td>50-59 yards</td>
                <td>20 pts</td>
                <td>10 pts</td>
              </tr>
              <tr>
                <td>60+ yards</td>
                <td>25 pts</td>
                <td>15 pts</td>
              </tr>
            </tbody>
            </Table>


            <Table striped bordered size="sm">
              <thead>
              <tr>
                <th>yardage per game </th>
                <th>Rushing</th>
                <th>Receiving & Passing</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1 point per </td>
                <td>10 yards</td>
                <td>20 yards</td>
              </tr>
              </tbody>
            </Table>

            <ListGroup>
              <ListGroup.Item>All 2pt conversions will count as 2 points.</ListGroup.Item>
              <ListGroup.Item>A lateral will count a rushing TD for the player who scores and the distance is from the point of the lateral</ListGroup.Item>
              <ListGroup.Item>If your player fumbles, then recovers himself, they will get they distance from the line of scrimage</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>


        <Card className="text-left">
          <Card.Header>Kicking </Card.Header>
          <Card.Body>
            <Table striped bordered size="sm">
              <thead>
              <tr>
                <th>Distance</th>
                <th>points</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1-39 yards</td>
                <td>5 pts</td>
              </tr>
              <tr>
                <td>40-49 yards</td>
                <td>7 pts</td>
              </tr>
              <tr>
                <td>50+ yards</td>
                <td>10 pts</td>
              </tr>
              </tbody>
            </Table>

            <ListGroup>
              <ListGroup.Item>Extra points are 2 points. </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        <Card className="text-left">
          <Card.Header>Special teams and Defense </Card.Header>
          <Card.Body>

            <ListGroup>
              <ListGroup.Item>5 points for a win</ListGroup.Item>
              <ListGroup.Item>5 points for scoring 40 or more</ListGroup.Item>
              <ListGroup.Item>5 points for holding a team wihtout a TD</ListGroup.Item>
              <ListGroup.Item>10 points for a shutout</ListGroup.Item>
              <ListGroup.Item>10 points for a TD </ListGroup.Item>
              <ListGroup.Item>10 points for a safety</ListGroup.Item>
              <ListGroup.Item>1 point for sack, int, fumble recovery </ListGroup.Item>
              <ListGroup.Item>You can not score a special teams TD with the offense on the field</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

      </div>
    );
  }
}
//
//   state:TeamPageProps;
//
//   constructor(state:TeamPageProps) {
//     super(state);
