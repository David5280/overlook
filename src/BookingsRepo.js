class BookingsRepo {
  constructor(bookingsRepoData) {
    this.bookingsRepoData = bookingsRepoData;
  }
  getNumberOfAvailableRooms(date) {
    return this.bookingsRepoData.filter(booking => booking.date === date);
  }
  getPercentageOfOccupiedRooms(date) {
    const roomsAvailable = this.getNumberOfAvailableRooms(date);
    const result = (roomsAvailable.length / this.bookingsRepoData.length) * 100
    return result;
  }
  getRoomNumbersBookedByDate(date) {
    let todaysBookedRoomNumbers = this.bookingsRepoData.filter(booking =>booking.date === date).map(obj => obj.roomNumber).sort((a, b) => a - b)
    return todaysBookedRoomNumbers;
  }
}

export default BookingsRepo;