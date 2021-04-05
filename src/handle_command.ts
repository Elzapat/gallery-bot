import { scan_channel } from "./commands/scan_channel";
import { config } from "./commands/config"
import { Message } from "discord.js";
require("dotenv").config();

export function handleCommand(message: Message, PREFIX: string) {
    let args: string[] = message.content.split(" ");

    switch (args[0].toLowerCase().substring(PREFIX.length)) {
        case "scan_channel": scan_channel(message, args); break;
        case "config": config(message, args); break;
    }
}
