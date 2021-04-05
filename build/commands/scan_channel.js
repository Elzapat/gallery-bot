"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scan_channel = void 0;
async function scan_channel(message, args) {
    message.channel.messages.fetch().then((messages => {
        console.log(`Received ${messages.size} messages`);
    }));
}
exports.scan_channel = scan_channel;
