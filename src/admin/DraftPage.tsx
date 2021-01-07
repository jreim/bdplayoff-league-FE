import * as React from "react";
import _ from "lodash";
import {Typeahead} from 'react-bootstrap-typeahead';
import {Player} from "../services/RosterService";
import {Button, Col, Form} from "react-bootstrap";
import {DraftLine} from "./DraftLine";
import {DraftPick} from "../services/DraftService";
import {Team} from "../services/TeamService";
import './DraftPage.css';
import {getUrl} from "../services/urlService";

interface DraftPageProps {
  players: Array<Player>;
  teams: Array<Team>;
  player: Player;
  picks: Array<DraftPick>;
  pickNumber: number;
}

export class DraftPage extends React.Component<DraftPageProps> {

  state: DraftPageProps;

  constructor(state: DraftPageProps) {
    super(state);
    this.state = {
      players: [],
      teams: [],
      picks: [],
      pickNumber: 1,
      player: {
        position: "",
        id: 0,
        name: "",
        nflTeam: {name: "", conf: "", logo: ""},
        team1: undefined,
        team2: undefined,
        eliminated: false,
        wcw: {
          id: 0,
          score: 0,
          passYd: 0,
          recYd: 0,
          rushYd: 0,
          tPt: 0,

          rushTd: [],
          passRecTd: [],

          xp: 0,
          fg: [],
          dst: 0,
          elim: false,
          playoffRound: ""
        }
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editTeam = this.editTeam.bind(this);
    this.getNeeds = this.getNeeds.bind(this);

  }

  loadTeams() {

    fetch(getUrl() + "/team")
    .then(response => response.json())
    .then(data => {
      this.setState({...this.state, teams: _.sortBy(data, 'draftPos')})
      return fetch(getUrl() + "/player")
      .then(response => response.json())
      .then(data => {
        console.log(" data " + data)
        var data2 = _.filter(data, (p:Player) =>{
          return !(p.team1 && p.team2)
        })
        this.setState({...this.state, players: data2})

        console.log(" data 2")
        return fetch(getUrl() + "/draft")
        .then(response => response.json())
        .then(data => {
          this.setState({
            ...this.state,
            picks: _.orderBy(data, ['draftPos']),
            pickNumber: this.getPickNumber(_.orderBy(data, ['draftPos']))
          })
        })
      })
    })
  }


  getPickNumber(picks: Array<DraftPick>): number {
    if (picks.length === 0) {
      return 1;
    }
    var found: boolean = false;
    var i: number = 0;
    while (!found) {
      if (i == picks.length) {
        found = true;
        i = 0;
      }
      if (picks[i].playerId == 0 || picks[i].playerId == undefined) {
        found = true;
      } else {
        i = i + 1;
      }
      // found = true;
    }
    // return  _.filter(picks,(p:DraftPick)=>{return p.playerId == 0})[0].draftPos;
    return i + 1;

  }

  componentDidMount(): void {
    this.loadTeams();
  }


  handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    const draftPick: DraftPick = this.state.picks[this.state.pickNumber - 1];
    const needs:Array<string> = this.getNeeds(draftPick.teamId);
    const pos:string = (
      this.state.player.position === "WR" || this.state.player.position === "TE") ? "WR/TE": this.state.player.position;
    if(_.indexOf(needs,pos) === -1){

      alert("you dont need that position.")
      return;
    }


    e.preventDefault();

    fetch( getUrl()+ '/draft/pick/' + draftPick.id
      + "?playerId=" + this.state.player.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {

      if (res.status == 200) {
        this.state.picks[this.state.pickNumber - 1].playerName = this.state.player.name;
        this.state.picks[this.state.pickNumber - 1].playerId = this.state.player.id;
        this.setState({...this.state, pickNumber: this.getPickNumber(this.state.picks),player: undefined  });
        // this.setState({...this.state, });
      } else {
        alert("something went wrong try refreshing... ")
      }
      console.log(res);

    }).catch(err => {
      console.log(err)
    });


  }

  handleChange(selected: Player[]) {
    this.setState({...this.state, player: selected[0]})
  }

  editTeam(draftPos: number) {
    this.setState({...this.state, pickNumber: draftPos});
  }

  getNeeds(teamId: string): Array<string> {
    var players: Array<string> = [];
    this.state.teams.map((team: Team) => {
      if (team.id.toString() == teamId) {

        players = ["QB", "RB", "RB", "WR/TE", "WR/TE", "WR/TE", "K", "DST"];
        if (team.players) {

          for (var p of team.players) {
            var jawn: string = p.position;
            if (jawn === "TE" || jawn == "WR") {
              jawn = "WR/TE";
            }
            if (players.indexOf(jawn) > -1) {
              players.splice(players.indexOf(jawn), 1);
            }
          }
        }
        // alert(players);
      }
    });
    return players;
  }

  render() {
    // var data : Player[] = _.filter(this.state.players, (player: Player) =>{
    //   return player.team1 || player.team2;
    // });
    return (
      <div>

        {window.location.href.endsWith("x") ?
        <div className={"row tableFixHead"}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              {/*<Col>Pick {this.state.pickNumber} for team {this.state.picks[this.state.pickNumber-1]} </Col>*/}
              <Col>
                <Typeahead
                  id={"playersTypeAhead"}
                  labelKey={(option: Player) => option.name + '-' + option.position}
                  // labelKey={'name'}
                  filterBy={['name']}
                  // multiple={multiple}
                  options={this.state.players}
                  // labelKey={o => {o.name} }
                  placeholder="Player"
                  // selected={this.state.selected}
                  onChange={this.handleChange}
                />
              </Col>
              {/*<Col>*/}
              {/*    <Form.Control id="email" type="text" value={this.state.newTeam.email} onChange={this.handleChange}/>*/}

              {/*</Col>*/}
              <Col>
                <Button variant="primary" type="submit">
                  Draft Player
                </Button>
              </Col>
            </Form.Row>

          </Form>
        </div>
          : null}
        <table className="table col-8">
          <thead>
          <tr>
            <th scope="col">pick#</th>
            <th scope="col">round.Pick</th>
            <th scope="col">Team</th>
            <th scope="col">Player</th>
            {/*<th scope="col">Utils</th>*/}
          </tr>
          </thead>
          {          console.log("called render")
          }
          <tbody>
          {
            // if(this.props.picks === undefined) {
            //
            // }

            this.state.picks.map((pickParam: DraftPick, indx: number) => {
            pickParam.roundSelection = (indx%this.state.teams.length) +1 ;
              return (
              // <div className={this.state.pickNumber === pickParam.draftPos ? " pick otline " : "otline"}>
                <DraftLine key={pickParam.id}
                           pick={pickParam}
                           players={this.state.players}
                           pickNumber={this.state.pickNumber}
                           editPick={this.editTeam}
                           getNeeds={this.getNeeds}/>
              // </div>
          )
          })}


          </tbody>
        </table>

      </div>
    );
  }
}

interface PlayerLine {

  players: [],
  teams: [],
  picks: [],
  pickNumber: 1,
  player: {
    position: "",
    id: 0,
    name: "",
    nflTeam: { name: "", conf: "", logo: "" },
    team1: undefined,
    team2: undefined,
    eliminated: false,
    wcw: {
      id: 0,
      score: 0,
      passYd: 0,
      recYd: 0,
      rushYd: 0,
      tPt: 0,

      rushTd: [],
      passRecTd: [],

      xp: 0,
      fg: [],
      dst: 0,
      elim: false,
      playoffRound: ""
    }
  }
};