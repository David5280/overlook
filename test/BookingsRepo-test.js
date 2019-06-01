import chai from 'chai';
const expect = chai.expect;
import BookingsRepo from '../src/BookingsRepo.js'
import testBookings from '../testData/testBookings.js'

describe('BookingsRepo', function() {
  let bookingsRepo;
  beforeEach(function () {
    bookingsRepo = new BookingsRepo(testBookings.bookings);
  })
  it('should be an instance of BookingsRepo', function() {
    expect(bookingsRepo).to.be.an.instanceOf(BookingsRepo);
  });
  it('should get the number of occupied rooms', function () {
    expect(bookingsRepo.getNumberOfAvailableRooms('31/08/2019').length).to.equal(2);
  });
  it('should get the percentage of occupied rooms', function () {
    expect(bookingsRepo.getPercentageOfOccupiedRooms('31/08/2019')).to.equal(1)
  });
  it('should get the room numbers that are booked by date', function () {
    expect(bookingsRepo.getRoomNumbersBookedByDate('22/02/2020')).to.eql([73, 116, 124])
  })
});

export default BookingsRepo;
