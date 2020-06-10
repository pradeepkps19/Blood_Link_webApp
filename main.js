// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCFCU8Yz7-lnnV1BUlgR0LKFTWvW5EqopI",
    authDomain: "blood-bank-73a87.firebaseapp.com",
    databaseURL: "https://blood-bank-73a87.firebaseio.com",
    projectId: "blood-bank-73a87",
    storageBucket: "blood-bank-73a87.appspot.com",
    messagingSenderId: "179399551526",
    appId: "1:179399551526:web:00e2fd8a17a69a874bd4e7",
    measurementId: "G-SQYKWMSVJV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var donorRef = firebase.database().ref('BloodBank/Donor');
var loginRef = firebase.database().ref('BloodBank/D Login');

document.getElementById('signInForm').addEventListener('submit', loginform);
function loginform() {
    loginRef.on("child_added",snap =>{
        alert(snap.val());
    });
}


document.getElementById('registerForm').addEventListener('submit', submitform);
function submitform() {
    var name = getInputval('nameInput');
    var dob = getInputval('birthInput');
    var blood = getInputval('bloodtype');
    var city = getInputval('cityInput');
    var mobile = getInputval('mobileInput');
    var pass = getInputval('passwordInput');
    var confirm = getInputval('confirmInput');
    if (validateRegistration(name, dob, city, mobile, pass, confirm)) {
        addtodb(name, dob, blood, city, mobile, pass);
    }
    else {
        alert("Registration failed! \nDo again");
    }
}
function getInputval(id) {
    return document.getElementById(id).value;
}
function validateRegistration(name, dob, blood, city, mobile, pass, confirm) {
    if (mobile.length != 10) {
        document.getElementById('mobileInput').focus();
        alert("Enter valid mobile");
        return false;
    }
    if (pass != confirm) {
        alert("Password mismatch");
        document.getElementById('confirmInput').focus();
        return false;
    }

}


function addtodb(name, dob, blood, city, mobile, pass) {
    var newdonorRef = donorRef.push();
    newdonorRef.set({
        dname: name,
        dblood: blood,
        dmobile: mobile,
        dcity: city,
        dpass: pass,
        ddob: dob
    });
    addtologin(mobile, pass);
}
function addtologin(mobile, pass) {
    loginRef.child(mobile).set({
        dmobile: mobile,
        dpass: pass
    })
    alert("Registration Successful! \n Login to continue");
}