//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import { title } from 'process';
import app from '../../index'

let should = chai.should();


chai.use(chaiHttp);

describe('/GET data', () => {
    it('it should GET all the books and magazine', (done) => {
      chai.request(app)
          .get('/data')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
            done();
          });
    });
});

describe('/GET data by isbn', () => {
  it('it should GET exacty one books or magazine', (done) => {
    chai.request(app)
        .get('/dataByIsbn/5554-5545-4518')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              
          done();
        });
  });
});

describe('/GET data by authors', () => {
  it('it should GET all the books or magazine by a particular author', (done) => {
    chai.request(app)
        .get('/dataByAuthor/null-walter@echocat.org')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(6);
              
          done();
        });
  });
});