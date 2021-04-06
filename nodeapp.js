const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const { Board, Led, Sensor } = require("johnny-five")

//globals
let oldPotValue
let potValue = 0

//johnny five

const board = new Board({
  port: "com3"
});

board.on("ready", function() {
  let led = new Led(13)
  led.blink(500);
  let pot = new Sensor("A3")
  pot.on("change", (value) => {
    oldPotValue = value
    if (potValue > oldPotValue + 5 || potValue < oldPotValue - 5) {
      potValue = value
      console.log("  value  : ", value);
    }
  })
});

//io

io.on('connection', (socket) => {
  console.log('client connected')
  console.log(`Socket ID = ${socket.id}`)
  setInterval(() => {
    socket.emit('potValue', potValue)
  },1000)
  socket.on('disconnect', () => {
    console.log('client disconnected')
  })
})


//express

http.listen(3000, () => {
  console.log('i am listening on port 3000')
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
