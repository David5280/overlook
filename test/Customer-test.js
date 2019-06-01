import chai from 'chai';
import Customer from '../src/Customer.js';
const expect = chai.expect;

describe('Customer', function() {
  let customer;
  beforeEach(function () {
    customer = new Customer(4, "Milo Ankunding")
  });
  it('should be an instance of customer', function() {
    expect(customer).to.be.an.instanceOf(Customer);
  });
  it('should have an id', function () {
    expect(customer.id).to.equal(4);
  })
  it('should have a name', function () {
    expect(customer.name).to.equal("Milo Ankunding")
  })
});
