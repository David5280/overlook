import $ from 'jquery';
import RoomServicesRepo from './RoomServicesRepo';

export default {

  displayTodaysDate(today) {
    return $('.tab1-date').text(`Current Date:  ${today}`);
  },

  displayMainTabInfo(bookingsRepo, roomRepo, date) {
    $('.tab1-primary-info').append(`
    <p class ='tab1-primary-info-text'>There are <span class='info-bold'>
    ${bookingsRepo.bookingsRepoData.length - bookingsRepo.getNumberOfAvailableRooms(date).length}
    </span> rooms available. <br /> 
    Today's Revenue:  <span class='info-bold'>
    $${roomRepo.getTotalRoomRevenueByDate(date).toFixed(2)}</span><br />
    Hotel Capacity: <span class='info-bold'>${bookingsRepo.getPercentageOfOccupiedRooms(date)}%</span></p>`);
  },

  displayOrdersByDate(orders) {
    if (orders.length > 0) {
      orders.forEach(order => {
        $('.tab2-days-orders').append(`<p class='tab2-days-orders-text'>Customer ID: <span class='info-bold'>${order.userID}</span> <br />Purchase: <span class='info-bold'>${order.food}</span> <br />Total Cost: <span class='info-bold'>$${order.totalCost}</span><p>`)
      })
    }   else {
      $('.tab2-days-orders').append(`<p class='tab2-no-orders-notice'>No Orders To Display</p>`);
    }
  },

  displayAvailableRooms(availableRooms) {
    if (availableRooms.length > 0) {
      $('.tab3-popular-date').hide()
      // $('.tab3-room-displays').show()
      // $('.tab3-controls').hide();
      availableRooms.forEach(room => {
        $('.tab3-room-displays').append(`
        <p class='tab3-room-display'>
        Room Number:  <span class='info-bold'>${room.number}</span><br />
        Room Type: <span class='info-bold'>${room.roomType}</span><br />
        Bed Size:  <span class='info-bold'>${room.bedSize}</span><br />
        Number of Beds: <span class='info-bold'>${room.numBeds}</span><br />
        Bidet:  <span class='info-bold'>${room.bidet ? 'Yes!' : 'No.'}</span><br />
        Nightly Cost:  <span class='info-bold'>$${room.costPerNight}</span><br />
        </p>
        `)
      })
    }
  },

  hideAvailableRooms() {
    $('.tab3-room-displays').hide()
  },

  displayNoRoomsFound() {
    $('.tab3-room-displays').html(`<p>No rooms found</p>`)
  },

  displayFilterRoomInput() {
    // $('.tab3-search-dates').html('');
    $('.tab3-search-dates').append(`
    <select id="room-select" class='tab3-controls'>
    <option value="">--Please choose an option--</option>
    <option value="single room">Single Room</option>
    <option value="junior suite">Junior Suite</option>
    <option value="residential suite">Residential Suite</option>
    </select>
    `)
  },

  displayRoomServiceRevenueByDate(roomServicesRepo, date) {
    $('.tab2-days-orders').append(`<p>Todays Room Service Revenue:  $${roomServicesRepo.getRoomServiceRevenueByDate(date)} <br />
    </p>`);
  },

  displayMostPopularBookingDate(bookingsRepo) {
    let mostPopularDate = bookingsRepo.getMostPopularBookingDate();
    let leastPopularDate = bookingsRepo.getMostAvailableBookingDate();  
    $('.tab3-default-displays').text('');
    $('.tab3-default-displays').append(`<p class='tab3-popular-date'>Most Popular Booking Date:  <span class='info-bold'>${mostPopularDate}</span> with <span class='info-bold'>${bookingsRepo.getRoomNumbersBookedByDate(mostPopularDate).length}</span> bookings.<br />
    Most Available Booking Date:  <span class='info-bold'>${leastPopularDate}</span> with <span class='info-bold'>${bookingsRepo.bookingsRepoData.length - bookingsRepo.getNumberOfAvailableRooms(leastPopularDate).length}</span> rooms available.
    </p>`)
  },

  searchCustomers(users) {
    $('.tab4-customer-output').text('');
    if (users) {
      (users.forEach(user => {
        $('.tab4-customer-output').append(`<p class='tab4-customer' id='${user.id}'> ${user.name} || Customer ID: ${user.id}</p>`)
      }))
    }
  },

  displayNoCustomersFound() {
    $('.tab4-customer-output').html(`<p>No users found</p>`)
  },

  displayNewCustomerForm() {
    $('.tab4-new-customer-form').html(`
    <form class='tab4-new-customer-input-form'>
      <input type='text' class='tab4-customer-input' placeholder='Enter Customer Name' />
      <button id='tab4-new-customer-submit' class='tab4-customer-input'>Submit New Customer</button>
    </form>
    `)
  },

  displayNewCustomerName(target, newCustomerName) {
    if (target.id === 'tab4-new-customer-submit') {
      $('#tab4-new-customer-submit').hide();
      $('.tab4-customer-input').hide();
      $('.tab4-new-customer-input-form').append(`New Customer Added:  <span class='info-bold'>${newCustomerName}</span>`).delay(2500).fadeOut()
    }
  }
} 