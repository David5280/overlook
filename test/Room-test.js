import chai from 'chai';
import Room from '../src/Room.js';
const expect = chai.expect;

describe('Room', function () {
  let room;
  beforeEach(function () {
    room = new Room(2, "single room", true, "twin", 2, 462.7)
  });
  it('should be an instance of Room', function() {
    expect(room).to.be.an.instanceOf(Room);
  });
  it('should have a room number', function() {
    expect(room.number).to.equal(2);
  });
  it('should have a type', function() {
    expect(room.type).to.equal("single room");
  });
  it('should indicate whether it has a bidet', function() {
    expect(room.bidet).to.equal(true);
  });
  it('should indicate bed size', function() {
    expect(room.bedSize).to.equal("twin");
  });
  it('should indicate bed size', function() {
    expect(room.bedSize).to.equal("twin");
  });
  it('should indicate bed size', function() {
    expect(room.bedSize).to.equal("twin");
  }); 
})