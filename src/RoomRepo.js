import domUpdates from './domUpdates.js';

class RoomRepo {
  constructor(roomRepoData, bookingsRepoData) {
    this.roomRepoData = roomRepoData;
    this.bookingsRepoData = bookingsRepoData;
  }

  getRoomsByType(type) {
    return this.roomRepoData.filter(room => room.roomType === type);
  }

  getTotalRoomRevenueByDate(date) {
    let todaysBookedRoomNumbers = this.bookingsRepoData.filter(booking =>booking.date === date).map(obj => obj.roomNumber).sort((a, b) => a - b);
    let totalRoomRevenue = this.roomRepoData.reduce((acc, room) => {
      todaysBookedRoomNumbers.includes(room.number) ? acc += room.costPerNight : null;
      return acc;
    }, 0)
    return totalRoomRevenue;
  }
  
  getRoomsByRoomNumbers(roomNumbers) {
    let rooms = this.roomRepoData.filter(room => {
      return roomNumbers.includes(room.number);
    })
    return rooms;
  }

  filterRoomsByInput(input) {
    let filteredRooms = this.roomRepoData.filter(room => 
      room.roomType.toLowerCase().includes(input))
    if (filteredRooms.length > 0) {
      domUpdates.displayAvailableRooms(filteredRooms)
    } else {
      domUpdates.displayNoRoomsFound();
    }
  }
}

export default RoomRepo;

