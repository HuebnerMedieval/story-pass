const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    getBooks()
})

const getBooks = () => {
    let bookshelf = document.getElementById('bookshelf')
    bookshelf.innerHTML = ""
    fetch(BASE_URL + '/books')
    .then(res => res.json())
    .then(books => {
        books.map(book => {
            bookshelf.innerHTML += `
            <li>
                <a href="#" data-id="${book.id}">${book.title}</a>
                - ${book.finished ? "Finished" : "Work in Progress"}
            </li>
            `
        })
        attachClicksToLinks()
    })
}

function attachClicksToLinks() {
    let books = document.querySelectorAll("li a")
    books.forEach(book => {
        book.addEventListener('click', displayBook)
    })
}

function displayBook(e) {
    let id = e.target.dataset.id

    let bookshelf = document.getElementById('bookshelf')
    bookshelf.innerHTML = ""

    fetch(BASE_URL + `/books/${id}`)

}