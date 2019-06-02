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
        $('.tab2-days-orders').append(`<p class='tab2-days-orders-text'>Customer ID: <span class='info-bold'>${order.userID}</span> <br />Purchase: <span class='info-bold'>${order.food}</span></span> <br />Total Cost: <span class='info-bold'>$${order.totalCost}</span><p>`)
      })
    }   else {
      $('.tab2-days-orders').append(`<p class='tab2-no-orders-notice'>No Orders To Display</p>`);
    }
  },

  displayRoomServiceRevenueByDate(roomServicesRepo, date) {
    $('.tab2-days-orders').append(`<p>Todays Room Service Revenue:  $${roomServicesRepo.getRoomServiceRevenueByDate(date)} <br />
    
    </p>`);
  },

  displayMostPopularBookingDate(bookingsRepo) {
    $('.tab3-default-displays').append(`<p class='tab3-popular-date'>Most Popular Booking Date:  <span class='info-bold'>${bookingsRepo.getMostPopularBookingDate()}</span> <br />
    Most Available Booking Date:  <span class='info-bold'>${bookingsRepo.getMostAvailableBookingDate()}</span>
    </p>`)
  },

  searchCustomers(users) {
    users.forEach(user => {
      $('.tab4-customer-output').append(`<p>${user.name}</p>`)
    })
  },

  displayNoCustomersFound() {
    $('.tab4-customer-output').html(`<p>No users found</p>`)

  }

} 