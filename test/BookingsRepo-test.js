import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies'
chai.use(spies);
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
  it('should add a new booking', function () {
    expect(bookingsRepo.bookingsRepoData.length).to.equal(200)
    bookingsRepo.addNewBooking(101, '06/06/2019', 122);
    expect(bookingsRepo.bookingsRepoData.length).to.equal(201)
  });
  it('should get the number of occupied rooms', function () {
    expect(bookingsRepo.getNumberOfAvailableRooms('31/08/2019').length).to.equal(2);
  });
  it('should get bookings by date', function () {
    expect(bookingsRepo.getBookingsByDate('05/06/2019')).to.eql([ { userID: 82, date: '05/06/2019', roomNumber: 4 },
      { userID: 99, date: '05/06/2019', roomNumber: 129 } ])
  })
  it('should get the percentage of occupied rooms', function () {
    expect(bookingsRepo.getPercentageOfOccupiedRooms('31/08/2019')).to.equal(0.9950248756218906)
  });
  it('should get the room numbers that are booked by date', function () {
    expect(bookingsRepo.getRoomNumbersBookedByDate('22/02/2020')).to.eql([73, 116, 124])
  });
  it('should get the most popular booking date', function () {
    expect(bookingsRepo.getMostPopularBookingDate()).to.equal('17/12/2019')
  });
  it('should get the closest date with the most rooms available', function () {
    expect(bookingsRepo.getMostAvailableBookingDate()).to.equal('21/08/2019')
  })
});

export default BookingsRepo;
