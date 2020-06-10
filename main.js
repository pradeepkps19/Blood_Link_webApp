// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "enter your firebase api",
    authDomain: "xyzproject.firebaseapp.com",
    databaseURL: "link.firebaseio.com",
    projectId: "....",
    storageBucket: "....appspot.com",
    messagingSenderId: "zxcbmxnzv",
    appId: "xcvc",
    measurementId: "...."
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
