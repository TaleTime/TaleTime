# TaleTime as a PWA

TaleTime can be published as a Progressive Web App. A tutorial on how to do that can be found [here](https://ionicframework.com/docs/publishing/progressive-web-app).

In short, the needed dependencies have been added and the mandatory service worker has been created. No further changes should be necessary.

## Deploying to Firebase

The mentioned tutorial recommends using Firebase for deploying the app:

*"Firebase hosting provides many benefits for Progressive Web Apps, including fast response times thanks to CDNs, HTTPS enabled by default, and support for HTTP2 push."*

In order to deploy the app from a local machine, one has to 

1. install the Firebase CLI (only once of course),

```
npm install -g firebase-tools
```

2. build the app (locally), and

```
ionic build --prod
```

3. deploy the app.

```
firebase deploy
```

## Access the PWA

The app can be accessed [here](https://taletime-1.firebaseapp.com/).
