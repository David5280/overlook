import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import CustomerRepo from './CustomerRepo';
import RoomRepo from './RoomRepo';
import BookingsRepo from './BookingsRepo';
import RoomServicesRepo from './RoomServicesRepo';

console.log('This is the JavaScript entry file - your code begins here.');

var customerData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users')
  .then(reponse => response.json())
  .then(result => CustomerRepo.getAllCustomers(result.users))
  .catch(err => console.error(err));

  var roomData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms')
  .then(reponse => response.json())
  .then(result => roomRepo.getAllRooms(result.rooms))
  .catch(err => console.error(err));

  var roomServiceData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices')
  .then(reponse => response.json())
  .then(result => CustomerRepo.getAllCustomers(result.roomServices))
  .catch(err => console.error(err));

  var bookingData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings')
  .then(reponse => response.json())
  .then(result => CustomerRepo.getAllCustomers(result.bookings))
  .catch(err => console.error(err));

