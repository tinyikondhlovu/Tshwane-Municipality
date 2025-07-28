document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (role && username && password) {
    alert(`Logging in as ${role.toUpperCase()}`);
    // You can later add actual authentication logic here


  } else {
    alert("Please fill in all fields.");
  }
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABpGPM1xKJIUSvWu-qK9mIbcbv126lM7c",
  authDomain: "tshwane-service-delivery.firebaseapp.com",
  projectId: "tshwane-service-delivery",
  storageBucket: "tshwane-service-delivery.appspot.com",
  messagingSenderId: "1026667376650",
  appId: "1:1026667376650:web:ec9f7f0a7319f973b72ff3",
  measurementId: "G-8CSLJ8T0RF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


function showMessage(message, divId){
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function(){
      messageDiv.style.opacity = 0;
  }, 5000);
}

// Registration
const signUp = document.getElementById('submitSignUp');
if (signUp) {
  signUp.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const username = document.getElementById('newUsername').value;
    const role = document.getElementById('role').value;

    if (!email || !password || !username || !role) {
      showMessage('Please fill in all fields.', 'signUpMessage');
      return;
    }

    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = {
        email: email,
        username: username,
        role: role
      };
      await setDoc(doc(db, "users", user.uid), userData);
      showMessage('Account Created Successfully', 'signUpMessage');
      setTimeout(() => {
        window.location.href = 'index1.html';
      }, 1500);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
      } else {
        showMessage('Unable to create User', 'signUpMessage');
      }
    }
  });
}

// Login
const signIn = document.getElementById('submitSignIn');
if (signIn) {
  signIn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!email || !password || !role) {
      showMessage('Please fill in all fields.', 'signInMessage');
      return;
    }

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      showMessage('Login is successful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      setTimeout(() => {
        window.location.href = 'index2.html'; // <-- Change this line
      }, 1500);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else {
        showMessage('Account does not Exist', 'signInMessage');
      }
    }
  });
}