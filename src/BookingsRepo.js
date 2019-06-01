class BookingsRepo {
  constructor(bookingsRepoData) {
    this.bookingsRepoData = bookingsRepoData;
  }
  bookRoom() {

  }
  unbookRoom() {
    
  }
  getNumberOfOccupiedRooms(date) {
    // console.log(this.bookingsRepoData);
    return this.bookingsRepoData.filter(booking => booking.date === date);
  }
}

export default BookingsRepo;