import {Player} from "../../services/RosterService";
import {GameStats} from "../../services/GameService";
import React from "react";
import {Button} from "react-bootstrap";
import _ from "lodash";

export interface IPlayerStatEntry {
  player: Player;
  stat?: GameStats;
  round: string;
}

export class PlayerStatEntry extends React.Component<IPlayerStatEntry> {

  readonly state: IPlayerStatEntry;

  constructor(params: IPlayerStatEntry) {
    super(params);

    console.log((params.round === "wildCard" && !_.isUndefined(params.player.wcw) + " " + params.round + " " + params.player.wcw));

    if (params.round === "wildCard" && !_.isUndefined(params.player.wcw)) {
      params.player.wcw.rushTdStr = params.player.wcw.rushTd.toString();
      params.player.wcw.passRecTdStr = params.player.wcw.passRecTd.toString();
      params.player.wcw.fgStr = params.player.wcw.fg.toString();
      this.state = {
        player: params.player, round: params.round, stat: params.player.wcw
      };
      this.forceUpdate();
    }
    else if (params.round === "divisional" && !_.isUndefined(params.player.div)){
      params.player.div.rushTdStr = params.player.div.rushTd.toString();
      params.player.div.passRecTdStr = params.player.div.passRecTd.toString();
      params.player.div.fgStr = params.player.div.fg.toString();
      this.state = {
        player: params.player, round: params.round, stat: params.player.div
      };
      this.forceUpdate();
    }
    else {
      this.state = {
        player: params.player, round: params.round, stat: {
          id: 0,
          score: 0,
          passYd: 0,
          recYd: 0,
          rushYd: 0,
          tPt: 0,
          rushTd: [],
          rushTdStr: "",
          passRecTd: [],
          passRecTdStr: "",
          xp: 0,
          fg: [],
          fgStr: "",
          dst: 0,
          elim: false,
          playoffRound: params.round,
        }
      }
    }
    ;
    this.hit = this.hit.bind(this);
  }

  hit() {

    var localStat: GameStats | undefined;
    if (this.state.stat !== undefined) {
      var rtd = this.strToArray(this.state.stat.rushTdStr)
      var ptd = this.strToArray(this.state.stat.passRecTdStr)
      var fgt = this.strToArray(this.state.stat.fgStr)
      localStat = {
        id: this.state.stat.id!,
        score: this.state.stat.score!,
        passYd: this.state.stat.passYd!,
        recYd: this.state.stat.recYd!,
        rushYd: this.state.stat.rushYd!,
        tPt: this.state.stat.tPt,
        playoffRound: this.state.round,
        rushTd: rtd,
        passRecTd: ptd,
        xp: this.state.stat.xp,
        fg: fgt,
        fgStr: "",
        dst: this.state.stat.dst,
        elim: this.state.stat.elim
      };

      console.log(JSON.stringify(localStat));

      fetch(window.name + '/stat/player/' + this.state.player.id, {
        method: 'POST',
        body: JSON.stringify(localStat),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(res => {
        alert("saved");
      }).catch(err => {
        alert(err);
      });
    }
    // console.log(JSON.stringify(this.state.stat));
  }

  strToArray(data: string | undefined): Array<number> {
    if (data !== undefined) {
      if (data === "") {
        return [];
      }
      var strArr = data.split(',');
      var intArr = [];
      var i = 0;
      while (i < strArr.length) {
        intArr.push(parseInt(strArr[i]));
        i++;
      }
      return intArr;
    }
    return [];

  }

  render() {
    return (
      <tr>
        <td className={"nameClass"}>{this.state.player.position}</td>
        <td className={"nameClass"}>{this.state.player.name}</td>
        <td>
          <input
            type="text" id={this.state.player.id + ".passYd"}
            value={this.state.stat?.passYd}
            onChange={(data) => {
              this.setState({...this.state, stat: {...this.state.stat, passYd: parseInt(data.target.value)}})
            }}/>
        </td>
        <td>
          <input
            type="text" id={this.state.player.id + ".recYd"}
            value={this.state.stat?.recYd}
            onChange={(data) => {
              this.setState({...this.state, stat: {...this.state.stat, recYd: parseInt(data.target.value)}})
            }}/>
        </td>
        <td>
          <input
            type="text" id={this.state.player.id + ".rushYd"}
            value={this.state.stat?.rushYd}
            onChange={(data) => {
              this.setState({...this.state, stat: {...this.state.stat, rushYd: parseInt(data.target.value)}})
            }}/>
        </td>
        <td>
          <input
            type="text" id={this.state.player.id + ".tPt"}
            value={this.state.stat?.tPt}
            onChange={(data) => {
              this.setState({...this.state, stat: {...this.state.stat, tPt: parseInt(data.target.value)}})
            }}/>
        </td>
        <td>
          <input
            type="text" id={this.state.player.id + ".rushTd"}
            value={this.state.stat?.rushTdStr}
            onChange={(data) => {
              this.setState({...this.state, stat: {...this.state.stat, rushTdStr: data.target.value}})
            }}/>
        </td>
        <td>
          <input
            type="text" id={this.state.player.id + ".passRecTdStr"}
            value={this.state.stat?.passRecTdStr}
            onChange={(data) => {
              this.setState({...this.state, stat: {...this.state.stat, passRecTdStr: data.target.value}})
            }}/>
        </td>
        <td>
          <input
            type="text" id={this.state.player.id + ".fgStr"}
            value={this.state.stat?.fgStr}
            onChange={(data) => {
              this.setState({...this.state, stat: {...this.state.stat, fgStr: data.target.value}})
            }}/>
        </td>
        <td>
          <input
            type="text" id={this.state.player.id + ".xp"}
            value={this.state.stat?.xp}
            onChange={(data) => {
              this.setState({...this.state, stat: {...this.state.stat, xp: parseInt(data.target.value)}})
            }}/>
        </td>
        <td>
          <input
            type="text" id={this.state.player.id + ".dst"}
            value={this.state.stat?.dst}
            onChange={(data) => {
              this.setState({...this.state, stat: {...this.state.stat, dst: parseInt(data.target.value)}})
            }}/>
        </td>
        <td>
          <input
            type="checkbox" id={this.state.player.id + ".eliminated"}
            onChange={(data) => {
              this.setState({...this.state, stat: {...this.state.stat, elim: !this.state.stat?.elim}})
            }}/>
        </td>
        <td><Button onClick={() => {
          this.hit();

        }}>score</Button></td>


      </tr>
    )
  }
}