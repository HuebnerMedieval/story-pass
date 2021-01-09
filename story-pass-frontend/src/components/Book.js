class Book {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.pages = data.pages
    }

    bookLink(){
        return `
            <li>
                <a href="#" data-id="${this.id}">${this.title}</a>
            </li>
        `
    }

    renderTitle(){
        return `
            <h1>Title: ${this.title}</h1>
        `
    }

    renderPages() {
        let pageNumber = 1
        this.pages.forEach(page => {
            let newPage = new Page(page)
            let pageDiv = document.createElement('div')
            main.appendChild(pageDiv)

            pageDiv.id = `page-${pageNumber}`
            pageDiv.innerHTML += newPage.renderPage(pageNumber)
            pageNumber += 1
            }
        )
    }


}