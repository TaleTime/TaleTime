//initialize Firebase
const config = {
    apiKey: "AIzaSyDfzKI_45XqK7HG49LsyxsTCd55DWPKmuo",
    authDomain: "tale-time.firebaseapp.com",
    databaseURL: "https://tale-time.firebaseio.com/",
    projectId: "tale-time",
    storageBucket: "tale-time.appspot.com",
    messagingSenderId: "12018339610",
    appId: "1:12018339610:web:27fb676848ff7a0200a6a3",
    measurementId: "G-GRW7BL19TT"
}

firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

//get elements
