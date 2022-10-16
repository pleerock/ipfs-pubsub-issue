import { create } from "ipfs-core"

async function init() {
    const ipfsd = await create({
        repo: "./ipfs-user-2",
        EXPERIMENTAL: {
            ipnsPubsub: true,
        },
        config: {
            Addresses: {
                Swarm: [
                    "/ip4/0.0.0.0/tcp/9002",
                    // "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
                ],
            },
        },
    })

    let counter = 1
    setInterval(async () => {
        counter++
        console.log("sending event", counter)
        await ipfsd.pubsub.publish(
            "SOME_EVENT",
            new TextEncoder().encode("hello " + counter),
        )
    }, 1000)


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