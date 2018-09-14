import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCAYgVBXD1xwOWWrI-4wtSDpu8o7WwUu3A',
  authDomain: 'todolist-vue-13015.firebaseapp.com',
  databaseURL: 'https://todolist-vue-13015.firebaseio.com',
  projectId: 'todolist-vue-13015',
  storageBucket: 'todolist-vue-13015.appspot.com',
  messagingSenderId: '749211392689'
}

const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
