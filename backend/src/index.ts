import { createServer } from "http";
import { initSocket } from "./config/socket";
import { app } from "./server";
import { env } from "./utils/env";

const PORT = env.PORT

const httpServer = createServer(app)

initSocket(httpServer)

const server = httpServer.listen(PORT, () => {
    console.log(`server start at http://${env.HOST}:${PORT}`)
})

const onCloseSignal = () => {
    console.log("shutting down")
    server.close(() => {
        console.log('signal recieved, shutting down')
        process.exit()
    })
    setTimeout(() => {
        process.exit(1)
    }, 10000).unref();
}

process.on("SIGINT", onCloseSignal)
process.on("SIGTERM", onCloseSignal)