class Book {
    // initializes new Books by taking in an object, and sets the values as the properties for the new Book
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.pages = data.pages
    }

    // returns the title of the book as a link in an <li> that leads nowhere
    bookLink(){
        return `
            <li>
                <a href="#" data-id="${this.id}">${this.title}</a>
            </li>
        `
    }

    // returns an <h1> with the title of the book
    renderTitle(){
        return `
            <h1>Title: ${this.title}</h1>
        `
    }

    // prints the pages of the book in order with page numbers
    renderPages() {
        // initializes the page counr
        let pageNumber = 1

        // iterates through the pages of the book and prints them
        this.pages.forEach(page => {
            // instantiages a new Page
            let newPage = new Page(page)

            // creates a <div> 
            let pageDiv = document.createElement('div')

            // appends the new <div> to main
            main.appendChild(pageDiv)

            // sets the new <div>'s id to the page number
            pageDiv.id = `page-${pageNumber}`

            // adds the new Page's details to the new <div>, passing in the number so the Page knows
            pageDiv.innerHTML += newPage.renderPage(pageNumber)

            // sets the pageNumber to pageNumber + 1 for the next iteration
            pageNumber += 1
            }
        )
    }


}