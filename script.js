const myLibrary = []

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggleRead = function(){
    this.read = this.read === 'Read' ? 'Not Read' : 'Read'
    displayBooks()
}

function toggleBookRead(id) {
    const book = myLibrary.find(book => book.id === id)
    if (book) {
        book.toggleRead()
    }
}

function addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
    displayBooks()
}

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id)
    if (index !== -1) {
        myLibrary.splice(index, 1)
        displayBooks()
    }
}

function displayBooks() {
    const libraryDiv = document.querySelector('#library')
    libraryDiv.innerHTML = ''

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div')

        bookCard.innerHTML = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">${book.author}</h6>
              <h6 class="card-subtitle mb-2 text-body-secondary">${book.pages}</h6>
              <h6 class="card-subtitle mb-2 text-body-secondary">${book.read}</h6>
              <a href="#" class="card-link remove-btn">Remove</a>
              <a href="#" class="card-link toggle-read-btn">toggle Read</a>
            </div>
        </div>`;

        libraryDiv.appendChild(bookCard)

        const removeBtn = bookCard.querySelector('.remove-btn')
        removeBtn.addEventListener('click', () => removeBook(book.id));
    
        const toggleReadBtn = bookCard.querySelector('.toggle-read-btn')
        toggleReadBtn.addEventListener('click', () => toggleBookRead(book.id));
    })
}

const newBookBtn = document.getElementById('new-book-btn')
const bookForm = document.querySelector('#form-Container')

newBookBtn.addEventListener('click', () => {
    bookForm.style.display = bookForm.style.display === 'flex' ? 'none' : 'flex'
})

bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.querySelector('input[name="btnradio"]:checked').value

    addBook(title, author, pages, read)

    bookForm.reset()
    bookForm.style.display = 'none'
})

addBook('The Hobbit', 'J.R.R. Tolkien', 295, 'Read')
addBook('The Lord of the Rings', 'J.R.R. Tolkien', 1178, 'Not Read')