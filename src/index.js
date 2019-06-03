import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import CustomerRepo from './CustomerRepo';
import RoomRepo from './RoomRepo';
import BookingsRepo from './BookingsRepo';
import RoomServicesRepo from './RoomServicesRepo';
import domUpdates from './domUpdates';

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
    const roomRepo = new RoomRepo(roomRepoData, bookingsRepoData);
    const roomServicesRepo = new RoomServicesRepo(roomServicesRepoData);
    const bookingsRepo = new BookingsRepo(bookingsRepoData);
    let orderData = roomServicesRepo.getOrdersByDate(today);

    $('ul.tabs li').click(function() {
      var tab_id = $(this).attr('data-tab');
  
      $('ul.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');
  
      $(this).addClass('current');
      $("#" + tab_id).addClass('current');
    });

    $('#tab2-submit-search').click(function (e) {
      e.preventDefault();
      $('.tab2-days-orders').text('');
      let inputDate = $('#tab2-date-input').val();
      let orderData = roomServicesRepo.getOrdersByDate(inputDate); 
      domUpdates.displayOrdersByDate(orderData);
    });

    $('#tab3-search-btn').click(function (e) {
      e.preventDefault();
      let inputDate = $('#tab3-search-room-input').val();
      let unbookedRoomNumbers = bookingsRepo.getRoomNumbersAvailableByDate(roomRepoData, inputDate);
      let unbookedRooms = roomRepo.getRoomsByRoomNumbers(unbookedRoomNumbers);
      if (inputDate.length > 6) {
        domUpdates.displayAvailableRooms(unbookedRooms)
        domUpdates.displayFilterRoomInput();
      } else if (inputDate.length < 6) {
        domUpdates.hideAvailableRooms();
        domUpdates.displayMostPopularBookingDate(bookingsRepo);
      }
    });

    $('.tab3-search-dates').on('input', function (e) {
      let search = $('#tab3-filter-input').val();
      if ((search) && (e.target.id === 'tab3-filter-input')) {
        roomRepo.filterRoomsByInput(search);
      } 
    });

    $('#tab4-add-new-customer-btn').click(function (e) {
      e.preventDefault();
      domUpdates.displayNewCustomerForm()
    });

    $('#tab4-customer-search').on('input', function () {
      let search = $('#tab4-customer-search').val();
      if (search) {
        customerRepo.searchCustomers(search)
      } else {
        domUpdates.displayNoCustomersFound();
      }
    });

    $('.tab4-new-customer-form').click(function (e) {
      e.preventDefault();
      let newCustomerName = $('.tab4-customer-input').val();
      if ((e.target.id === 'tab4-new-customer-submit') && (newCustomerName.length > 2)) {
        domUpdates.displayNewCustomerName(e.target, newCustomerName)
        customerRepo.addCustomer(newCustomerName);
      }
    });

    $('.tab4-customer-output').click(function (e) {
      e.preventDefault();
      e.target;
    });

    domUpdates.displayTodaysDate(today);
    domUpdates.displayMainTabInfo(bookingsRepo, roomRepo, today);
    domUpdates.displayOrdersByDate(orderData);
    domUpdates.displayRoomServiceRevenueByDate(roomServicesRepo, today);
    domUpdates.displayMostPopularBookingDate(bookingsRepo);
  

  }
  setTimeout(timer, 500);
});

