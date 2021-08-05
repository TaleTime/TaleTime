import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FireBaseService {
  dbRef: AngularFireList<any>;
  //data: Observable<any>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    // this.data = this.itemsRef.stateChanges();
    // this.data.forEach((item) => {
    //   console.log("item.key: ", item.key);
    //   console.log("item: ", item);
    // });
    // db.list("users");
  }

  getItems(dbNode: string): Observable<any> {
    return this.db.list(dbNode).stateChanges();
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
}
