import {NflTeam} from "./NflTeamService";
import {GameStats} from "./GameService";


export interface Player {
  id: number;
  name: string;
  nflTeam: NflTeam;
  team1: any;
  team2:any;
  position: string;
  eliminated:boolean;

  wcw:GameStats;
  div?:GameStats;
  champ?:GameStats;
  sb?:GameStats;
//   private Long id;
//   private String name;
// //    private Ref<NFLTeam> nflTeamRef;
//   private NFLTeam nflTeam;
//   private String playerPosition;
//   private Ref<Team> team1;
//   private Ref<Team> team2;
//   private boolean eliminated = false;
//   private Ref<PlayerStat> wcw;
//   private Ref<PlayerStat> div;
//   private Ref<PlayerStat> champ;
//   private Ref<PlayerStat> sb;
}