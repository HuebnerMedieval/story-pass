class Page {
    // instantiates a new Page, taking in an object and setting the values to the properties of the Page
    constructor(data) {
        this.id = data.id
        this.author = data.author
        this.content = data.content
    }

    // takes in the page number and returns HTML displaying information about the Page
    renderPage(num){
        return `
        <h3>Page - ${num}</h3>
        <h3>By: ${this.author}</h3>
        <p>${this.content}</p>
        <hr>
        `
    }
}