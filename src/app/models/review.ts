import { Injectable } from "@angular/core";
import { sha256 } from "js-sha256";
/**
 *
 * @author Alexander Stolz
 * @date 2021-12-09
 */

@Injectable()
export class Review {
  public author: string;
  public authorId:string;
  public comment: string;
  public date: string;
  public rating: string;
  public ratingId:string;

}

