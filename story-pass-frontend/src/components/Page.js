class Page {
    constructor(data) {
        this.id = data.id
        this.author = data.author
        this.content = data.content
    }

    renderPage(num){
        return `
        <h3>Page - ${num}</h3>
        <h3>By: ${this.author}</h3>
        <p>${this.content}</p>
        <hr>
        `
    }
}