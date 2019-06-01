class RoomServicesRepo {
  constructor(serviceData) {
    this.serviceData = serviceData;
  }
  getRoomServiceRevenueByDate(date) {
    let todaysTransactions = this.serviceData.filter(transaction => transaction.date === date);
    let totalAmount = todaysTransactions.reduce((acc, transaction2) => {
      acc += transaction2.totalCost;
      return acc;
    }, 0);
    return totalAmount;
  }
}

export default RoomServicesRepo;