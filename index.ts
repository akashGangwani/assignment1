import express, { Request, Response, Application } from 'express';
import { authorType, bookType, magazineType } from './src/csvtype';
import bodyParser, { json } from 'body-parser';
import { authorData, booksData, magazinesData } from './src/db'
import cors from 'cors';
import fs from 'fs';
import * as csv from 'fast-csv'
import path from 'path';
const app: Application = express();


app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/src/csv')));
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})

app.get('/authors', (req: Request, res: Response) => {
    res.json(authorData);
});

app.get('/books', (req: Request, res: Response) => {
    res.send(booksData);
});

app.get('/magazines', (req: Request, res: Response) => {
    res.send(magazinesData);
});

app.get('/dataByIsbn/:isbn', (req: Request, res: Response) => {
    try {
        let data: (bookType | magazineType)[] = [...booksData, ...magazinesData];
        data = data.filter((element: bookType | magazineType) => {
            if (element.isbn == req.params.isbn) {
                return element;
            }
        })
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json(e);
    }

});
app.get('/dataByAuthor/:author', (req: Request, res: Response) => {
    try {
        let data: (bookType | magazineType)[] = [...booksData, ...magazinesData];
        data = data.filter((element: bookType | magazineType) => {
            if (element.authors.includes(req.params.author)) {
                return element;
            }
        })
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
app.get('/data', (req: Request, res: Response) => {
    let data: (bookType | magazineType)[] = [...booksData, ...magazinesData];
    data = data.sort((element1: bookType | magazineType, element2: bookType | magazineType) => {
        return element1.title.localeCompare(element2.title);
    })
    res.json(data);

});

app.post('/data', (req: Request, res: Response) => {
   
   try{ console.log(req.body);
    if (req.body.type == "book") {

        booksData.push({
            title: req.body.title,
            isbn: req.body.isbn,
            authors: req.body.authors,
            description: req.body.description
        })
        var csvStream = csv.format({headers:true}),
        

        writableStream = fs.createWriteStream(path.join(__dirname,'/src/csv/books.csv'));

        writableStream.on('finish', function(){
            console.log('DONE!');
        res.status(200).sendFile(path.join(__dirname,"/src/csv/books.csv"))
        });

        csvStream.pipe(writableStream);
        booksData.forEach(d=>{
            csvStream.write(d)
        })
       
        csvStream.end();
      
    }
    else {
        console.log(req.body);
        magazinesData.push({
            title: req.body.title,
            isbn: req.body.isbn,
            authors: req.body.authors,
            publishedAt: req.body.publishedAt
        })
        var csvStream = csv.format({headers:true}),
        

        writableStream = fs.createWriteStream(path.join(__dirname,'./src/csv/magazine.csv'));

        writableStream.on('finish', function(){
            console.log('DONE!');
            
        res.status(200).sendFile(path.join(__dirname,'./srccsv/magazine.csv'))
        });

        csvStream.pipe(writableStream);
        magazinesData.forEach(d=>{
            csvStream.write(d)
        })
       
        csvStream.end();
    }
   
   }
   catch(e){
    console.log(e);
    res.status(500).send(e);
   }

});


app.listen(80, () => {
    console.log('Started at port 80');
})

export default app;