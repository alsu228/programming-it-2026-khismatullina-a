class LibraryItem {
  #title;
  #author;
  #year;
  #isAvailable;

  constructor(title, author, year) {
    this.#title = title;
    this.#author = author;
    this.#year = year;
    this.#isAvailable = true;
  }
  getInfo() {
    return `${this.#title} by ${this.#author} (${this.#year})`;
  }
  getType() {
    return "LibraryItem";
  }
  getAvailability() {
    return this.#isAvailable;
  }
  asyncCheckout() {
    console.log(`${this.getType()}: checking out "${this.#title}"...`);
    setTimeout(() => {
      if (this.getAvailability()) {
        this.#isAvailable = false;
        console.log(`Checked out: ${this.getInfo()}`);
      } else {
        console.log(`Already checked out: ${this.getInfo()}`);
      }
    }, 1000);
  }
  toggleAvailability() {
    this.#isAvailable = !this.#isAvailable;
  }
}

class Book extends LibraryItem {
  constructor(title, author, year, isnumber) {
    super(title, author, year);
    this.isnumber = isnumber;
  }
  getInfo() {
    return `${super.getInfo()} [ISNUMBER: ${this.isnumber}]`;
  }
  getType() {
    return "Book";
  }
}

class Magazine extends LibraryItem {
  constructor(title, author, year, issue) {
    super(title, author, year);
    this.issue = issue;
  }
  getInfo() {
    return `${super.getInfo()} | Issue: ${this.issue}`;
  }
  getType() {
    return "Magazine";
  }
}

class Newspaper extends LibraryItem {
  constructor(title, edition, date) {
    super(title, "SWAGA", date);
    this.edition = edition;
  }
  getInfo() {
  return `${super.getInfo()} — ${this.edition}`;
  }
  getType() {
    return "Newspaper";
  }
}

const library = [
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925, "978-1234567890"),
  new Magazine("National Geographic", "Various Authors", 2024, "July 2024"),
  new Newspaper("Daily Chronicle", "SWAGA", "April 16, 2026"),
];

console.log();
library.forEach(item => console.log(item.getInfo()));
console.log();
console.log();
library.forEach(item => item.asyncCheckout());