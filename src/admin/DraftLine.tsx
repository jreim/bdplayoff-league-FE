import * as React from "react";
import {DraftPick} from "../services/DraftService";
import {FaTrashAlt, FaPencilAlt, FaPoop} from 'react-icons/fa';
import {Player} from "../services/RosterService";
import './DraftPage.css'

interface IState {
  pick: DraftPick;
  players: Array<Player>
  pickNumber: number;
  editPick: (num:number)=>void;
  getNeeds: (num:string)=>void;

}
export class DraftLine extends React.Component<IState> {

  state:IState;
  constructor(pickParam: IState) {

    super(pickParam);
    this.state = pickParam;
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.state.pick.draftPos}</th>
        <td>{this.state.pick.roundPick + "." + this.state.pick.roundSelection}</td>
        <td>{this.state.pick.teamName}</td>
        <td>{this.state.pick.playerName}</td>
        {/*<td>*/}
        {/*  <FaPencilAlt onClick={()=>{this.state.editPick(this.state.pick.draftPos)}}/>*/}
        {/*</td>*/}
      </tr>
      );

  }





}