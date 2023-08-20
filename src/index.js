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
    where
} from 'firebase/firestore'

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
        author: addBookFrom.author.value
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
const q = query(colRef, where("author", "==", "patrick"))

onSnapshot(q, (snapshot) => {
    let books = '<ul>'
    snapshot.docs.forEach((doc) => {
        books += `<li><b>Author</b>: ${doc.data().author}, <b>Title</b>: ${doc.data().title}, <b>ID</b>: ${doc.id} </li>`
    })
    books += '</ul>'
    console.log({books})
    console.log(books)
})