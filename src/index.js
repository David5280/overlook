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

$(document).ready(function() {
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
      $('.tab2-days-orders').html('');
      let inputDate = $('#tab2-date-input').val();
      let orderData = roomServicesRepo.getOrdersByDate(inputDate); 
      domUpdates.displayOrders(orderData);
    });

    $('#tab3-search-btn').click(function (e) {
      e.preventDefault();
      $('.tab3-room-displays').html('');
      let inputDate = $('#tab3-search-room-input').val();
      let unbookedRoomNumbers = bookingsRepo.getRoomNumbersAvailableByDate(roomRepoData, inputDate);
      let unbookedRooms = roomRepo.getRoomsByRoomNumbers(unbookedRoomNumbers);
      const dateRegEx = /^\d{2}\/\d{2}\/\d{4}$/;
      if (dateRegEx.test(inputDate)) {
        domUpdates.displayAvailableRooms(unbookedRooms)
        $('.tab3-controls').on('change', function (e) {
          e.preventDefault();
          $('.tab3-room-displays').html('');
          roomRepo.filterRoomsByInput(e.target.value);
        })
      } else {
        domUpdates.hideAvailableRooms();
        domUpdates.displayMostPopularBookingDate(bookingsRepo);
      }
    });

    $('.tab3-search-dates').click(function (e) {
      e.preventDefault();
      if (e.target.id === 'tab3-add-booking-btn') {
        domUpdates.displayNewBookingForm()
      }
    });

    $('.tab3-room-displays').click(function(e) {
      e.preventDefault();
      if (e.target.className === 'tab3-cancel-submission-btn') {
        domUpdates.hideNewBookingForm();
      }
      if (e.target.className === 'tab3-submit-booking-btn') {
        let newBookingCustomerId = parseInt($('#tab3-new-booking-CusId').val());
        let newBookingDate = $('#tab3-new-booking-date').val();
        let newBookingRoomNumber = $('#tab3-new-booking-roomNum').val();
        bookingsRepo.addNewBooking(newBookingCustomerId, newBookingDate, newBookingRoomNumber)
        domUpdates.cleanNewBookingInputs();
        domUpdates.hideNewBookingForm();
        domUpdates.displayNewBookingConfirmation(newBookingCustomerId, newBookingDate, newBookingRoomNumber)
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
      } 
    });

    $('.tab4-new-customer-form').click(function (e) {
      e.preventDefault();
      let newCustomerName = $('.tab4-customer-input').val();
      if ((e.target.id === 'tab4-new-customer-submit') && (newCustomerName.length > 2)) {
        domUpdates.displayNewCustomerName(e.target, newCustomerName)
        domUpdates.displayFocusedUserName(newCustomerName);
        customerRepo.addCustomer(newCustomerName);
      } 
      if ((e.target.id === 'tab4-cancel-customer-submit')) {
        domUpdates.hideNewCustomerForm();
      }
    });

    $('.tab4-customer-output').click(function (e) {
      e.preventDefault();
      $('.tab2-days-orders').html('');
      let userBookings = bookingsRepo.getBookingsById(e.target.id);
      let userOrders = roomServicesRepo.getOrdersById(e.target.id);
      let userName = customerRepo.findCustomerNameById(e.target.id);
      domUpdates.displayUserBookings(userBookings);
      domUpdates.displayOrders(userOrders);
      domUpdates.displayTotalOrderRevenue(userOrders)
      domUpdates.displayFocusedUserName(userName.name, userName.id);
      domUpdates.displayAddNewBookingBtn();
      domUpdates.hideCustomerList();
    });

    $('.main-customer-name-output').click(function (e) {
      e.preventDefault();
      if (e.target.className === 'main-hide-customer-name') {
        domUpdates.hideFocusedUserName();
        domUpdates.hideAvailableRooms(bookingsRepo);
        domUpdates.hideOrders(roomServicesRepo, today);
      }
    });

    domUpdates.displayTodaysDate(today);
    domUpdates.displayMainTabInfo(bookingsRepo, roomRepo, today);
    domUpdates.displayOrders(orderData);
    domUpdates.displayRoomServiceRevenueByDate(roomServicesRepo, today);
    domUpdates.displayMostPopularBookingDate(bookingsRepo);
  }
  setTimeout(timer, 750);
});

