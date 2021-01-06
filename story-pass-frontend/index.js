const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    getBooks()
})

const getBooks = () => {
    let bookshelf = document.getElementById('bookshelf')
    fetch(BASE_URL + '/books')
    .then(res => res.json())
    .then(books => books.map(book => {
        bookshelf.innerHTML += `
        <li>
            <a href="#" data-id="${book.id}">${book.title}</a>
            - ${book.finished ? "Finished" : "Work in Progress"}
        </li>
        `
    }).join("")
    )
}
