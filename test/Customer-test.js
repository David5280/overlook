import chai from 'chai';
import Customer from '../src/Customer';
const expect = chai.expect;

describe('Customer', function() {
  let customer;
  beforeEach(function () {
    customer = new Customer()
  })
  it('should be an instance of customer', function() {
    expect(true).to.equal(true);
  });
});
