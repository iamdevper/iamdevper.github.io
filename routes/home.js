const express = require('express');
const router = express.Router();

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require('firebase');

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyBg20oSwvNO-_dwBj4F8ARIebq-MtMaewk",
    authDomain: "fir-ex1-bbe16.firebaseapp.com",
    databaseURL: "https://fir-ex1-bbe16.firebaseio.com",
    projectId: "fir-ex1-bbe16",
    storageBucket: "fir-ex1-bbe16.appspot.com",
    messagingSenderId: "499527222261",
    appId: "1:499527222261:web:9e157ebb584ee423"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// console.log(firebase.app().name);  // "[DEFAULT]"

// Use the shorthand notation to access the default project's Firebase services
var db = firebase.firestore();

// var bodyParser = require('body-parser');

router.get('/', (req, res) => {

    // query data
    db.collection("users").get().then((querySnapshot) => {
        var arrObj = [];
        querySnapshot.forEach((doc) => {
            // var name = doc.data().name;
            // console.log(`${doc.id} => ${JSON.stringify(doc.data().emial)}`);
            // console.log(doc.id, '>>>>>>>');
            // console.log(JSON.stringify(doc.data()));
            // res.send(`${doc.id} => ${doc.data()}`)
            // arrObj.push(...[${doc.data().emial}]);
            arrObj.push(...[doc.data()]);
        });
        // res.render(arrObj)
        res.render('index', {title: 'My Express App', message: JSON.stringify(arrObj) });
    });

});

//Fetch instances
// app.get('/', function (req, res) {

// 	console.log("HTTP Get Request");
// 	var userReference = firebase.database().ref("/users/");

// 	//Attach an asynchronous callback to read the data
// 	userReference.on("value", 
// 			  function(snapshot) {
// 					console.log(snapshot.val());
// 					res.json(snapshot.val());
// 					userReference.off("value");
// 					}, 
// 			  function (errorObject) {
// 					console.log("The read failed: " + errorObject.code);
// 					res.send("The read failed: " + errorObject.code);
// 			 });
// });

router.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params); 
    // req.params = /2018/1
    // req.query = ?sortBy=name
});

router.get('/add', (req, res) => {

    // add data
    db.collection("users").add({
        first_name: "Ada",
        last_name: "Lovelace",
        emial: "icandevp@gmail.com",
        mobile: '+66899976477'
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    // res.send('Hello World')
});

module.exports = router;