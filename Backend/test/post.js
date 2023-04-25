const chai = require("chai");
const chaihttp = require("chai-http");
const server = require("../app.js");
const { Kategoria, Kirja, Nide } = require("../models/kirja.js");
const assert = require('assert');
const mongoose = require('mongoose');


chai.should();
chai.use(chaihttp);

describe("Posts Api", () => {

    //Test Get
    describe("GET All POSTS", () => {
        it("It should return all list of posts", (done) => {
            chai.request(server)
                .get("/api/kirjat")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.should.have.property('status');                    
                    done();
                })
        })
    })
    describe("Delete kirja", () => {
        it("kirjaa ei voi poistaa, koska sitä ei ole", (done) => {
            chai.request(server)
            .delete("/api/kirjat/xxx")
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
        })
        it("Ei ole delete / api/kirjat resurssia", (done) => {
            chai.request(server)
            .delete("/api/kirjat")
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
        })
    })
    describe("Schema test", () => {
        it("kategoria always returns instance", (done) => {
            const nimi = "testi"
            Kategoria.findOneAndCreate({nimi}, {nimi})
            .then(kategoria => {
                assert(kategoria.nimi == nimi)
                kategoria.delete()
                done();
            })
        })
    })

  
describe('MongoDB testing', () => {
    it('Create a Kirja', (done) => {
        const uusikirja = new Kirja({nimi: 'Aku Ankka', kirjailija: 'Carl Barks', julkaisuvuosi: new Date(Date.now()), kuvausteksti: 
    'aku ankan tarinat', kustantaja: 'WSOY', _id: new mongoose.Types.ObjectId().toHexString()})
        uusikirja.save()
            .then(() => {                
                assert(!uusikirja.isNew);
                done();
            });
    });
    it('Create Nide', (done) => {
        const uusiNide = new Nide({kunto: '3', hankintahinta: 20})
        uusiNide.save()
        .then(() => {
            assert(!uusiNide.isNew)
            done()
        })
    })
});
})