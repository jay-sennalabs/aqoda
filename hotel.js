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

  listAvailableRooms() {
    const availableRooms = this.rooms
      .filter(
        room =>
          !this.bookings.some(booking => booking.roomNumber === room.roomNumber)
      )
      .map(room => room.roomNumber);

    if (availableRooms.length) {
      console.log(availableRooms.join(", "));
    } else {
      console.log("No avilable rooms");
    }
  }

  checkout(keycard, guestName) {
    const booking = this.bookings.find(booking => booking.keycard === keycard);

    if (booking) {
      if (booking.guestName === guestName) {
        this.bookings = this.bookings.filter(
          booking => booking.keycard !== keycard
        );
        console.log(`Room ${booking.roomNumber} is checkout.`);
      } else {
        console.log(
          `Only ${booking.guestName} can checkout with keycard number ${booking.keycard}.`
        );
      }
    }
  }

  listGuestName() {
    const guestsName = this.bookings.map(booking => booking.guestName);

    if (guestsName.length) {
      console.log(guestsName.join(", "));
    } else {
      console.log("No guests");
    }
  }

  getGuestByRoom(roomNumber) {
    const booking = this.bookings.find(
      booking => +booking.roomNumber === roomNumber
    );

    if (booking) {
      console.log(booking.guestName);
    } else {
      console.log(`No guests found in the room ${roomNumber}.`);
    }
  }

  listGuestByAge(operator, age) {
    const guestsName = this.bookings
      .filter(booking => eval(`${booking.guestAge} ${operator} ${age}`))
      .map(booking => booking.guestName);

    if (guestsName.length) {
      console.log(guestsName.join(", "));
    } else {
      console.log(`No guests found ${operator} ${age} years old.`);
    }
  }
}

module.exports = Hotel;
