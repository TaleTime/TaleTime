# <img src="./.github/logo.png" width="100" align="left"> TaleTime
> TaleTime is an interactive audiobook app for iOS and Android.

**TaleTime** is an innovative app for Android and iOS, that lets children experience a new unique way of listening to audiobooks.

Besides our professionally recorded audiobooks we also give parents the opportunity to record the stories themselves. Recording is very convenient and of course can be done without extensive technical know-how. TaleTime also offers children the opportunity to influence the course of the stories themselves.


## Screenshots

<p align="center">
    <img src="./.github/screenshot1.png" height="450" alt="Screenshot">
</p>


## Getting Started
### Building TaleTime
#### Clone this repository
``git clone https://github.com/TaleTime/TaleTime.git``
#### Install Ionic and Cordova
``npm install -g cordova ionic``
#### Install dependencies
``npm install``
#### Install Cordova plug-ins
```
npm install @ngx-translate/core --save
npm install @ngx-translate/http-loader --save
ionic cordova plugin add cordova-plugin-globalization
npm install --save @ionic-native/globalization
ionic cordova plugin add cordova-plugin-file
npm install --save @ionic-native/file
ionic cordova plugin add cordova-plugin-tts
npm install --save @ionic-native/text-to-speech
ionic cordova plugin add cordova-plugin-speechrecognition
npm install --save @ionic-native/speech-recognition
ionic cordova plugin add cordova-plugin-nativeaudio
npm install --save @ionic-native/native-audio
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage
```


### Run the application
#### In a browser without Cordova plugins
``ionic serve``
#### In a browser with Cordova plugins
``ionic cordova run browser``
#### On Android
``ionic cordova run android``
#### On iOS
``ionic cordova run ios``

Use ``--livereload`` or ``-l`` to enable livereload.
Use ``-c`` to enable terminal logging.


## Contributing

To be destined...



## Architecture

The app is built with the Ionic and Angular.js (version 1) frameworks.

- [Interaction Design]()  
  Explains how the user will interact with the app.
- [App Architecture]()  
  Fundamental structure of the app (abstract).
- [Processes]()  
  Business process model.
- [User Accounts]()  
  Content of the user profile and its properties.
- [Story Structure]()  
  How stories are built and can be generated.


## Roadmap

To be destined...


## License

The main app is licensed under GPLv3, other parts may be licensed differently. For further information, please refer to our [license](https://github.com/TaleTime/TaleTime/blob/master/LICENSE).
