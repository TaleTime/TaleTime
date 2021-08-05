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

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  /**
   * Get All tickers from firebase
   */
  getMessages(): Observable<any> {
    this.itemsRef = this.db.list("test");
    this.item = this.itemsRef.valueChanges();
    this.item.subscribe((res) => console.log(res));
    return;
  }
}
