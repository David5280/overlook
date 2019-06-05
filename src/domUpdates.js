import $ from 'jquery';

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

  displayOrders(orders) {
    $('.tab2-no-orders-notice').html('');
    $('.tab2-revenue-display').html('');
    if (orders.length > 0) {
      orders.forEach(order => {
        $('.tab2-days-orders').append(`
        <p class='tab2-days-orders-text'>
        Customer ID: <span class='info-bold'>${order.userID}</span> <br />
        Date of Purchase: <span class='info-bold'>${order.date}</span><br />
        Purchase: <span class='info-bold'>${order.food}</span><br />
        Total Cost: <span class='info-bold'>$${order.totalCost}</span>
        </p>
        `)
      })
    }   else {
      $('.tab2-days-orders').append(`<p class='tab2-no-orders-notice'>No Orders To Display</p>`);
    }
  },

  displayTotalOrderRevenue(userOrders) {
    let revenue = userOrders.reduce((acc, order) => {
      acc += order.totalCost;
      return acc;
    }, 0).toFixed(2);
    $('.tab2-days-orders').append(`
    Total Revenue:  <span class='info-bold'>$${revenue}</span>
    `)
  },

  hideOrders(roomServicesRepo, today) {
    $('.tab2-days-orders').html('');
    $('.tab2-days-orders').append(`
    <p class='tab2-no-orders-notice'>No Orders To Display for Today</p><br />
    <p class='tab2-revenue-display'>Todays Room Service Revenue:  $${roomServicesRepo.getRoomServiceRevenueByDate(today)}
    </p>
    `);
  },

  displayAvailableRooms(availableRooms) {
    if (availableRooms.length > 0) {
      $('.tab3-popular-date').hide()
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

  displayUserBookings(bookings) {
    $('.tab3-room-displays').html('');
    $('.tab3-popular-date').html('');
    bookings.forEach(booking => {
      $('.tab3-room-displays').append(`
      <p class='tab3-booking-display'>
      Customer ID:  <span class='info-bold'>${booking.userID}</span><br />
      Date:  <span class='info-bold'>${booking.date}</span><br />
      Room Number:  <span class='info-bold'>${booking.roomNumber}</span>
      </p>
    `)
    })
  },

  hideAvailableRooms(bookingsRepo) {
    $('.tab3-room-displays').html('')
    this.displayMostPopularBookingDate(bookingsRepo)
  },

  displayNoRoomsFound() {
    $('.tab3-room-displays').html(`<p>No rooms found</p>`)
  },

  displayAddNewBookingBtn() {
    $('#tab3-add-booking-btn').remove();
    $('.tab3-search-dates').append(`
    <button id='tab3-add-booking-btn' class='tab3-controls'>Add Booking</button>
    `)
  },

  hideAddNewBookingBtn() {
    $('#tab3-add-booking-btn').hide('');
  },

  displayNewBookingForm() {
    $('.tab3-room-displays').append(`
    <form class='tab3-new-booking-form'>
      <input id='tab3-new-booking-date' class='tab3-new-booking-input' placeholder='Date: dd/mm/yyyy' />
      <input id='tab3-new-booking-CusId' class='tab3-new-booking-input' placeholder='Enter a customer ID' />
      <input id='tab3-new-booking-roomNum' class='tab3-new-booking-input' placeholder='Enter a Room Number' />
      <button class='tab3-submit-booking-btn'>Add Booking</button>
      <button class='tab3-cancel-submission-btn'>Cancel</button>
    </form>
    `)
  },

  cleanNewBookingInputs() {
    $('#tab3-new-booking-CusId').val('');
    $('#tab3-new-booking-date').val('');
    $('#tab3-new-booking-roomNum').val('');
  },

  hideNewBookingForm() {
    $('.tab3-new-booking-form').html('');
  },

  displayRoomServiceRevenueByDate(roomServicesRepo, date) {
    $('.tab2-days-orders').append(`<p class='tab2-revenue-display'>Todays Room Service Revenue:  $${roomServicesRepo.getRoomServiceRevenueByDate(date)} <br />
    </p>`);
  },

  displayMostPopularBookingDate(bookingsRepo) {
    let mostPopularDate = bookingsRepo.getMostPopularBookingDate();
    let leastPopularDate = bookingsRepo.getMostAvailableBookingDate();  
    $('.tab3-default-displays').text('');
    $('.tab3-default-displays').append(`<p class='tab3-popular-date'>Most Popular Booking Date:  <span class='info-bold'>${mostPopularDate}</span> with <span class='info-bold'>${bookingsRepo.getRoomNumbersBookedByDate(mostPopularDate).length}</span> bookings.<br />
    Most Available Booking Date:  <span class='info-bold'>${leastPopularDate}</span> with <span class='info-bold'>${bookingsRepo.bookingsRepoData.length - bookingsRepo.getNumberOfAvailableRooms(leastPopularDate).length + 1 }</span> rooms available.
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

  hideCustomerList() {
    $('.tab4-customer').fadeOut();
    $('#tab4-customer-search').val('');
  },
  
  displayNoCustomersFound() {
    $('.tab4-customer-output').html(`<p>No users found</p>`) 
  },

  displayFocusedUserName(name) {
    $('.main-customer-name-output').html(`
    <h2 class='main-display-customer-name'>Now Viewing: ${name}
    <button class='main-hide-customer-name'>Exit</Button>
    </h2>
    `)
  },

  hideFocusedUserName() {
    $('.main-customer-name-output').html('');
    this.hideAddNewBookingBtn();
  },

  displayNewCustomerForm() {
    $('.tab4-new-customer-form').html(`
    <form class='tab4-new-customer-input-form'>
      <input type='text' class='tab4-customer-input' placeholder='Enter Customer Name' />
      <button id='tab4-new-customer-submit' class='tab4-customer-input'>Submit New Customer</button>
      <button id='tab4-cancel-customer-submit' class='tab4-customer-input'>Cancel</button>
    </form>
    `)
  },

  hideNewCustomerForm() {
    $('.tab4-new-customer-form').html('');
  },

  displayNewCustomerName(target, newCustomerName) {
    if ((target.id === 'tab4-new-customer-submit') && (newCustomerName.length > 2)) {
      $('#tab4-new-customer-submit').hide();
      $('.tab4-customer-input').hide();
      $('.tab4-new-customer-input-form').append(`New Customer Added:  <span class='info-bold'>${newCustomerName}</span>`).delay(2500).fadeOut();
      this.displayAddNewBookingBtn();
    }
  }
} 