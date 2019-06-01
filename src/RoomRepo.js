import testBookings from '../testData/testBookings.js' 

class RoomRepo {
  constructor(bookingRepoData) {
    this.bookingRepoData = bookingRepoData;
    this.totalCapacity = this.bookingRepoData.length;
  }
  getNumberOfFreeRooms(date) {
    return this.totalRooms - this.getNumberOfOccupiedRooms(date)
  }
  getRoomsByType(type) {
    return this.roomData.filter(room => room.roomType === type);
  }
  addNewBooking() {
    let booking = new Booking(555, '22/08/2019', 143);
    this.bookingRepoData.push(booking);
  }
  removeBooking(reservation) {
    let bookingIndex = this.bookingRepoData.findIndex(booking => booking.userID === reservation);
    this.bookingRepoData.splice(bookingIndex, 1);
  }
}

export default RoomRepo;

