import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAqaK-liTonYlRdx640iIr76hrkLuJf088",
    authDomain: "restobar-admin.firebaseapp.com",
    projectId: "restobar-admin",
    storageBucket: "restobar-admin.appspot.com",
    messagingSenderId: "591760930545",
    appId: "1:591760930545:web:4dc83ff76ebc119f7d5b50"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }
