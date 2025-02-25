const fs = require("fs");
const Hotel = require("./hotel");

class Command {
  constructor(name, params) {
    this.name = name;
    this.params = params;
  }
}

function main() {
  const filename = "input.txt";
  const commands = getCommandsFromFileName(filename);
  let hotel;
  let floor, roomPerFloor, roomNumber, guestName, guestAge, keycard, operator;

  commands.forEach(command => {
    switch (command.name) {
      case "create_hotel":
        [floor, roomPerFloor] = command.params;
        hotel = new Hotel(floor, roomPerFloor);
        hotel.createHotel();
        return;
      case "book":
        [roomNumber, guestName, guestAge] = command.params;
        hotel.booking(roomNumber, guestName, guestAge);
        return;
      case "list_available_rooms":
        hotel.listAvailableRooms();
        return;
      case "checkout":
        [keycard, guestName] = command.params;
        hotel.checkout(keycard, guestName);
        return;
      case "list_guest":
        hotel.listGuestName();
        return;
      case "get_guest_in_room":
        [roomNumber] = command.params;
        hotel.getGuestByRoom(roomNumber);
        return;
      case "list_guest_by_age":
        [operator, guestAge] = command.params;
        hotel.listGuestByAge(operator, guestAge);
        return;
      case "list_guest_by_floor":
        [floor] = command.params;
        hotel.listGuestByFloor(floor);
        return;
      case "checkout_guest_by_floor":
        [floor] = command.params;
        hotel.checkoutByFloor(floor);
        return;
      case "book_by_floor":
        [floor, guestName, guestAge] = command.params;
        hotel.bookingByFloor(floor, guestName, guestAge);
        return;
      default:
        return;
    }
  });
}

function getCommandsFromFileName(fileName) {
  const file = fs.readFileSync(fileName, "utf-8");

  return file
    .split("\n")
    .map(line => line.split(" "))
    .map(
      ([commandName, ...params]) =>
        new Command(
          commandName,
          params.map(param => {
            const parsedParam = parseInt(param, 10);

            return Number.isNaN(parsedParam) ? param : parsedParam;
          })
        )
    );
}

main();
