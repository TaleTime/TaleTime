import {Injectable, isDevMode} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoggerService {

  constructor() {
  }

  /**
   * log message
   */
  public log(message) {
    if (isDevMode()) {
      console.log(this.expandToMessage(message));
    }
  }

  /**
   * warn
   */
  public warn(message) {
    if (isDevMode()) {
      console.warn(this.expandToMessage(message));
    }
  }

  private expandToMessage(msgOrObj: any) {
    let message = "";
    if (typeof msgOrObj === "string" || msgOrObj instanceof String) {
      // error is a string
      message = msgOrObj as string;
    } else {
      if (
        msgOrObj.hasOwnProperty("constructor") &&
        msgOrObj.constructor.hasOwnProperty("name")
      ) {
        // There is a constructor/class name defined
        message = msgOrObj.constructor.name;
      } else {
        // No constructor name is set --> use the object's prototype name as fallback method
        message = Object.prototype.toString.call(msgOrObj);
      }
      if (msgOrObj.hasOwnProperty("message")) {
        message += " : " + msgOrObj.message;
      } else {
        message += " : " + JSON.stringify(msgOrObj);
      }
    }
    return message;
  }

  /**
   * error
   */
  public error(error) {
    if (isDevMode()) {
      console.error(this.expandToMessage(error));
    }
  }
}
