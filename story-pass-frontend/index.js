const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    getBooks()
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


