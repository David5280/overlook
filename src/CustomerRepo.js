import Customer from './Customer';

class CustomerRepo {
  constructor(customerData) {
    this.customerData = customerData;
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