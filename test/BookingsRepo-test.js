import chai from 'chai';
const expect = chai.expect;
import BookingsRepo from '../src/BookingsRepo.js'
import testBookings from '../testData/'

describe('BookingsRepo', function() {
  let bookingsRepo;
  beforeEach(function () {
    bookingsRepo = new BookingsRepo();
  })
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});
