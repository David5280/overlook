import chai from 'chai';
const expect = chai.expect;
import RoomRepo from '../src/RoomRepo.js';
import testRooms from '../testData/testRooms.js'

describe('RoomRepo', function () {
  let roomRepo;
  beforeEach(function () {
    roomRepo = new RoomRepo(testRooms.rooms)
  });
  it('should be an instance of room repo', function () {
    expect(roomRepo).to.be.an.instanceOf(RoomRepo);
  });
  it('should get the number of occupied rooms', function () {
    console.log(roomRepo.getNumberOfOccupiedRooms('31/05/2019'))
    expect(roomRepo.getNumberOfOccupiedRooms('31/05/2019')).to.equal(40);
  });
});

