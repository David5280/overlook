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
    </span> rooms available today. <br /> 
    Today's Revenue:  <span class='info-bold'>
    $${roomRepo.getTotalRoomRevenueByDate(date).toFixed(2)}</span><br />
    You are at <span class='info-bold'>${bookingsRepo.getPercentageOfOccupiedRooms(date)}%</span> capacity</p>`);
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
  }
} 