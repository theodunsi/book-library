let myLibrary = [];
const cardColors = ["#FCF2A4", "#6CFAD1", "#FFFFFF", "#F7DEFF"];

//Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.color = cardColors[Math.floor(Math.random() * cardColors.length)];;
    this.ID = crypto.randomUUID();
}

//Add book to library
function addBookToLibrary(title, author, pages, read,) {
    myLibrary.push(new Book(title, author, pages, read));
}

const cardsContainer = document.querySelector(".cards-container");

//Display books on page
function display() {
    //Clear cardsContainer before display to prevent duplicates
    cardsContainer.innerHTML = "";

    for (let book of myLibrary) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.backgroundColor = book.color;

        card.dataset.id = book.ID;

        const title = document.createElement("h3");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const read = document.createElement("button")

        title.textContent = book.title;
        author.textContent = "by " + book.author;
        pages.textContent = book.pages + " pages";
        read.textContent = book.read;

        //--Styling UI--
        const titleFlex = document.createElement("div");
        titleFlex.classList.add("title-flex");
        titleFlex.append(title, author, pages);
        read.setAttribute(
            "style", 
            "font-size: 16px; background-color: black; color: white; padding: 10px 24px; border-style:none;"
        );


        //Toggle read status on click
        read.addEventListener("click", () => {
            book.toggleReadStatus();
            read.textContent = book.read;
        });

        //Delete a book from the page
        const removeButton = document.createElement("button");
        removeButton.setAttribute(
            "style", 
            "font-size: 16px; background-color: black; color: red; padding: 10px 24px; border-style:none;"
        );
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            //Get book ID from card
            const id = removeButton.closest('.card').dataset.id;

            //Find and remove book in myLibrary
            myLibrary = myLibrary.filter(book => id !== book.ID);

            display();
        });

        //--Styling UI--
        const buttonsFlex = document.createElement("div");
        buttonsFlex.classList.add("buttons-flex");
        buttonsFlex.append(read, removeButton);

        card.append(titleFlex, buttonsFlex);
        cardsContainer.append(card);
    }
}

const button = document.querySelector(".new-book");
const dialog = document.querySelector(".dialog");

//Toggle read property between read/unread
Book.prototype.toggleReadStatus = function() {
  if (this.read === "Read") {
    this.read = "Unread";
  }
  else { this.read = "Read"; }
}

//Show modal
button.addEventListener("click", () => {
    dialog.showModal();
});

//Submit modal
dialog.addEventListener("submit", () => {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const readStatus = document.querySelector("#read").checked ? "Read" : "Unread";

    addBookToLibrary(title, author, pages, readStatus);

    display();

    const form = document.querySelector("form");
    form.reset();
});

// Closing the dialog
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) { 
        dialog.close();
    }
});