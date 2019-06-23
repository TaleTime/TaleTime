# Story Structure

## Building / Format of a Story

### Creating a story

- the open-source tool _[Twine ](http://twinery.org)_ is used to create stories
- stories are then stored as .twine files

### Converter

- twine stories are converted with the _[twine converter](https://github.com/TaleTime/Converter)_ to receive a .json file

### Zip

The final data structue is a zipped folder containing:

- story image
- folders for every language of the story which contains the .json formatted story file and a folder _readers_ containing the audio files for every story reader
