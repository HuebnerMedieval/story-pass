class ApiService {
    // sets the default URL for API calls
    constructor(){
        this.baseURL = 'http://localhost:3000'
    }

    // fetches book data from the backend
    async fetchBooks () {
        // creates a promise object, resp, which holds the return from the fetch request to the Book index route
        let resp = await fetch(this.baseURL + '/books')
        // converts resp into JSON and returns that JSON
        let data = await resp.json()
        return data

    }

    // takes a book id and fetches that book's data from the backend
    async fetchBook(id){
        // creates a promise object, resp, which holds the return from the fetch request to the Book show route
        let resp = await fetch(this.baseURL + `/books/${id}`)
        // converts resp into JSON and returns that JSON
        let data = await resp.json()
        return data
    }

    // sets a Post request to the backend to create a new book
    async fetchCreateBook(bookData){
        // configuration object so fetch can send the post request
        let configObj = {
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        // fetch request with the configObj as a second argument to send the post request
        let resp = await fetch(this.baseURL + `/books`, configObj)
        // converts the response into JSON and returns that JSON
        let data = await resp.json()

        return data

    }

    // sets a Post request to the backend to create a new page
    async fetchCreatePage(pageData){
        // configuration object so fetch can send the post request
        let configObj = {
            method: 'POST',
            body: JSON.stringify(pageData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        // fetch request with the configObj as a second argument to send the post request
        let resp = await fetch(this.baseURL + '/pages', configObj)
        // converts the response into JSON and returns that JSON
        let data = await resp.json()

        return data
    }


}