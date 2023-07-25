let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.info = () => {
    if (isRead) {
      return `${this.title} was released by ${this.author}, ${this.pages} pages, has been read`
    }
    return `${this.title} was released by ${this.author}, ${this.pages} pages, not read yet`
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  myLibrary.push(new Book(title, author, pages, isRead));
}

function createRemoveBookBtn() {
  const removeBookBtn = document.createElement("button");
  removeBookBtn.textContent = "✖";
  removeBookBtn.classList.add("remove-book-btn");
  return removeBookBtn;
}

function removeBook(removeBookBtns) {
  removeBookBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.parentElement;
      const bookIndex = card.getAttribute("data-book-index");
      myLibrary.splice(parseInt(bookIndex));
      card.remove();
    })
  })
}

function displayBooks(container, removeBookBtns, readBtns) {

  // reload all the books card container
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }

  while (removeBookBtns.length > 0) {
    removeBookBtns.pop();
  }

  while (readBtns.length > 0) {
    readBtns.pop();
  }

  for (let i = 0; i < myLibrary.length; i++) {
    const card = document.createElement("div");
    card.classList.add("cards");
    card.setAttribute("data-book-index", i);

    const title = document.createElement("h2");
    title.textContent = myLibrary[i].title;
    card.appendChild(title);

    const author = document.createElement("small");
    author.classList.add("author-field");

    if (myLibrary[i].author) {
      author.innerHTML = `by <span>${myLibrary[i].author}</span>`;
    } else {
      author.innerHTML = `by <span> unknown</span>`;
    }
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.innerHTML = `<span>${myLibrary[i].pages}</span> pages`;
    card.appendChild(pages);

    const readBtn = document.createElement("button");

    // display a button depending on the book isRead property
    if (myLibrary[i].isRead) {
      readBtn.classList.add("read-btn");
      readBtn.textContent = "read ✔";
    } else {
      readBtn.classList.add("not-read-btn");
      readBtn.textContent = "not read ✖";
    }

    card.appendChild(readBtn);
    readBtns.push(readBtn);


    const removeBookBtn = createRemoveBookBtn();
    removeBookBtns.push(removeBookBtn);
    card.appendChild(removeBookBtn);

    container.appendChild(card);
  }
}

function toggleBookReadStatus(readBtns) {
  readBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.parentElement;
      const selectedBook = myLibrary[card.getAttribute("data-book-index")];

      if (btn.classList.contains("not-read-btn")) {
        selectedBook.isRead = true;
        btn.classList.remove("not-read-btn");
        btn.classList.add("read-btn");
        btn.textContent = "read ✔";

      } else {
        selectedBook.isRead = false;
        btn.classList.remove("read-btn");
        btn.classList.add("not-read-btn");
        btn.textContent = "not read ✖";
      }
    })
  })
}

window.addEventListener("DOMContentLoaded", () => {
  let removeBookBtns = [];
  let readBtns = [];

  const container = document.querySelector(".books-container");
  displayBooks(container, removeBookBtns, readBtns);

  const newBookFormBtn = document.querySelector(".new-book-btn");
  const closeFormBtn = document.querySelector(".close-form-btn");
  const addBookFormBtn = document.querySelector(".add-book-form-btn");
  const form = document.querySelector(".form-container");

  removeBook(removeBookBtns);
  toggleBookReadStatus(readBtns);

  newBookFormBtn.addEventListener("click", () => {
    form.style.display = "block";
  })

  closeFormBtn.addEventListener("click", () => {
    form.style.display = "none";
  })

  addBookFormBtn.addEventListener("click", e => {
    if (form.checkValidity()) {
      e.preventDefault();
      const title = form.querySelector(".input-title > input").value;
      const author = form.querySelector(".input-author > input").value;
      const pages = form.querySelector(".input-pages > input").value;
      const isRead = form.querySelector(".input-is-read > input");

      addBookToLibrary(title, author, pages, isRead.checked);
      form.style.display = "none";
      displayBooks(container, removeBookBtns, readBtns);

      removeBook(removeBookBtns);
      toggleBookReadStatus(readBtns);
    }
  })

})

addBookToLibrary("Jujutsu Kaisen", "Gege Akutami", "1237", true);
addBookToLibrary("Kimetsu no yaiba", "Koyoharu Gotōge", "2634", false);
addBookToLibrary("One Piece", "Eiichirō Oda", "5609", false);