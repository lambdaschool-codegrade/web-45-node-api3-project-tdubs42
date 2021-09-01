const server = require('./api/server')
const port = 5000

server.listen(port, () => console.log(`CORS protected server listening on port ${port}`))
