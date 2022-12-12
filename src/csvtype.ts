//defining type of authorData as an interface
interface magazineType{
    title: string,
    isbn: string,
    authors: string,
    publishedAt: string
}


//defining type of authorData as an interface
interface bookType{
    title: string,
    isbn: string,
    authors: string,
    description:string
}

//defining type of authorData as an interface
interface authorType{
    email: string,
    firstname: string,
    lastname: string
}

export {authorType,bookType,magazineType}; 