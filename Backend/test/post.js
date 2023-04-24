const chai = require("chai");
const chaihttp = require("chai-http");
const server = require("../server");



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
                    response.body.should.be.a('object');
                    response.body.should.have.property('status');
                    response.body.should.have.property('data')
                    done();
                })
        })
    })
})