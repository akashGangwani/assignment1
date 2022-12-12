import * as fs from 'fs';
import * as csv from 'fast-csv'
import { authorType,bookType,magazineType } from './csvtype';

//defining an array to store the data
const authorData:authorType[]=[];

//creating a read stream to read authors.csv data separated by ; and excluding the headers
fs.createReadStream('./data/authors.csv')
.pipe(csv.parse({ headers: true,delimiter: ';' }))
.on('error', error => console.error(error))
.on('data', row => authorData.push(row))
.on('end', () => console.log('done'));


//defining an array to store the data
const booksData:bookType[]=[];

//creating a read stream to read authors.csv data separated by ; and excluding the headers
fs.createReadStream('./data/books.csv')
.pipe(csv.parse({ headers: true,delimiter: ';' }))
.on('error', error => console.error(error))
.on('data', row => booksData.push(row))
.on('end', () => console.log('done'));


//defining an array to store the data
const magazinesData:magazineType[]=[];

//creating a read stream to read authors.csv data separated by ; and excluding the headers
fs.createReadStream('./data/magazines.csv')
.pipe(csv.parse({ headers: true,delimiter: ';' }))
.on('error', error => console.error(error))
.on('data', row => magazinesData.push(row))
.on('end', () => console.log('done'));




export {authorData,booksData,magazinesData};