export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyDfzKI_45XqK7HG49LsyxsTCd55DWPKmuo",
    authDomain: "tale-time.firebaseapp.com",
    databaseURL: "https://tale-time.firebaseio.com/",
    projectId: "tale-time",
    storageBucket: "tale-time.appspot.com",
    messagingSenderId: "12018339610",
    appId: "1:12018339610:web:27fb676848ff7a0200a6a3",
    measurementId: "G-GRW7BL19TT"

  },
  advancedFirebaseConfig: {
    enableFirestoreSync: true, // enable/disable autosync users with firestore
    toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
    toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
    authGuardFallbackURL: '', // url for unauthenticated users - to use in combination with canActivate feature on a route
    authGuardLoggedInURL: '', // url for authenticated users - to use in combination with canActivate feature on a route
    passwordMaxLength: 60, // min/max input parameters in components should be within this range.
    passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
    // Same as password but for the name
    nameMaxLength: 50,
    nameMinLength: 2,
    // If set, sign-in/up form is not available until email has been verified.
    // Plus protected routes are still protected even though user is connected.
    guardProtectedRoutesUntilEmailIsVerified: false,
    enableEmailVerification: false, // default: true (disabled for automated testing)
  }
};
