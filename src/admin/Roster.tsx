import * as React from "react";
import {Players} from "../public/Players";
import {Player} from "../services/RosterService";
import "./Roster.css"
interface RosterProps {
  players: Array<Player>;
}
export class Roster extends React.Component<RosterProps> {
  playersOrder:Player[];
  constructor(a:RosterProps) {
    super(a);
    this.playersOrder = [];
    var positions: Array<string>;
    positions = ["QB", "RB", "WR", "TE", "K", "DST"];
    positions.map((position:string)=>{
      this.props.players.map((player)=>{
        if(player.position === position){
          this.playersOrder.push(player);
          // this.setState({...this.state, players:this.state.players.push(player)})
        }
      })
    });

  }

  componentDidMount(): void {
    this.setState({data:[]})
  }

  getClazz(p:Player ):string {
    if(p.team2 != undefined){
      return "row text-left text-muted strike"
    }
    else if(p.team1 != undefined){
      return "row text-left text-danger"
    }
    return "row text-left text-primary";
  }

  render(){
    return (
      <div className="">
      {this.playersOrder.map((value:Player,index:number) => {
          return (
            <div className={this.getClazz(value)} key={value.id} >
              <div className="col-2">{value.position}</div>
              <div className="col-8">
                {value.name}
              </div>
            </div>
          )})}

      </div>);
  }
}