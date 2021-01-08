class Page {
    constructor(data) {
        this.id = data.id
        this.author = data.author
        this.content = data.content
    }

    renderNumber(num){
        return `
            <h3>Page - ${num}</h3>
        `
    }

    renderAuthor(){
        return `
            <h3>By: ${this.author}</h3>
        `
    }

    renderContent(){
        return `
            <p>${this.content}</p> <hr>
        `
    }
}