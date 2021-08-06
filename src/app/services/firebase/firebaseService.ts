import { isPlatformServer } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FireBaseService {
  dbRef: AngularFireList<any>;
  //data: Observable<any>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  // this.data = this.itemsRef.stateChanges();
    // this.data.forEach((item) => {
    //   console.log("item.key: ", item.key);
    //   console.log("item: ", item);
    // });
    // db.list("users");

  getAll(dbNode:string){
    return this.db.list(dbNode).snapshotChanges();
  }

  getItemById(dbNode: string){
    return this.db.object(dbNode).snapshotChanges();
  }

  /*
    Gets Data from dbNode
    dbNode: dbNode: Path to Parentnode (i.e. settings/<uid>)
  */
  getItems(dbNode: string): Observable<any> {
      var items = this.db.list(dbNode).stateChanges();
      console.log("TEST HALLO", this.db.list("test").stateChanges());
      return items;
  }

  getItemsValueChanges(dbNode:string): Observable<any> {

    //this.shirts = this.shirtCollection.snapshotChanges().pipe(
    //  map(actions => actions.map(a => {
    //    const data = a.payload.doc.data() as Shirt;
    //    const id = a.payload.doc.id;
    //    return { id, ...data };
    //  }))

    var items = this.db.list(dbNode).snapshotChanges(); // valueChanges();
    console.log("ValueChanges items", items);
    console.log(items.subscribe(item => console.log("ValueChanges item", item)))
    return items;
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