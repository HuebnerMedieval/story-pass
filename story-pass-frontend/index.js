const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    getBooks()

    document.getElementById('book-list').addEventListener("click", getBooks)

    document.getElementById('book-form').addEventListener("click", bookForm)

})




const getBooks = () => {
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + '/books')
    .then(resp => resp.json())
    .then(books => {
        books.map(book => {
            main.innerHTML += `
            <li>
                <a href="#" data-id="${book.id}">${book.title}</a>
                - ${book.finished ? "Finished" : "Work in Progress"}
            </li>
            `
        })
        attachClicksToBooks()
    })
}

function attachClicksToBooks() {
    let books = document.querySelectorAll("li a")
    books.forEach(book => {
        book.addEventListener('click', displayBook)
    })

}

function displayBook(e) {
    let id = e.target.dataset.id

    let main = document.getElementById('main')
    main.innerHTML = ""

    fetch(BASE_URL + `/books/${id}`)
    .then(resp => resp.json())
    .then(book => {
        main.innerHTML = `
        <h3>Title: ${book.title}</h3>
        `

        book.pages.forEach(function callback(page, index){
            let pageNumber = document.createElement('h3')
            pageNumber.innerHTML = `Page: ${index + 1}`
            main.appendChild(pageNumber)
            
            let author = document.createElement('h3')
            author.innerHTML = `By: ${page.author}`
            main.appendChild(author)

            let content = document.createElement('p')
            content.innerText = `${page.content}`
            main.appendChild(content)
        })

        
    })

}

const bookForm = () => {
    let main = document.getElementById('main')
    
    let form = `
        <form>
            <label>Title: </label>
            <input type="text" id="title">
            <input type="submit">
        </form>
    `
    
    main.innerHTML = form

    document.querySelector('form').addEventListener('submit', createBook)

}

const createBook = (e) => {
    e.preventDefault()
    let book = {
        title: e.target.querySelector("#title").value,
        finished: false
    }

    let configObj = {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    fetch(BASE_URL + '/books', configObj)
    .then(resp => resp.json())
    .then(book => {
        main.innerHTML = `
        <h3>Title: ${book.title}</h3>
        `
    })


}

