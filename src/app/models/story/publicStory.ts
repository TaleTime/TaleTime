import {Tag} from "../storyInformation";

export interface PublicStory {
  "mtga-story": {
    attributes: PublicStoryMetaData;
    "mtga-story-node": any;
  };
}

// TODO: Merge this with StoryInformationWithURL
export class PublicStoryMetaData {
  id: string;
  title: string;
  imgCover: string;
  lang: string;
  desc: string;
  creator: string;
  medium: string;
  url: string;
  tags: Tag[];
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
