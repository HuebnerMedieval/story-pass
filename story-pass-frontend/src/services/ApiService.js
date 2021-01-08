class ApiService {
    constructor(){
        this.baseURL = 'http://localhost:3000'
    }

    fetchBooks () {
//     //clears #main
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
}