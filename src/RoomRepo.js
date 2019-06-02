import testBookings from '../testData/testBookings.js' 
import testRoom from '../testData/testRoom.js'
import BookingsRepo from './BookingsRepo.js'

class RoomRepo {
  constructor(roomRepoData, bookingsRepoData) {
    this.roomRepoData = roomRepoData;
    this.bookingsRepoData = bookingsRepoData;
    // this.totalCapacity = this.roomRepoData.length;
  }

  getNumberOfFreeRooms(date) {
    return this.totalRooms - this.getNumberOfOccupiedRooms(date)
  }

  getRoomsByType(type) {
    return this.roomData.filter(room => room.roomType === type);
  }

  getTotalRoomRevenueByDate(date) {
    let todaysBookedRoomNumbers = this.bookingsRepoData.filter(booking =>booking.date === date).map(obj => obj.roomNumber).sort((a, b) => a - b);
    let totalRoomRevenue = this.roomRepoData.reduce((acc, room) => {
      todaysBookedRoomNumbers.includes(room.number) ? acc += room.costPerNight : null;
      return acc;
    }, 0)
    return totalRoomRevenue;
  }
  getMostPopularBookingDate() {
    console.log(this.bookingRepoData)
  }
}

export default RoomRepo;

