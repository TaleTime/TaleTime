/**
 * Created by Kevin on 06.07.2017.
 */

/** general */
export const FILETYPE_JSON = ".json";
export const FILETYPE_MP4 = ".m4a";

/** directories */
export const APP_NAME = "taletime";
export const STORY_DIR = "assets/stories/";
export const TTS_RES = "assets/tts/";
export const READER_DIR = "/readers/";
export const WWW = "www";
export const CLOUD = "cloud";

/** file names */
export const SETTINGS_FILE_NAME = "settings.json";
export const STORY_FILE_NAME = "storyies.json";
export const SINGLE_STORY_FILE_NAME = "story.json";
export const USER_FILE_NAME = "users.json";

/** for story data structure */
export const MTGA_STORY = "mtga-story";
export const MTGA_NODE = "mtga-story-node";
export const MTGA_NEXT_NODE = "mtga-nextStoryNode";
export const MTGA_NODE_TEXT = "mtga-nodeText";

/** for answer matching */
export const ANSWER_CHAPTER_BACKWARDS = "chapter_back";
export const ANSWER_CHAPTER_REPEAT = "chapter_repeat";

/** TTS rates */
export const TTS_RATE_SLOW = "TTS_SLOW";
export const TTS_RATE_NORMAL = "TTS_NORMAL";
export const TTS_RATE_FAST = "TTS_FAST";

export const TTS_RATE_SLOW_VALUE = 0.5;
export const TTS_RATE_NORMAL_VALUE = 0.75;
export const TTS_RATE_FAST_VALUE = 1;
export const FONT_SIZE_12_LABEL = "pixel12";
export const FONT_SIZE_14_LABEL = "pixel14";
export const FONT_SIZE_16_LABEL = "pixel16";
export const FONT_SIZE_18_LABEL = "pixel18";
export const FONT_SIZE_12_VALUE = 12;
export const FONT_SIZE_14_VALUE = 14;
export const FONT_SIZE_16_VALUE = 16;
export const FONT_SIZE_18_VALUE = 18;


/** Language */
export const AVAILABLE_LANGUAGES = [
  {
    code: "en-US",
    name: "English"
  },
  {
    code: "de-DE",
    name: "Deutsch"
  }
];

export const DEFAULT_LANG = "en-US";

/** Reader */
export const DEFAULT_READER = "default";

/** CSS */
export const CSS_PULSE_CLASS = "pulse";

/** Default Stroies */
export const DEFAULT_STORIES = [
  {
    name: "Celebrating_Shuby_the_Shy_Sheep",
    languages : ["en"]
  },
  {
    name: "Der_verlorene_Ball",
    languages : ["en" ,"de"]
  }
];
