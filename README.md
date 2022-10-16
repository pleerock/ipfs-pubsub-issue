# Instructions

1. run `server1.js` via `npm run server1`
2. run `server2.js` via `npm run server2`

You'll see how server2 sends the messages to the server1 using pubsub.
There is an interval which sends the message every second.

At some point of time (in my tests it was after 60+ messages being received)
by the server1 - server1 just stops receiving the messages.
Please be patient with the reproduction, you need to wait a bit.

If you stop `server1` and run it again, you'll see it won't receive any messages,
**UNTIL YOU COMPLETELY REMOVE** repo directory (e.g. `rm -rf ./ipfs-user-1`).