import { Message } from "discord.js";
import { readFileSync, writeFileSync } from "fs";

export async function config(message: Message, args: string[]) {
    switch (args[1]) {
        case "gallery-channel":
            let config = JSON.parse(readFileSync("config.json").toString());
            config["gallery-channel"] = args[2].replace("<#", "").replace (">", "");
            writeFileSync("config.json", JSON.stringify(config));
            
            message.channel.send(`The channel ${args[2]} is now the gallery channel`);
            break;
    }
}
