process.env.NODE_ENV = 'test';

let Order = require('../models/order');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();

chai.use(chaiHttp);
describe('Orders', () => {
    /*
     * Test the /GET route
     */
    describe('/GET Order', () => {
        it('it should GET all the Orders', (done) => {
            chai.request(server)
                .get(global.restApiRoot + '/orders')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});