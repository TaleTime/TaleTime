/**
 * Created by Kevin on 26.06.2017.
 *
 * Accesses the predefined texts for TTS output
 */

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {PredefinedTexts} from "../../../models/predefinedTexts";
import {FILETYPE_JSON, TTS_RES} from "../../../constants/constants";
import {LoggerService} from "../../logger/logger.service";

@Injectable({
  providedIn: "root"
})
export class LanguageFileService {

  private _preDefinedTexts: PredefinedTexts;

  constructor(public http: HttpClient, private logger: LoggerService) {
    this.logger.log("Language file service instantiated");
    this.loadLanguageFile().subscribe(() =>
      this.logger.log("Language file subscription ok")
    );
  }

  get preDefinedTexts(): PredefinedTexts {
    return this._preDefinedTexts;
  }

  set preDefinedTexts(value: PredefinedTexts) {
    this._preDefinedTexts = value;
  }

  public loadLanguageFile(language: string = "de-DE") {
    return Observable.create((observer) => {
      this.http
        .get(TTS_RES + language + FILETYPE_JSON)
        .subscribe((texts: PredefinedTexts) => {
          this.logger.log("Loaded language file for <" + language + ">");
          this.preDefinedTexts = texts;
          this.logger.log("Loaded language file is:");
          this.logger.log(texts);
          observer.next(true);
          observer.complete();
        });
    });
  }
}
