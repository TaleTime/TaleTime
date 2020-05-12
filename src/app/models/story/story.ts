export interface Story {
  "mtga-story": {
    attributes: StoryMetaData;
    "mtga-story-node": any;
  };
}

export class StoryMetaData {
  id: string;
  title: string;
  imgCover: string;
  lang: string;
  desc: string;
  creator: string;
  medium: string; // cloud or device
}

export interface MtgaStoryNode {
  attributes: ChapterAttributes;
  "mtga-nodeText": {
    value: string;
    attributes: {
      textStyle: string;
    };
  };
  "mtga-nextStoryNode": any;
}

export class ChapterAttributes {
  audioSrc: string;
  color: string;
  name: string;
  nodeTyp: string;
  storyNodeId: string;
}

export class MtgaNextStoryNode {
  value: string;
  attributes: {
    id: string;
  };
}
