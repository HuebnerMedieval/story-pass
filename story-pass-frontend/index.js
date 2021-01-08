//sets constant to localhost:300 for easy repeated use
const BASE_URL = 'http://localhost:3000'

//startup routine
window.addEventListener("DOMContentLoaded", () => {
    //prints the list of books on screen
    getBooks()

    //sets up story list link 
    document.getElementById('book-list').addEventListener("click", getBooks)

    //sets up new book form link
    document.getElementById('book-form').addEventListener("click", bookForm)

})

//function to generate a list of books in #main
const getBooks = () => {
    //clears #main
    let main = document.getElementById('main')
    main.innerHTML = ""

    //call to backend for the book index json
    fetch(BASE_URL + '/books')
    .then(resp => resp.json())
    .then(books => {
        
        //iterates through the array of books and adds a link to #main and adds the id to the dataset
        books.map(book => {
            main.innerHTML += `
            <li>
                <a href="#" data-id="${book.id}">${book.title}</a>
            </li>
            `
        })

        attachClicksToBooks()
    })
}

//adds event listeners to newly generated links
function attachClicksToBooks() {
    let books = document.querySelectorAll("li a")
    books.forEach(book => {
        book.addEventListener('click', displayBook)
    })

}

//callback function for a click on a book title
function displayBook(e) {
    //grabs id of the book from the dataset
    let id = e.target.dataset.id

    //clears #main
    let main = document.getElementById('main')
    main.innerHTML = ""

    //call to backend for the book show page json
    fetch(BASE_URL + `/books/${id}`)
    .then(resp => resp.json())
    .then(book => {
        
        //adds book title to the top of #main
        main.innerHTML = `
            <h3>Title: ${book.title}</h3>
        `

        //iterates through the nested json pages of the book
        book.pages.forEach(function callback(page, index){
            //creates a new div with #page-number
            newPage = document.createElement('div')
            newPage.id =  `page-${index+1}`
            main.appendChild(newPage)

            //prints the page number at the top of the div
            let pageNumber = document.createElement('h3')
            pageNumber.innerHTML = `Page: ${index + 1}`
            newPage.appendChild(pageNumber)
            
            //attached the author to the div
            let author = document.createElement('h3')
            author.innerHTML = `By: ${page.author}`
            newPage.appendChild(author)

            //attaches the content to the div
            let content = document.createElement('p')
            content.innerText = `${page.content}`
            newPage.appendChild(content)
        })

        //adds the new page form after the last page is displayed
        //same as below create a new function as addForm
        let pageForm = document.createElement('form')
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
        main.appendChild(pageForm)

        //adds event listener to the new page form to create a new form
        document.querySelector('form').addEventListener('submit', createPage)
        //end of same content

    })

}

//replaces the innerHTML on #main with the new book form
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

    //adds event listener to the form to create a new book on submit
    document.querySelector('form').addEventListener('submit', createBook)

}

//on submission of book form, sends data to backend to create a new book entry in the db
const createBook = (e) => {
    e.preventDefault()

    //has of the data for the new book
    //be replaced by javascript object?
    let book = {
        title: e.target.querySelector("#title").value,
        finished: false
    }

    //allows the fetch to send a post request to the backend
    let configObj = {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    //post request to the backend sent to create_book route
    fetch(BASE_URL + '/books', configObj)
    .then(resp => resp.json())
    .then(book => {
        
        //replaces the content of #main with the title of the book
        main.innerHTML = `
        <h1>Title: ${book.title}</h3>
        `

        //adds a new page form to the end of #main
        //same as above create a new function as addForm
        let pageForm = document.createElement('form')
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
        main.appendChild(pageForm)

        //adds event listenert to the form to create a new page
        document.querySelector('form').addEventListener('submit', createPage)
        //end of same content


    })


}

//on submission of page form, sends data to backend to create a new page entry in the db
const createPage = (e) => {
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