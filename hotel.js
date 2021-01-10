class Hotel {
  constructor(floor, roomPerFloor) {
    this.floor = floor;
    this.roomPerFloor = roomPerFloor;
    this.rooms = [];
    this.keycards = [];
  }

  createHotel() {
    for (let i = 1; i <= this.floor; i++) {
      for (let j = 1; j <= this.roomPerFloor; j++) {
        const room = j < 10 ? "0" + j : j;
        const roomNumber = `${i}${room}`;
        this.rooms.push({
          floor: i,
          roomNumber
        });

        this.keycards.push(i * this.roomPerFloor - this.roomPerFloor + j);
      }
    }
  }
}

module.exports = Hotel;
