/**
 * Created by Kevin on 24.06.2017.
 * Predefined texts for language generation
 */

export interface PredefinedTexts {
  answers: {
    multiple: PredefinedText[],
    single: PredefinedText[],
    help: PredefinedText[]
  },
  linking: {
    or: PredefinedText[],
    and: PredefinedText[]
  },
  repeat: PredefinedText[],
  agree: PredefinedText[],
  decline: PredefinedText[],
  enum: PredefinedEnums[],
  backwards: PredefinedEnums[],
  repeatChapter: PredefinedEnums[],
  doNotCare: PredefinedEnums[],
}

export interface PredefinedText {
  id: number,
  value: string
}

export interface PredefinedEnums extends PredefinedText {
  index: number;
}
