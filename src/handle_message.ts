import { Message, Channel, TextChannel } from "discord.js";
import { handleCommand } from "./handle_command";
import { readFileSync } from "fs";

export function handleMessage(message: Message) {
    const PREFIX: string = "|:|";

    if (message.author.bot || message.guild == null) {
        return;
    } else if (message.content.startsWith(PREFIX)) {
        handleCommand(message, PREFIX);
    } else if (message.attachments.size > 0) {
        let config = JSON.parse(readFileSync("config.json").toString());
        let guild_id = message.guild!.id;
        if (config[guild_id]["gallery-channel"] == undefined) {
            message.channel.send("The gallery channel hasn't been set. Use the config command to set it.");
            return;
        }

        try {
            message.client.channels.fetch(config[guild_id]["gallery-channel"])
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
