import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBjaukdXyVZxcY7icfdWKSOzahFiw9YL_w",
    authDomain: "fir-tuts-7c87d.firebaseapp.com",
    projectId: "fir-tuts-7c87d",
    storageBucket: "fir-tuts-7c87d.appspot.com",
    messagingSenderId: "483313430206",
    appId: "1:483313430206:web:0032ee8d8c2e1f67feb8ef"
  };

  initializeApp(firebaseConfig)

  const db = getFirestore()

  const auth = getAuth()

  const colRef = collection(db, 'books')

  // get collection data
  getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({id: doc.id, ...doc.data()})
    })
    console.log({books})
  })
  .catch(err => {
    console.log(err.message)
  })

  // adding documents
  const addBookFrom = document.querySelector('.add')
  addBookFrom.addEventListener('submit', e => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookFrom.title.value,
        author: addBookFrom.author.value,
        createdAt: serverTimestamp(),
    })
    .then(() => {
        addBookFrom.reset()
    })
  })

// deleting documents
const deleteBookFrom = document.querySelector('.delete')
deleteBookFrom.addEventListener('submit', e => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookFrom.id.value)
    deleteDoc(docRef)
    .then(() => {
        deleteBookFrom.reset()
    })
})

const display = document.querySelector('.display')

// real time collection data
onSnapshot(colRef, (snapshot) => {
    let books = '<ul>'
    snapshot.docs.forEach((doc) => {
        books += `<li><b>Author</b>: ${doc.data().author}, <b>Title</b>: ${doc.data().title}, <b>ID</b>: ${doc.id} </li>`
    })
    books += '</ul>'
    console.log({books})
    display.innerHTML = books
})

// query
const q = query(colRef, where("author", "==", "patrick"), orderBy('createdAt', 'desc')) // it we want it in ascending order, we can leave the second option of orderBy

onSnapshot(q, (snapshot) => {
    let books = '<ul>'
    snapshot.docs.forEach((doc) => {
        books += `<li><b>Author</b>: ${doc.data().author}, <b>Title</b>: ${doc.data().title}, <b>ID</b>: ${doc.id} </li>`
    })
    books += '</ul>'
    console.log({books})
    console.log(books)
})

// get a single document
const docRef = doc(db, 'books', 'NbVIpkzTuWd1ew9hBXfg')

getDoc(docRef)
.then((doc) => {
    console.log(doc.data(), (doc.id))
})

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// update a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateForm.id.value)
    updateDoc(docRef, {
        title: 'updated title', // only update the property passed in and leave the other
    })
    .then(() => {
        updateForm.reset()
    })
})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user created:', cred.user)
        signupForm.reset()
    })
    .catch((err) => {
        console.log(err.message)
    })
})

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        console.log('the user signed out')
    })
    .catch((err) => {
        console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user logged in:', cred.user)
    })
    .catch((err) => {
        console.log(err.message)
    })
})