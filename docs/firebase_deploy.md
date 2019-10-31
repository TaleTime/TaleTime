# TaleTime as a PWA

TaleTime can be published as a Progressive Web App. A tutorial on how to do that can be found [here](https://ionicframework.com/docs/publishing/progressive-web-app).

In short, the needed dependencies have been added and the mandatory service worker has been created. No further changes should be necessary.

## Deploying to Firebase (first time)

The mentioned tutorial recommends using Firebase for deploying the app:

*"Firebase hosting provides many benefits for Progressive Web Apps, including fast response times thanks to CDNs, HTTPS enabled by default, and support for HTTP2 push."*

In order to deploy the app from a local machine, one has to 

1. install the Firebase CLI,

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

Step 3 results in the following error: 
`Error: Command requires authentication, please run firebase login`

Just run `firebase login` (as stated) and follow the instructions. You will probably need to be added to the firebase project first. Please contact a contributor of this project to join.

## Deploying to Firebase in general

Just repeat step 2 and step 3 from above. 


## Access the PWA

The app can be accessed [here](https://taletime-1.firebaseapp.com/).
