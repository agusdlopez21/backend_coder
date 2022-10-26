class User {
    constructor({name = "", lastName = "", books = [], pets = []}) {
        this.name = name,
        this.lastName = lastName,
        this.books = [...books],
        this.pets = [...pets]
    }
    getFullName () {
        return `${this.name} ${this.lastName}`;
    }
    addPets (petsName) {
        this.pets.push(petsName)
    }
    countPets() {
       return this.pets.length;
    }
    addBook (nameBook, author) {
        this.books.push ( {nameBook, author} )
    }
    getBooksNames () {
        return this.books.map(books => books.nameBook)
    }
}

const userObject = {
    name: "Agustin",
    lastName: "Lopez",
    books: [
        {nameBook:"Strange Case of Dr Jekyll and Mr Hyde", author:"Robert Louis Stevenson"},
        {nameBook:"The Great Gatsby", author:"F. Scott Fitzgerald"}
    ],
    pets: ["Dog", "Cat"]
}

const myUser = new User(userObject);

console.log("Clase Usuario instanciada con los siguientes valores: ");
console.log(JSON.stringify(userObject, null, 2));

console.log("Se ejecutan los métodos \n");
console.log("Metodo GetFullName: ", myUser.getFullName());
console.log("Metodo addMascota: 'Cuy'", myUser.addPets("cuy"));
console.log("Metodo countMascota: ", myUser.countPets());
console.log(
  "Metodo addBook: Nombre: Mr Mercedes, Autor: Stephen King",
  myUser.addBook("Mr Mercedes", "Stephen King")
);
console.log("Metodo getBookNames", myUser.getBooksNames());