class BookingsRepo {
  constructor(bookingsRepoData) {
    this.bookingsRepoData = bookingsRepoData;
  }
  getNumberOfAvailableRooms(date) {
    return this.bookingsRepoData.filter(booking => booking.date === date);
  }
  getBookingsByDate(date) {
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
  getRoomNumbersAvailableByDate(roomRepo, date) {
    let bookedRoomNumbers = this.getRoomNumbersBookedByDate(date);
    let unbookedRoomNumbers = roomRepo.map(room => room.number).filter(number => !bookedRoomNumbers.includes(number))
    return unbookedRoomNumbers;
  }
    
  getMostPopularBookingDate() {
    let dates = this.bookingsRepoData.map(book => book.date)
    let popularDate = dates.reduce((acc, date) => {
      acc[date] = ++ acc[date] || 1
      return acc
    }, {})
    let mostPopularDate = Object.entries(popularDate).sort((a, b) => a[1] - b[1]).pop()[0]
    return mostPopularDate
  }
  getMostAvailableBookingDate() {
    let dates = this.bookingsRepoData.map(book => book.date)
    let popularDate = dates.reduce((acc, date) => {
      acc[date] = ++ acc[date] || 1
      return acc
    }, {})
    let mostAvailableDate = Object.entries(popularDate).sort((a, b) => a[1] - b[1]).shift()[0]
    return mostAvailableDate;
  }
  getBookingsById(userId) {
    let ID = parseInt(userId)
    let userBookings = this.bookingsRepoData.filter(booking => booking.userID === ID);
    return userBookings
  }
}

export default BookingsRepo;