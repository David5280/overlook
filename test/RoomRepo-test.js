import chai from 'chai';
const expect = chai.expect;
import RoomRepo from '../src/RoomRepo.js';
import testRoom from '../testData/testRoom.js';
import testBookings from '../testData/testBookings.js';


describe('RoomRepo', function () {
  let roomRepo;
  beforeEach(function () {
    roomRepo = new RoomRepo(testRoom.rooms, testBookings.bookings)
  });
  it('should be an instance of room repo', function () {
    expect(roomRepo).to.be.an.instanceOf(RoomRepo);
  });
  it('should get total room revenue by date', function () {
    expect(roomRepo.getTotalRoomRevenueByDate('22/02/2020')).to.equal(853.5999999999999)
  });
  
});

