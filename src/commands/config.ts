import { Message } from "discord.js";
import { readFileSync, writeFileSync } from "fs";

export async function config(message: Message, args: string[]) {
    switch (args[1]) {
        case "gallery-channel":
            if (message.guild != null) {
                let config = JSON.parse(readFileSync("config.json").toString());
                let guild_id = message.guild!.id;
                config[guild_id] = {
                    "gallery-channel": args[2].replace(/[<>#]+/g, "")
                };
                writeFileSync("config.json", JSON.stringify(config));
                
                message.channel.send(`The channel ${args[2]} is now the gallery channel`);
            }
            break;
    }
}
