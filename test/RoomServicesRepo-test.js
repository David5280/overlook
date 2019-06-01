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
  it('should be able to get all room service orders by date', function () {
    expect(roomServicesRepo.getOrdersByDate('22/02/2020')).to.eql([
      {
        userID: 31,
        date: "22/02/2020",
        food: "Generic Rubber Sandwich",
        totalCost: 7.45
      },
      {
        userID: 4,
        date: "22/02/2020",
        food: "Gorgeous Soft Sandwich",
        totalCost: 11.09
      }
    ]
    );
  })
});