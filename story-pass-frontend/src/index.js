
const apiService = new ApiService()

let main = document.getElementById('main')

const init = () => {
    bindEventListeners()
    renderBooks()
}

function bindEventListeners() { 
    document.getElementById('book-list').addEventListener("click", renderBooks)

    document.getElementById('book-form').addEventListener("click", bookForm)
}

async function renderBooks() {
    main.innerHTML = ""
    const books = await apiService.fetchBooks()
    books.forEach(book => {
        const newBook = new Book(book)
        main.innerHTML += newBook.bookLink()
    })

    attachClicksToBooks()

}

function attachClicksToBooks() {
    let books = document.querySelectorAll("li a")
    books.forEach(book => {
        book.addEventListener('click', displayBook)
    })

}

async function displayBook(e) {

    main.innerHTML = ""
    let id = e.target.dataset.id

    const data = await apiService.fetchBook(id)

    const book = new Book(data)
    
    main.innerHTML = book.renderTitle()
    book.renderPages()

    displayPageForm(book)    

}

const bookForm = () => {
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

async function createBook (e) {
    e.preventDefault()

    let book = {
        title: e.target.querySelector("#title").value,
    }

    let data = await apiService.fetchCreateBook(book)
    const newBook = new Book(data)
    main.innerHTML = newBook.renderTitle()

    displayPageForm(newBook)


}

async function createPage (e) {
    e.preventDefault()

    let page = {
        author: e.target.querySelector('#author').value,
        content: e.target.querySelector('#content').value,
        book_id: e.target.querySelector('#book_id').value
    }

    let data = await apiService.fetchCreatePage(page)
    
    let newPage = new Page(data)

    document.querySelector('form').remove()

    let pageDiv = document.createElement('div')
    main.appendChild(pageDiv)

    let pageNumber
    if(!!pageDiv.previousElementSibling){
        pageNumber = parseInt(pageDiv.previousElementSibling.id.split("-")[1]) + 1
    }else{
        pageNumber = 1
    }
    pageDiv.id = pageNumber
    pageDiv.innerHTML += newPage.renderPage(pageNumber)
    
    let thanks = `
        <h5>What's Next?</h5>
        <p>Thank you for your addition. Now let someone else continue the story!</p>
    `
    main.innerHTML += thanks
    
}

function displayPageForm(book) {
    let form = `
        <form>
            <label>Your Username: </label>
            <input type="text" id="author"><br>
            <label>Content: </label>
            <input type="textarea" id="content">
            <input type="hidden" id="book_id" value="${book.id}"> <br>
            <input type="submit">
        </form>
    `
    main.innerHTML += form


    document.querySelector('form').addEventListener('submit', createPage)
}

init()