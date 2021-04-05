const socket = io() //https://socket.io/docs/v3/client-initialization/

socket.on('connect', () => {
    console.log(socket.id)
})
console.log('i am connected')