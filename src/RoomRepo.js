class RoomRepo {
  constructor(bookingRepoData, roomData, totalCapacity) {
    this.bookingRepoData = bookingRepoData;
    this.roomData = roomData;
    this.totalCapacity = totalCapacity;
  }
  getnumberOfOccupiedRooms(date) {
    return this.bookingRepoData.filter(room => room.date === date).length;
  }
  getNumberOfFreeRooms(date) {
    return this.totalRooms - this.getPercentOfOccupiedRooms(date)
  }
  getRoomsByType(type) {
    return this.roomData.filter(room => room.roomType === type);
  }
  addNewBooking() {
    let booking = new booking(555, '22/08/2019', 143);
    this.bookingRepoData.push(booking);
  }
  removeBooking() {
    let bookingIndex = this.bookingRepoData.findIndex(booking => booking.userID === book);
    this.bookingRepoData.splice(bookingIndex, 1);
  }
}
