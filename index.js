//susikuriu savo serveri
const express = require('express');
const app = express();

//duomenys bus gaunami, perduodami json formatu
app.use(express.json());

//masyvas
const books = [
    {id: 1, title: "Dorian Grey", description: "Scary and mesmerizing"},
    {id: 2, title: "Steppen Wolf", description: "Fascinating and curious"},
    {id: 3, title: "The stranger", description: "Inspiring and questioning"},
]

//konkrecio daigto paieska
//req yra daigto id
//res aprasome patys
app.get('/api/books/:id', (req, res) => {
    const myBook = books.find(book => book.id === parseInt(req.params.id));
    if(!myBook) res.status(404).send("not found");
    res.send(myBook);
});

//naujos daigto pridejimas, irasymas
//be patikrinimu ar netuscia reiksme
//ce nereik skaicio po sleso
app.post('/api/books', (req, res) => {
    const book = {
        id: books.length +1,
        title: req.body.title,
        description: req.body.tittle
    };

    books.push(book);
    res.send(books);
});

//esamos prekes atnauijinimas
app.put('/api/books/:id', (req, res)=>{
    const myBook = books.find(book => book.id === parseInt(req.params.id));
    if(!myBook) res.status(404).send("not found");

    myBook.tittle = req.body.title;
    res.send(myBook);
});

//esamos prekes trynimas, pasalinimas
app.delete('/api/books/:id', (req, res)=>{
    const myBook = books.find(book => book.id === parseInt(req.params.id));
    if(!myBook) res.status(404).send("not found");

    const bookIndex = books.indexOf(myBook);
    books.splice(bookIndex, 1);

    res.send(myBook)
});


/////////////

//importnat!!! nsukurti route
app.get('/api/books', (req, res) => {
    res.send(books);
});

//apsirasome porta ant kurio veiks sereveris
const PORT = 5001;

//important!!!!!!!!!!1
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
});

