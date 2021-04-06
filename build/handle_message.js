"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = void 0;
const handle_command_1 = require("./handle_command");
const fs_1 = require("fs");
function handleMessage(message) {
    const PREFIX = "|:|";
    if (message.author.bot || message.guild == null) {
        return;
    }
    else if (message.content.startsWith(PREFIX)) {
        handle_command_1.handleCommand(message, PREFIX);
    }
    else if (message.attachments.size > 0) {
        let config = JSON.parse(fs_1.readFileSync("config.json").toString());
        let guild_id = message.guild.id;
        if (config[guild_id]["gallery-channel"] == undefined) {
            message.channel.send("The gallery channel hasn't been set. Use the config command to set it.");
            return;
        }
        try {
            message.client.channels.fetch(config[guild_id]["gallery-channel"])
                .then((gallery) => {
                if (gallery.type != "text") {
                    message.channel.send("The gallery channel isn't a text channel.");
                    return;
                }
                for (const a of message.attachments) {
                    if (a[1].url.match(/\.(jpeg|jpg|gif|png)$/) != null)
                        gallery.send(a[1].url);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.handleMessage = handleMessage;
