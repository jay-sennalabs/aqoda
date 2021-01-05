class Hotel {
  constructor(floor = 0, roomPerFloor = 0) {
    this.floor = floor;
    this.roomPerFloor = roomPerFloor;
    this.rooms = [];
    this.keycards = [];
  }

  get rooms() {
    return this._rooms;
  }

  set rooms(value) {
    this._rooms = value;
  }

  createHotel() {
    this.rooms = Array.from({length: this.floor}).map((_, i) =>
        Array.from({length: this.roomPerFloor})
            .map((_, i) => i + 1)
            .map(i => {
              let roomNumber = i < 10 ? "0" + i : i;
              return {
                roomNumber,
                status: null,
                user: {
                  name: "",
                  age: null
                }
              };
            })
            .reduce((all, room) => ({...all, [room.roomNumber]: room}), {})
    );

    this.keycards = Array.from({
      length: this.floor * this.roomPerFloor
    }).map((_, i) => ({key: i + 1, room: null}));
  }

  listAvailableRooms() {
    const availableRooms = [];
    for (let runningFloor = 0; runningFloor <= this.rooms.length - 1; runningFloor++) {
      Object.entries(this.rooms[runningFloor]).forEach((array) => {
        if (!array[1].status) {

          availableRooms.push(runningFloor + 1 + array[0]);
        }
      })
    }

    console.log(availableRooms.toString());
  }

  book(room, name, age) {
    const [floor, ...number] = room.toString();
    const roomNumber = number.join("");

    if (this.rooms[floor - 1][roomNumber].status !== "checkin") {
      this.rooms[floor - 1][roomNumber] = {
        status: "checkin",
        user: {
          name,
          age
        }
      }
      console.log(`Room ${room} is booked by ${name} with keycard number 1.`);
    } else {
      console.log(`Cannot book room ${floor + roomNumber} for ${name}, The room is currently booked by ${this.rooms[floor - 1][roomNumber].user.name}.`)
    }


  }

  checkoutRoom(room, guessName) {
    const [floor, ...number] = room.toString();
    const roomNumber = number.join("");

    // Keycard not implement yet. So Do keycard first krub.

    // console.log('keycards',this.keycards)



    // if (guessName === this.rooms[floor - 1][roomNumber].user.name) {
    //   this.rooms[floor - 1][roomNumber] = {...this.rooms[floor - 1][roomNumber], status: null, user: null};
    //
    //   console.log(`Room ${room} is checkout.`);
    //
    // }
  }
}

module.exports = Hotel;
