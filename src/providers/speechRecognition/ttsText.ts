import { Injectable } from "@angular/core";

import { LanguageFileService } from "./languageFile";
import { MtgaNextStoryNode } from "../../datamodels/story/story";
import { LoggerService } from "../logger/logger";
/**
 * Created by Kevin on 24.06.2017.
 * Creates texts for reading out the answers
 */

@Injectable()
export class TtsTextService {
  constructor(
    private languageFileService: LanguageFileService,
    private logger: LoggerService
  ) {}

  public createAnswersText(answers: MtgaNextStoryNode[]): string {
    let text: string;

    this.logger.log(
      "Reading answers out for these possible answers: " +
        JSON.stringify(answers)
    );

    if (answers.length == 1) {
      // only one possible answer
      this.logger.log("There's only one possible answer");
      let i = this.generateRandomNumber(
        this.languageFileService.preDefinedTexts.answers.single.length
      );
      text = this.languageFileService.preDefinedTexts.answers.single[i].value;
    } else {
      // multiple possible answers
      this.logger.log("There are multiple possible answers");
      let i = this.generateRandomNumber(
        this.languageFileService.preDefinedTexts.answers.single.length
      );
      text = this.languageFileService.preDefinedTexts.answers.multiple[i]
        .value;
      for (let i = 0; i < answers.length; i++) {
        if (i != answers.length - 1) {
          text = text + " " + answers[i].value;
          if (i < answers.length - 2) {
            text = text + ",";
          }
        } else {
          let j = this.generateRandomNumber(
            this.languageFileService.preDefinedTexts.linking.or.length
          );
          text =
            text +
            " " +
            this.languageFileService.preDefinedTexts.linking.or[j].value +
            " " +
            answers[i].value +
            "?";
        }
      }
    }

    this.logger.log("Created answer text : " + text);
    return text;
  }

  private generateRandomNumber(l: number) {
    this.logger.log("Generating random number less than " + l);
    return Math.ceil(Math.random() * l) - 1;
  }

  public createRepeatText(): string {
    let i = this.generateRandomNumber(
      this.languageFileService.preDefinedTexts.repeat.length
    );
    return this.languageFileService.preDefinedTexts.repeat[i].value;
  }

  createAnswerHelp(): string {
    let i = this.generateRandomNumber(
      this.languageFileService.preDefinedTexts.answers.help.length
    );
    return this.languageFileService.preDefinedTexts.answers.help[i].value;
  }
}
