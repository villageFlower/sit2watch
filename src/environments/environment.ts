// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import firebase from "firebase";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCjds8QfjcyyoRlHTz_LEYOKmq_6FTf7H4",
    authDomain: "sit2watch-9309c.firebaseapp.com",
    projectId: "sit2watch-9309c",
    storageBucket: "sit2watch-9309c.appspot.com",
    messagingSenderId: "536430612379",
    appId: "1:536430612379:web:b9e195b3b1bcaaf9ef9b3e",
    measurementId: "G-L07F935PPK"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
