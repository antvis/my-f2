const expect = require('chai').expect;
const myF2 = require('../../src/index');

describe('#1', () => {
  it('description', () => {
    expect('myF2').to.be.a('string');
    expect(myF2).to.be.an('object');
  });
});
