
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

//on submission of book form, sends data to backend to create a new book entry in the db
async function createBook (e) {
    e.preventDefault()

    let book = {
        title: e.target.querySelector("#title").value,
        finished: false
    }

    let data = await apiService.fetchCreateBook(book)
    let newBook = new Book(data)
    main.innerHTML = newBook.renderTitle

    displayPageForm(book)


}

//on submission of page form, sends data to backend to create a new page entry in the db
async function createPage (e) {
    e.preventDefault()

    //holds data for the new page to be sent to the backend
    let page = {
        author: e.target.querySelector('#author').value,
        content: e.target.querySelector('#content').value,
        book_id: e.target.querySelector('#book_id').value
    }

    //allows the fetch to send a post request to the backend
    let configObj = {
        method: 'POST',
        body: JSON.stringify(page),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    //sends post request to the backend create_page route
    fetch(BASE_URL + '/pages', configObj)
    .then(resp => resp.json())
    .then(page => {
        
        //removed new page form from #main
        document.querySelector('form').remove()

        //everything below this point is the same as in the displayBook function
        //creates a new div and adds it to the end of #main
        newPage = document.createElement('div')
        main.appendChild(newPage)

        //initializes number
        let number

        //control flow to determine how to number the new page
        if(!!newPage.previousSibling.id){
            number = parseInt(newPage.previousSibling.id.split("-")[1]) + 1
            newPage.id =  `page-${number}`
        }else{
            number = "1"
            newPage.id = `page-${number}`
        }

        //adds the page number to the div
        let pageNumber = document.createElement('h3')
        pageNumber.innerHTML = `Page: ${number}`
        newPage.appendChild(pageNumber)
            
        //adds the author to the div
        let author = document.createElement('h3')
        author.innerHTML = `By: ${page.author}`
        newPage.appendChild(author)

        //adds the content to the div
        let content = document.createElement('p')
        content.innerText = `${page.content}`
        newPage.appendChild(content)

    })

}

function displayPageForm(book){
    let pageForm = document.createElement('form')
    main.appendChild(pageForm)
    pageForm.innerHTML = `
        <form>
            <label>Your Username: </label>
            <input type="text" id="author"><br>
            <label>Content: </label>
            <input type="textarea" id="content">
            <input type="hidden" id="book_id" value="${book.id}"> <br>
            <input type="submit">
        </form>
    `

    document.querySelector('form').addEventListener('submit', createPage)
}

init()