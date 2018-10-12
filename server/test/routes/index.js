const chai = require('chai');
const supertest = require('supertest');
const api = supertest('http://localhost:3001');
const expect = chai.expect;


describe('Home API', () => {

    describe('Home /GET page', () => {
        it('Home', (done) => {
            api.get('/')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.page).to.be.equal('<h1> Home Page.</h1>');
                    done();
                });
        });
        it('Login', (done) => {
            api.get('/login')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.page).to.be.equal('<h1> Login Page.</h1>');
                    done();
                });
        });

    });

    describe('Login /POST', () => {
        const userConfig = {
            account: 'account',
            password: 'jeni_password'
        };
        it('success login', (done) => {
            api.post('/login')
                .send({
                    account: 'account',
                    password: 'jeni_password'
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body.msg).to.be.equal('Success Login.');
                    expect(res.body.data.account).to.be.equal(userConfig.account);
                    expect(res.body.data.password).to.be.equal(userConfig.password);
                    done();
                });
        });
        it('user not found in DB', (done) => {
            api.post('/login')
                .send({
                    account: 'errorAccount',
                    password: 'errorPassword'
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body.msg).to.be.equal('Does not find account.');
                    expect(res.body.data).to.be.equal(null);
                    done();
                });
        });
        it('input error password', (done) => {
            api.post('/login')
                .send({
                    account: 'account',
                    password: 'errorPassword'
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body.msg).to.be.equal('Error password.');
                    expect(res.body.data).to.be.equal(null);
                    done();
                });
        });

    });

});