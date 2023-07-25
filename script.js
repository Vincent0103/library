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

function displayBooks(container, removeBookBtns) {
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }

  while (removeBookBtns.length > 0) {
    removeBookBtns.pop();
  }

  for (let i = 0; i < myLibrary.length; i++) {
    const card = document.createElement("div");
    card.classList.add("cards");
    card.setAttribute("data-book-index", i);

    const title = document.createElement("h2");
    title.textContent = myLibrary[i].title;
    card.appendChild(title);

    const author = document.createElement("small");
    author.innerHTML = `by <span>${myLibrary[i].author}</span>`;
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.innerHTML = `<span>${myLibrary[i].pages}</span> pages`;
    card.appendChild(pages);

    // display a svg image depending on the book isRead property
    if (myLibrary[i].isRead) {
      card.innerHTML += "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M9.47 9.65L8.06 11.07L11 14L16.19 8.82L14.78 7.4L11 11.18M17 3H7C5.9 3 5 3.9 5 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3M17 18L12 15.82L7 18V5H17Z\" /></svg>";
    } else {
      card.innerHTML += "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M9,11V9H15V11H9M19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17C18.11,3 19,3.9 19,5M17,5H7V18L12,15.82L17,18V5Z\" /></svg>"
    }

    const removeBookBtn = createRemoveBookBtn();
    removeBookBtns.push(removeBookBtn);
    card.appendChild(removeBookBtn);

    container.appendChild(card);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let removeBookBtns = [];
  const container = document.querySelector(".books-container");
  displayBooks(container, removeBookBtns);

  console.log(removeBookBtns);
  const newBookFormBtn = document.querySelector(".new-book-btn");
  const closeFormBtn = document.querySelector(".close-form-btn");
  const addBookFormBtn = document.querySelector(".add-book-form-btn");
  const form = document.querySelector(".form-container");

  removeBook(removeBookBtns);

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
      displayBooks(container, removeBookBtns);
      console.log(removeBookBtns);
      removeBook(removeBookBtns);
    }
  })


})
addBookToLibrary("Jujutsu Kaisen", "Gege Akutami", "1k+", false);