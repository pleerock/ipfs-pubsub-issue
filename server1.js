import { create } from "ipfs-core"

async function init() {
    const ipfsd = await create({
        repo: "./ipfs-user-1",
        EXPERIMENTAL: {
            ipnsPubsub: true,
        },
        config: {
            Addresses: {
                Swarm: [
                    "/ip4/0.0.0.0/tcp/9001",
                    // "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
                ],
            },
        },
    })

    await ipfsd.pubsub.subscribe("SOME_EVENT", (message) => {
        console.log("GOT SOME EVENT", new TextDecoder().decode(message.data))
    })

    const stop = async () => {
        try {
            await ipfsd.stop()
        } catch (e) {
            console.log(e.message)
        }
        process.exit()
    }
    process.on("SIGTERM", stop)
    process.on("SIGINT", stop)
    process.on("SIGHUP", stop)
    process.on("uncaughtException", stop)
}

init()