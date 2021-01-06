const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    getBooks()
})

const getBooks = () => {
    let bookshelf = document.getElementById('bookshelf')
    fetch(BASE_URL + '/books')
    .then(res => res.json())
    .then(books => {
        console.log(books)
    })
}