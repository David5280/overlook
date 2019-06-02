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
      domUpdates.displayNoCustomersFound()
    }
  }

  addCustomer() {
    let customer = new Customer(420, 'David Engel');
    this.customerData.push(customer);
  }

  findCustomerByName(name) {
    return this.customerData.find(customer => customer.name.toUpperCase() === name.toUpperCase());
  }

  validateCustomer(name) {
    let customerNames = this.customerData.map(customer => customer.name.toUpperCase());
    return customerNames.includes(name.toUpperCase()) ? true : false;
  }
  // calculateTotalBill() {
 
  // }
}

export default CustomerRepo;