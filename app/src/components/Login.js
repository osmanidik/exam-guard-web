import React, { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import '../App.css'

const firebaseConfig = {
    apiKey: "AIzaSyCl6GmEgISrQQu7t6n-WbqBOplfluy5rVE",
    authDomain: "exam-guard.firebaseapp.com",
    projectId: "exam-guard",
    storageBucket: "exam-guard.appspot.com",
    messagingSenderId: "507674917189",
    appId: "1:507674917189:web:b82b760d8b768b0f30262c",
    measurementId: "G-EVR4HQ4JW1",
};

firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function Login() {
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (!!user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.open("/home","_self");
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <div className='login' style={{backgroundColor: "#fffafa"}}>
        <div className="card buttonLogin">
            <h3 style={{color: "black"}}>Welcome!</h3>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    </div>
  );
}

export default Login;