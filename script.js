const bookList = document.getElementById("bookList");
const addBookBtn = document.getElementById("addBookBtn");
const searchInput = document.getElementById("searchInput");
const filterYear = document.getElementById("filterYear");

let books = JSON.parse(localStorage.getItem("books")) || [];

function renderBooks(filtered = books) {
  bookList.innerHTML = "";
  const uniqueYears = [...new Set(books.map(b => b.year))].sort();
  filterYear.innerHTML = '<option value="">Filter by Year</option>' + 
    uniqueYears.map(y => `<option value="${y}">${y}</option>`).join("");

  filtered.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td><button class="delete-btn" onclick="deleteBook(${index})">Delete</button></td>
    `;
    bookList.appendChild(row);
  });
}

function addBook() {
  const title = document.getElementById("bookTitle").value.trim();
  const author = document.getElementById("bookAuthor").value.trim();
  const year = document.getElementById("bookYear").value.trim();

  if (!title || !author || !year) {
    alert("Please fill all fields 📘");
    return;
  }

  const newBook = { title, author, year };
  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();

  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("bookYear").value = "";
}

function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  const filtered = books.filter(
    b => b.title.toLowerCase().includes(q) || 
         b.author.toLowerCase().includes(q) || 
         b.year.toString().includes(q)
  );
  renderBooks(filtered);
});

filterYear.addEventListener("change", (e) => {
  const year = e.target.value;
  renderBooks(year ? books.filter(b => b.year === year) : books);
});

addBookBtn.addEventListener("click", addBook);

renderBooks();
