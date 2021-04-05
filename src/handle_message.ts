import { Message, Channel, TextChannel } from "discord.js";
import { handleCommand } from "./handle_command";
import { readFileSync } from "fs";

export function handleMessage(message: Message) {
    const PREFIX: string = "|:|";

    if (message.author.bot) {
        return;
    } else if (message.content.startsWith(PREFIX)) {
        handleCommand(message, PREFIX);
    } else if (message.attachments.size > 0) {
        let config = JSON.parse(readFileSync("config.json").toString());
        if (config["gallery-channel"] == undefined) {
            message.channel.send("The gallery channel hasn't been set. Use the config command to set it.");
            return;
        }

        try {
            message.client.channels.fetch(config["gallery-channel"])
                .then((gallery: Channel) => {
                    if (gallery.type != "text") {
                        message.channel.send("The gallery channel isn't a text channel.");
                        return;
                    }
                    for (const a of message.attachments) {
                        if (a[1].url.match(/\.(jpeg|jpg|gif|png)$/) != null)
                            (gallery as TextChannel).send(a[1].url); 
                    }
                });
        } catch (error) {
            console.log(error);
        } 
    }
}
