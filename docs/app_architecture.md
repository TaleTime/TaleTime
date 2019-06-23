# App Architecture

This documents describes the main components of the app and how they work together.

## Frameworks

The major frameworks within the app used are

- [Ionic Framework](https://ionicframework.com/)  
  Allows the app to be built for movile platforms such as Android and iOS
- [Cordova](https://cordova.apache.org/)  
  Base for the Ionic framework
- [Angular v1](https://angular.io/)  
  Base UI framework
- [ngx-translate](http://www.ngx-translate.com/)  
  Internationalization library for Angular

## Source Folder Structure

- **app**  
  Contains the core files for the app, such as global constants
- **assets**  
  All non-code files are within this folder, mostly graphical assets for the UI, but also contains internationalization files and the current default story
- **pages**  
  Source code for the different views of the app
- **providers**  
  Contains utility packages that are not view-specific
- **theme**  
  Source for the app style (SCSS)
