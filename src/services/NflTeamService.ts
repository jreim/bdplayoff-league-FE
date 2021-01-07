import {useEffect, useState} from "react";
import {Service} from "./ServiceGeneric";

export interface NflTeam {
  name: string;
  logo: string;
  conf: string;
}


export interface IPlayerState {
  readonly nflTeams: Array<NflTeam>
  // dataa: string;
  readonly isLoading: boolean;
}

//   const LoadNflTeams = () => {
//   const [result, setResult] = useState<IPlayerState>({
//     // nflTeams:Array<NflTeam>,
//     dataa: "cool",
//     isLoading:false
//   });
//
//   useEffect(() => {
//     // fuck: = {nflTeams:Array<NflTeam>,isLoading:false}
//     setResult({dataa: "ppp", isLoading: true})
//     // setResult({ status: 'loaded',payload: {nflTeams:Array<NflTeam>,isLoading:false} })
//   //   fetch('/static/nflTeams')
//   //   .then(response => response.json())
//   //   .then(response => setResult({ status: 'loaded', payload: response }))
//   //   .catch(error => setResult({ status: 'error', error }));
//   }, [result]);
//   return result;
// };
//
//
//
// export default LoadNflTeams;