import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/Customer.js';
import CustomerRepo from '../src/CustomerRepo';
import testUsers from '../testData/testUsers.js'

describe('CustomerRepo', function() {
  let customerRepo;
  beforeEach(function () {
    customerRepo = new CustomerRepo(testUsers.users)
  });
  it('should be an instance of customerRepo', function() {
    expect(customerRepo).to.be.an.instanceOf(CustomerRepo);
  });
});
