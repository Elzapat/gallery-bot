import { Message } from "discord.js";

export async function scan_channel(message: Message, args: string[]) {
    message.channel.messages.fetch().then((messages => {
        console.log(`Received ${messages.size} messages`);
    }));
}
