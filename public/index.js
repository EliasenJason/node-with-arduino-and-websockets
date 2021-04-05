
//https://socket.io/docs/v3/client-initialization/
const socket = io() 

socket.on('connect', () => {
    console.log(socket.id)
})

socket.on('potValue', (data) => {
    document.getElementById('potValue').innerHTML = data
    console.log(data)
})