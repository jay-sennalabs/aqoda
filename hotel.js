class Hotel {
  constructor(floor = 0, roomPerFloor = 0) {
    this.floor = floor;
    this.roomPerFloor = roomPerFloor;
    this.rooms = [];
  }

  createHotel() {
    this.rooms = Array.from({ length: this.floor }).map((_, i) =>
      Array.from({ length: this.roomPerFloor }).map((_, i) => {
        let roomNumber = i + 1 < 10 ? "0" + i + 1 : i + 1;
        return {
          roomNumber,
          status: null,
          user: {
            name: null,
            age: null
          }
        };
      })
    );
  }
}

module.exports = Hotel;
