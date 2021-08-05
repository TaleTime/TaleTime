import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FireBaseService {
  itemsRef: AngularFireList<any>;
  item: Observable<any[]>;
  data: Observable<any>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.itemsRef = db.list("test");
    this.data = this.itemsRef.stateChanges();
    this.data.forEach((item) => {
      console.log("item.key: ", item.key);
      console.log("item: ", item);
    });

    db.list("users");
  }

  /**
   * Get All tickers from firebase
   */
  getMessages(): Observable<any> {
    this.item = this.itemsRef.valueChanges();
    return;
  }

  addItem(): any {
    this.itemsRef.push({ name: "BEEEEDER" });
  }
}
