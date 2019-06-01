class RoomServicesRepo {
  constructor(roomServicesRepoData) {
    this.roomServicesRepoData = roomServicesRepoData;
  }
  getRoomServiceRevenueByDate(date) {
    let todaysTransactions = this.roomServicesRepoData.filter(transaction => transaction.date === date);
    let totalAmount = todaysTransactions.reduce((acc, transaction2) => {
      acc += transaction2.totalCost;
      return acc;
    }, 0);
    return totalAmount;
  }
  getOrdersByDate(date) {
    return this.roomServicesRepoData.filter(order => order.date === date);
  }
}

export default RoomServicesRepo;