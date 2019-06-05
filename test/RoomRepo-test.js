import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies'
chai.use(spies);
import domUpdates from '../src/domUpdates.js'
import RoomRepo from '../src/RoomRepo.js';
import testRoom from '../testData/testRoom.js';
import testBookings from '../testData/testBookings.js';


describe('RoomRepo', function () {
  let roomRepo;
  beforeEach(function () {
    roomRepo = new RoomRepo(testRoom.rooms, testBookings.bookings)
    chai.spy.on(domUpdates, 'displayAvailableRooms', () => true);
    chai.spy.on(domUpdates, 'displayNoRoomsFound', () => true);
  });
  afterEach(function() {
    chai.spy.restore(domUpdates);
  });
  it('should be an instance of room repo', function () {
    expect(roomRepo).to.be.an.instanceOf(RoomRepo);
  });
  it('should get total room revenue by date', function () {
    expect(roomRepo.getTotalRoomRevenueByDate('22/02/2020')).to.equal(853.5999999999999)
  });
  it('should get room objects by their room numbers', function () {
    expect(roomRepo.getRoomsByRoomNumbers([73, 116, 124 ])).to.eql([
      {
        number: 73,
        roomType: "junior suite",
        bidet: true,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 317.58
      },
      {
        number: 116,
        roomType: "residential suite",
        bidet: false,
        bedSize: "full",
        numBeds: 1,
        costPerNight: 216.94
      },
      {
        number: 124,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 319.08
      }
    ])
  });
  it('should get rooms by type', function () {
    expect(roomRepo.getRoomsByType('residential suite').length).to.equal(46)
  });
  it('should get total revenue for a given date', function () {
    expect(roomRepo.getTotalRoomRevenueByDate('05/06/2019')).to.equal(624.6899999999999)
  });
  it.skip('should filter rooms by input', function () {
    expect(roomRepo.filterRoomsByInput('residential suite').length).to.equal(20)
  });
});

