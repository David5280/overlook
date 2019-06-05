import Order from './Order';
import domUpdates from './domUpdates';

class RoomServicesRepo {
  constructor(roomServicesRepoData) {
    this.roomServicesRepoData = roomServicesRepoData;
  }

  getOrdersByDate(date) {
    return this.roomServicesRepoData.filter(order => order.date === date);
  }

  getOrdersById(userId) {
    let ID = parseInt(userId);
    let userOrders = this.roomServicesRepoData.filter(order => order.userID === ID);
    return userOrders;
  }
  
  getRoomServiceRevenueByDate(date) {
    let todaysTransactions = this.roomServicesRepoData.filter(transaction => transaction.date === date);
    let totalAmount = todaysTransactions.reduce((acc, transaction2) => {
      acc += transaction2.totalCost;
      return acc;
    }, 0);
    return totalAmount;
  }
}

export default RoomServicesRepo;