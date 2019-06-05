import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/Customer.js';
import CustomerRepo from '../src/CustomerRepo';
import testUsers from '../testData/testUsers.js'
import domUpdates from '../src/domUpdates.js'

describe('CustomerRepo', function() {
  let customerRepo;
  beforeEach(function () {
    customerRepo = new CustomerRepo(testUsers.users)
    chai.spy.on(domUpdates, 'searchCustomers', () => true);
    chai.spy.on(domUpdates, 'displayNoCustomersFound', () => true);
  });
  afterEach(function() {
    chai.spy.restore(domUpdates);
  })
  it('should be an instance of customerRepo', function() {
    expect(customerRepo).to.be.an.instanceOf(CustomerRepo);
  });
  it.skip('should search customers by input', function () {
    expect(customerRepo.searchCustomers('Autumn Toy')).to.equal(    
      {
        id: 1,
        name: "Autumn Toy"
      }
    )
  });
  it('should add a customer', function () {
    expect(customerRepo.customerData.length).to.equal(100)
    customerRepo.addCustomer('David Engel');
    expect(customerRepo.customerData.length).to.equal(101)
  })
  it('should validate a customers existence', function () {
    customerRepo.addCustomer('David Engel');
    expect(customerRepo.validateCustomer('David Engel')).to.equal(true);
  })
});
