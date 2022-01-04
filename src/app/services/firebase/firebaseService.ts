import { isPlatformServer } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Observable } from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FireBaseService {
  private dbRef: AngularFireList<any>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  /**
   * Gets Data from dbNode
   * @param dbNode Path to Parentnode (i.e. settings/<uid>)}
   * @return {Observable<any[]>}: Observable with the data in it (Observable.pipe().subscribe())
   */
  public getAllItems(dbNode: string): Observable<any[]> {
    return this.db.list(dbNode).snapshotChanges();
  }

  /**
   * Gets a single object
   * @param dbNode Path to Parentnode (i.e. settings/<uid>)}
   * @return {Observable<any>}
   */
  public getItemById(dbNode: string): Observable<any> {
    return this.db.object(dbNode).snapshotChanges();
  }



  /**
   * Sets/Updates the information. If the node doesn't exist it gets created
   * @param dbNode: Path to Parentnode (i.e. users/currentUser)
   * @param key: key to Database-Entry
   * @param data: JSON-Data to commit
   */
  public setItem(dbNode: string, key: string, data: any): void {
    this.db.list(dbNode).set(key, data);
  }

  /**
   * Deletes the information.
   * @param dbNode: Path to Parentnode (i.e. users/currentUser)
   */
  public deleteItem(dbNode: string): void {
    this.db.object(dbNode).remove();
  }

  /**
   * Creates a new element with Automatic Hash ID
   * @author Alexander Stolz
   * @param dbNode Path to Parentnode (i.e. users/currentUser)
   * @param data JSON-Data to commit
   */
  public addNewItem(dbNode:string, data:any):string{
    let ref = this.db.list(dbNode).push(data);
    return ref.key;

  }

}
