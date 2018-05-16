export class StoryInformation { // TODO tobi des todes!
    public id: string;
    public title: string;
    public author: string[];
    public date: number;
    public language: string;
    public shortDescription: string;
    public readers: Reader[];
    public medium: string;
    public cover: string; // TODO tobi evtl. base64
}

export class StoryInformationWithUrl extends StoryInformation {
    public url: string;
}

export class Reader {
    name: string;
    answersPartOfAudioFile: boolean;
}
