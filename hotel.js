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
    this.rooms = Array.from({ length: this.floor }).map((_, i) =>
      Array.from({ length: this.roomPerFloor })
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
        .reduce((all, room) => ({ ...all, [room.roomNumber]: room }), {})
    );

    this.keycards = Array.from({
      length: this.floor * this.roomPerFloor
    }).map((_, i) => ({ key: i + 1, room: null }));
  }

  book(room, name, age) {
    const [floor, ...number] = room.toString();
    const roomNumber = number.join("");
    this.rooms[floor - 1][roomNumber] = {
      status: "checkin",
      user: {
        name,
        age
      }
    };
  }
}

module.exports = Hotel;
