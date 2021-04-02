// instantiates the apiService as a constant for use in the file
const apiService = new ApiService()

// grabs #main from the document and saves it as a variable
let main = document.getElementById('main')

// initiator function to set up the page
const init = () => {
    bindEventListeners()
    renderBooks()
}

// places event listeners on the book list and form
function bindEventListeners() { 
    // gets #book-list and listens for a click, at which point it calls renderBooks()
    document.getElementById('book-list').addEventListener("click", renderBooks)
    // gets #book-form and listens for a click, at which point it calls bookForm()
    document.getElementById('book-form').addEventListener("click", bookForm)

}

// renders the full list of books to the DOM
async function renderBooks() {
    // clears #main
    main.innerHTML = ""
    // sets a variable to the JSON of the full list of books
    const books = await apiService.fetchBooks()
    // iterates through books, creating new Books for each and adding them to #main
    books.forEach(book => {
        const newBook = new Book(book)
        main.innerHTML += newBook.bookLink()
    })

    // adds event listeners to each book title
    attachClicksToBooks()

}

// adds event listeners to each book
function attachClicksToBooks() {
    // selects all <li>'s on the page and saves them as a variable
    let books = document.querySelectorAll("li a")
    // iterates through the books and adds listeners to each for a click. On click, displays that book
    books.forEach(book => {
        book.addEventListener('click', displayBook)
    })

}

// displays the desired book to the DOM
async function displayBook(e) {

    // clears #main
    main.innerHTML = ""
    // gets the id from the dataset of the target of the click
    let id = e.target.dataset.id

    // fetches the JSON for the desired book and saves it
    const data = await apiService.fetchBook(id)

    // instantiates a new Book based on the JSON
    const book = new Book(data)
    
    // renders the title of the book in #main
    main.innerHTML = book.renderTitle()
    // renders the pages of the book
    book.renderPages()

    // places the new page form on the bottom of the page
    displayPageForm(book)    

}

// form for creating new books
const bookForm = () => {
    let form = `
        <form>
            <label>Title: </label>
            <input type="text" id="title">
            <input type="submit">
        </form>
    `
    // replaces the content of #main with the form
    main.innerHTML = form

    // adds listener to the form in case of submit
    document.querySelector('form').addEventListener('submit', createBook)

}

// on book form submit, adds a new book to the database
async function createBook (e) {
    // prevents the form from sending a Post request
    e.preventDefault()

    // saves the form data
    let book = {
        title: e.target.querySelector("#title").value,
    }

    // sends a fetch request to create a new book and saves that's book data
    let data = await apiService.fetchCreateBook(book)
    // instantiates a new book from the return of the fetch request
    const newBook = new Book(data)
    // sets #main equal to the title of the book
    main.innerHTML = newBook.renderTitle()

    // places the form for a new page on the DOM
    displayPageForm(newBook)


}

// on page form submit, adds a new page to the database
async function createPage (e) {
    // prevents the form from sending a Post request
    e.preventDefault()

    // saves the form data
    let page = {
        author: e.target.querySelector('#author').value,
        content: e.target.querySelector('#content').value,
        book_id: e.target.querySelector('#book_id').value
    }

    // sends a fetch request to create a new page in the database
    let data = await apiService.fetchCreatePage(page)
    
    // instantiates a new Page based on JSON from the fetch
    let newPage = new Page(data)

    // removed the page form from the DOM
    document.querySelector('form').remove()

    // creates a new <div> and places it in #main
    let pageDiv = document.createElement('div')
    main.appendChild(pageDiv)

    // declares pageNumber as a variable
    let pageNumber
    // checks whether the previous div is a page, and then assigns a pagenumber to the new pages
    if(pageDiv.previousElementSibling.id.split("-")[0] == "page"){
        pageNumber = parseInt(pageDiv.previousElementSibling.id.split("-")[1]) + 1
    }else{
        pageNumber = 1
    }
    pageDiv.id = `page-${pageNumber}`
    // renders the page information for the new page in the new <div>
    pageDiv.innerHTML += newPage.renderPage(pageNumber)
    
    // message to the user explaining why they cannot add more pages
    let thanks = `
        <div id="thanks">
            <h5>What's Next?</h5>
            <p>Thank you for your addition. Now let someone else continue the story!</p>
        </div>
    `
    // adds the message to #main
    main.innerHTML += thanks
    // sets the message's color to blue
    document.getElementById("thanks").style.color = "blue"
    
}

// new page form
function displayPageForm(book) {
    let form = `
        <form>
            <label>Your Username: </label>
            <input type="text" id="author"><br>
            <label>Content: </label>
            <textarea rows="4" cols="50" id="content"> </textarea>
            <input type="hidden" id="book_id" value="${book.id}"> <br>
            <input type="submit">
        </form>
    `
    // adds the form to the bottom of #main
    main.innerHTML += form

    let content = document.getElementById('content')

    // adds lister to the form, creating a page on submit
    document.querySelector('form').addEventListener('submit', createPage)
}

// initializes the page
init()