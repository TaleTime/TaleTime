/**
 * Created by Kevin on 24.06.2017.
 * Matches a s string of speech recognition results to an answer
 */

import { Injectable } from "@angular/core";

import { MtgaNextStoryNode } from "../../datamodels/story/story";
import { LanguageFileService } from "./languageFile";
import {
  ANSWER_CHAPTER_BACKWARDS,
  ANSWER_CHAPTER_REPEAT
} from "../../app/constants";
import { LoggerService } from "../logger/logger";

@Injectable()
export class AnswerMatchingService {
  constructor(
    private languageFileService: LanguageFileService,
    private logger: LoggerService
  ) {}

  public match(
    result: string[],
    answers: MtgaNextStoryNode[]
  ): MtgaNextStoryNode | string | null {
    if (answers.length != 1) {
      // find exact math considering the hierachy
      for (let i = 0; i < result.length; i++) {
        for (let answer of answers) {
          if (AnswerMatchingService.checkContent(answer.value, result[i])) {
            this.logger.log(answer.value + " matched to answer");
            return answer;
          }
        }
      }
    } else {
      // only one answer possible, the system asks if the user wants to continue
      // therefore check if user agrees
      for (let i = 0; i < result.length; i++) {
        for (let a of this.languageFileService.preDefinedTexts.agree) {
          if (AnswerMatchingService.checkContent(a.value, result[i])) {
            this.logger.log(a.value + " matched to answer");
            return answers[0]; // it is only one possible here
          }
        }
      }
    }

    // nothing found so far, check for numbers
    for (let i = 0; i < result.length; i++) {
      for (let e of this.languageFileService.preDefinedTexts.enum) {
        if (AnswerMatchingService.checkContent(e.value, result[i])) {
          return answers[e.index - 1];
        }
      }
    }

    // navigate backwards
    for (let i = 0; i < result.length; i++) {
      for (let e of this.languageFileService.preDefinedTexts.backwards) {
        if (AnswerMatchingService.checkContent(e.value, result[i])) {
          return ANSWER_CHAPTER_BACKWARDS;
        }
      }
    }

    // repeat current chapter
    for (let i = 0; i < result.length; i++) {
      for (let e of this.languageFileService.preDefinedTexts.repeatChapter) {
        if (AnswerMatchingService.checkContent(e.value, result[i])) {
          return ANSWER_CHAPTER_REPEAT;
        }
      }
    }

    // does not matter
    for (let i = 0; i < result.length; i++) {
      for (let e of this.languageFileService.preDefinedTexts.doNotCare) {
        if (AnswerMatchingService.checkContent(e.value, result[i])) {
          return answers[
            AnswerMatchingService.createRandomNumber(answers.length)
          ];
        }
      }
    }

    return null;
  }

  private static checkContent(search: string, containedIn: string) {
    search = AnswerMatchingService.removeSpecialCharacters(search);
    console.log(
      "Checking if <" +
        containedIn.toLowerCase() +
        "> contains <" +
        search.toLowerCase() +
        ">"
    );
    return containedIn.toLowerCase().indexOf(search.toLowerCase()) > -1;
  }

  private static removeSpecialCharacters(s: string) {
    return s.replace(/[^a-zA-Z0-9\s]/g, "");
  }

  private static createRandomNumber(max: number): number {
    return Math.ceil(Math.random() * max);
  }
}
