class ApiService {
    constructor(){
        this.baseURL = 'http://localhost:3000'
    }

    async fetchBooks () {
        let resp = await fetch(this.baseURL + '/books')
        let data = await resp.json()
        return data

    }

    async fetchBook(id){
        let resp = await fetch(this.baseURL + `/books/${id}`)
        let data = await resp.json()
        return data
    }

    async fetchCreateBook(bookData){
        let configObj = {
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let resp = await fetch(this.baseURL + `/books`, configObj)
        let data = await resp.json()

        return data

    }

    async fetchCreatePage(pageData){
        let configObj = {
            method: 'POST',
            body: JSON.stringify(pageData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let resp = await fetch(this.baseURL + '/pages', configObj)
        let data = await resp.json()

        return data
    }


}