/**
 * считывае учетные данные для Firebase
 * используются для app-firebase.js
 */

// includeScript("/js/firebase/firebase-config.js");

var firebaseConfig = $.getJSON({'url': "js/firebase/firebase-config.json", 'async': false});  
firebaseConfig = JSON.parse(firebaseConfig.responseText); 

var firebaseVapidKey = firebaseConfig.firebaseVapidKey;

firebaseConfig = firebaseConfig.firebaseConfig;
