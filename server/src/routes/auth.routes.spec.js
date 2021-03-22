const request = require('supertest');
const express = require('express');

const app = express();

app.get('/auth/signup', function(req, res) {
  res.status(200)
});

request(app)
  .get('/auth/signup')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });