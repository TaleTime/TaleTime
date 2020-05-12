import {Injectable} from '@angular/core';
import {PlayerParams} from "../../models/player/player-params";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerParamsService {
  playerParams : PlayerParams;

  constructor(playerParams : PlayerParams) {
    this.playerParams = playerParams;
  }

  setPlayerParams(playerParams : PlayerParams){
    this.playerParams = playerParams;
  }

  getPlayerParams(): PlayerParams {
    return this.playerParams;
  }

  // getPlayerParams(): Observable<PlayerParams> {
  //   return of(this.playerParams);
  // }
}
