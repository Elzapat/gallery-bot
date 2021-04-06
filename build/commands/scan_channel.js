"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scan_channel = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
async function scan_channel(message, args) {
    let config = JSON.parse(fs_1.readFileSync("config.json").toString());
    let guild_id = message.guild.id;
    if (config[guild_id]["gallery-channel"] == undefined) {
        message.channel.send("The gallery channel hasn't been set. Use the config command to set it.");
        return;
    }
    message.client.channels.fetch(config[guild_id]["gallery-channel"])
        .then(async (gallery) => {
        let all_messages = Array();
        let messages = new discord_js_1.Collection();
        let last_message = message.id;
        console.log("starting to get all messages of channel");
        do {
            messages = await message.channel.messages.fetch({ limit: 100, before: last_message });
            last_message = messages.last().id;
            all_messages.push(messages);
        } while (messages.size >= 100);
        console.log("finished:" + all_messages.length);
        for (let i = all_messages.length - 1; i >= 0; i--) {
            let message_array = all_messages[i].array();
            for (let j = message_array.length - 1; j >= 0; j--) {
                if (message_array[j].attachments.size > 0) {
                    for (const a of message_array[j].attachments) {
                        if (a[1].url.match(/\.(jpeg|jpg|gif|png)$/) != null)
                            gallery.send(a[1].url);
                    }
                }
            }
        }
        console.log("finished_scan");
    });
}
exports.scan_channel = scan_channel;
