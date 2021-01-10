class Hotel {
  constructor(floor, roomPerFloor) {
    this.floor = floor;
    this.roomPerFloor = roomPerFloor;
    this.rooms = [];
    this.keycards = [];
    this.bookings = [];
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
    console.log(
      `Hotel created with ${this.floor} floor(s), ${this.roomPerFloor} room(s) per floor.`
    );
  }

  booking(roomNumber, guestName, guestAge) {
    const booking = this.bookings.find(
      booking => +booking.roomNumber === roomNumber
    );

    if (!booking) {
      const room = this.rooms.find(room => +room.roomNumber === roomNumber);
      const keycard = this.keycards.find(
        keycard => !this.bookings.some(booking => booking.keycard === keycard)
      );

      this.bookings.push({
        ...room,
        keycard,
        guestName,
        guestAge
      });
      console.log(
        `Room ${roomNumber} is booked by ${guestName} with keycard number ${keycard}.`
      );
    } else {
      console.log(
        `Cannot book room ${roomNumber} for ${guestName}, The room is currently booked by ${booking.guestName}.`
      );
    }
  }
}

module.exports = Hotel;
