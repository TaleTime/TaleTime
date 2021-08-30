import { isPlatformServer } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FireBaseService {
  private dbRef: AngularFireList<any>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  /*
    Gets Data from dbNode
    dbNode: dbNode: Path to Parentnode (i.e. settings/<uid>)
  */
  getAllItems(dbNode: string) {
    return this.db.list(dbNode).snapshotChanges();
  }

  getAllValues(dbNode: string) {
    return this.db.list(dbNode).valueChanges();
  }

  getItemById(dbNode: string) {
    return this.db.object(dbNode).snapshotChanges();
  }

  /*
    Sets/Updates the information. If the node doesn't exist it gets created
    
    dbNode: Path to Parentnode (i.e. settings/<uid>)
    key: key to Database-Entry
    data: JSON-Data to commit
  */
  setItem(dbNode: string, key: string, data: any): any {
    this.db.list(dbNode).set(key, data);
  }

  deleteItem(dbNode: string) {
    this.db.object(dbNode).remove();
  }
}
