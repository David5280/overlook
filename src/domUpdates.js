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

  displayRoomServiceRevenueByDate(roomServicesRepo, date) {
    $('.tab2-days-orders').append(`<p>Todays Room Service Revenue:  $${roomServicesRepo.getRoomServiceRevenueByDate(date)} <br />
    </p>`);
  },

  displayMostPopularBookingDate(bookingsRepo) {
    let mostPopularDate = bookingsRepo.getMostPopularBookingDate();
    let leastPopularDate = bookingsRepo.getMostAvailableBookingDate();  
    $('.tab3-default-displays').append(`<p class='tab3-popular-date'>Most Popular Booking Date:  <span class='info-bold'>${mostPopularDate}</span> with <span class='info-bold'>${bookingsRepo.getRoomNumbersBookedByDate(mostPopularDate).length}</span> bookings.<br />
    Most Available Booking Date:  <span class='info-bold'>${leastPopularDate}</span> with <span class='info-bold'>${bookingsRepo.bookingsRepoData.length - bookingsRepo.getNumberOfAvailableRooms(leastPopularDate).length}</span> rooms available.
    </p>`)
  },

  searchCustomers(users) {
    $('.tab4-customer-output').text('');
    users.forEach(user => {
      $('.tab4-customer-output').append(`<p class='tab4-customer' id='customer${user.id}'>${user.name} || Customer ID: ${user.id}</p>`)
    })
  },

  displayNoCustomersFound() {
    $('.tab4-customer-output').html(`<p>No users found</p>`)
  }

} 