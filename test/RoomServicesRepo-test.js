import chai from 'chai';
const expect = chai.expect;
import testRoomServices from '../testData/testRoomServices.js';
import RoomServicesRepo from '../src/roomServicesRepo.js'

describe('RoomServices', function () {
  let roomServicesRepo;
  beforeEach(function () {
    roomServicesRepo = new RoomServicesRepo(testRoomServices.roomServices)
  });
  it('should be an instance of RoomServices', function () {
    expect(roomServicesRepo).to.be.an.instanceOf(RoomServicesRepo);
  });
  it('should get the dollar amount of roomService Sales by date', function () {
    expect(roomServicesRepo.getRoomServiceRevenueByDate('22/02/2020')).to.equal(18.54)
  })
});