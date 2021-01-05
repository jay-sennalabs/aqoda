const fs = require("fs")
const Hotel = require("./hotel")

class Command {
  constructor(name, params) {
    this.name = name
    this.params = params
  }
}

function main() {
  const filename = "input.txt"
  const commands = getCommandsFromFileName(filename)
  let hotel

  commands.forEach(command => {
    switch (command.name) {
      case "create_hotel":
        const [floor, roomPerFloor] = command.params
        hotel = new Hotel(floor, roomPerFloor)
        hotel.createHotel()
        console.log(`Hotel created with ${floor} floor(s), ${roomPerFloor} room(s) per floor.`)
        return
      case "book":
        const [room, name, age] = command.params
        hotel.book(room, name, age)
        return
      case "list_available_rooms":
        hotel.listAvailableRooms()
        return
      case "get_guest_in_room":
        const [roomNo] = command.params
        hotel.listGuestInRoom(roomNo)
      case "checkout":
        const [roomId, guessName] = command.params
        hotel.checkoutRoom(roomId, guessName)
        return
      default:
        return
    }
  })
}

function getCommandsFromFileName(fileName) {
  const file = fs.readFileSync(fileName, "utf-8")

  return file
    .split("\n")
    .map(line => line.split(" "))
    .map(
      ([commandName, ...params]) =>
        new Command(
          commandName,
          params.map(param => {
            const parsedParam = parseInt(param, 10)

            return Number.isNaN(parsedParam) ? param : parsedParam
          })
        )
    )
}

main()
