import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import CustomerRepo from './CustomerRepo';
import RoomRepo from './RoomRepo';
import BookingsRepo from './BookingsRepo';
import RoomServicesRepo from './RoomServicesRepo';


console.log('This is the JavaScript entry file - your code begins here.');

let customerRepoData;
let roomRepoData;
let roomServicesRepoData;
let bookingsRepoData;

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
const yyyy = today.getFullYear();
if (dd < 10) {
  dd = `0${dd}`;
}
if (mm < 10) {
  mm = `0${mm}`;
}
today = `${dd}/${mm}/${yyyy}`;

var customerData;
var roomData;
var roomServiceData;
var bookingData;

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users')
  .then(response => response.json())
  .then(result => customerRepoData = result.users)
  .catch(err => console.error(err));

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms')
  .then(response => response.json())
  .then(result => roomRepoData = result.rooms)
  .catch(err => console.error(err));

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices')
  .then(response => response.json())
  .then(result => roomServicesRepoData = result.roomServices)
  .catch(err => console.error(err));

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings')
  .then(response => response.json())
  .then(result => bookingsRepoData = result.bookings)
  .catch(err => console.error(err));

$( document ).ready(function() {
  function timer() {
    const customerRepo = new CustomerRepo(customerRepoData);
    const roomRepo = new RoomRepo(roomRepoData);
    const roomServicesRepo = new RoomServicesRepo(roomServicesRepoData);
    const bookingsRepo = new BookingsRepo(bookingsRepoData);
    // const room = new RoomRepo();

    $('ul.tabs li').click(function() {
      var tab_id = $(this).attr('data-tab');
  
      $('ul.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');
  
      $(this).addClass('current');
      $("#" + tab_id).addClass('current');
    })

    $('.tab1-date').text(`Current Date:  ${today}`);
    $('.tab1-primary-info').text(`Rooms Available Today:  ${bookingsRepo.getNumberOfOccupiedRooms()} Today's Balance:  Percent Full:`)

  }
  setTimeout(timer, 500);
});

