import {NflTeam} from "./NflTeamService";
import {Player} from "./RosterService";


export interface Game{

  id:number;
  round: string;
  order: number;
  homeTeam:NflTeam;
  awayTeam:NflTeam;
  stats:Array<GameStats>;
}

export interface GameStats {
  id:number;
  score:number;
  passYd: number;
  recYd:number;
  rushYd: number;
  tPt:number;
  playoffRound:string;
  rushTd:Array<number>;
  rushTdStr?:string;
  passRecTd:Array<number>;
  passRecTdStr?:string;

  xp:number;
  fg:Array<number>;
  fgStr?:string;
  dst:number;
  elim:boolean;
}