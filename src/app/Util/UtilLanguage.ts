import { AvailableLanguage } from "../models/AvailableLanguage";

export function convertSystemLangToAvailableLanguage (lang: String):String{
  switch (lang) {
    case "de-DE": {
      return AvailableLanguage.German
    }
    case "en-US": {
      return AvailableLanguage.English
    }
    default: {
      return AvailableLanguage.German
    }
  }
}
