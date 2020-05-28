# TaleTime
TaleTime is an interactive audiobook app for iOS and Android based on the ionic framework v4.

Repository Metrics:

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/TaleTime/TaleTime/BuildAndDeploy?label=automatical%20build%20process)


## Get started

clone the repository:
```Shell
git clone https://github.com/TaleTime/TaleTime.git
cd TaleTime
```

install all dependencies using npm:
```Shell
  npm install
```

make sure you have angular and ionic cli installed:
```Shell
  npm i -D -E @angular/cli
  npm install -g @ionic/cli
```
serve your local development server:
```Shell
  ionic serve
```

Start developing and watch your changes in realtime!


TaleTime is an innovative app for Android and iOS, that lets children experience a new unique way of listening to audiobooks.

Besides our professionally recorded audiobooks we also give parents the opportunity to record the stories themselves. Recording is very convenient and of course can be done without extensive technical know-how. TaleTime also offers children the opportunity to influence the course of the stories themselves.

<!-- <div class="d-lg-none">
    <p class="lead">
        <a href="app">Try our online demo!</a>
    </p>
</div> -->
*[Try our online demo](https://tale-time.web.app/")*

## Write a new Story

TaleTime relies on writers writing stories! If you want to contribute, the following information is for you.

The the open-source tool *[Twine](http://twinery.org)* is used to create stories. *[Here](https://twinery.org/wiki/twine2:guide)* you can find a useful tutorial in case you don't know Twine yet.
After finishing the .twine file the *[twine converter](https://github.com/TaleTime/Converter)* is used to receive a .json file, which is then used by the actual TaleTime app. 


## Contributing

Since this is an open source project, everyone can help making TaleTime better. You will find the complete source code on [GitHub](https://github.com/TaleTime/TaleTime), where you can also get some more information on how to contribute.

When implementing a new feature or fixing a bug, please make sure that your code follows the same style as the existing codebase and try writing your code as understandable as possible. You should also test your changes and only commit them if they don't break anything. Your comments should be in English.


## About us

This project has been developed by several students of [Hochschule für Technik und Wirtschaft des Saarlandes](http://www.htwsaar.de). It has been in continous development for two years and now finally we want to take advantage of the huge open source community of github.
