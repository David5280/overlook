import Customer from './Customer';
import domUpdates from './domUpdates';

class CustomerRepo {
  constructor(customerData) {
    this.customerData = customerData;
  }

  searchCustomers(input) {
    let inputCased = input.toLowerCase();
    let filteredCustomers = this.customerData.filter(customer => customer.name.toLowerCase().includes(inputCased));
    if (filteredCustomers.length > 0) {
      domUpdates.searchCustomers(filteredCustomers)
    } else {
      domUpdates.displayNoCustomersFound();
    }
  }

  addCustomer(customerName) {
    let customer = new Customer(this.customerData.length + 1, customerName);
    console.log('a', customer);
    this.customerData.push(customer);
  }

  findCustomerNameById(userId) {
    let ID = parseInt(userId);
    return this.customerData.find(customer => customer.id === ID);
  }

  validateCustomer(name) {
    let customerNames = this.customerData.map(customer => customer.name.toUpperCase());
    return customerNames.includes(name.toUpperCase()) ? true : false;
  }
}

export default CustomerRepo;