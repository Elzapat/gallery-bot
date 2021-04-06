import { Message, Collection, Snowflake, Channel, TextChannel } from "discord.js";
import { readFileSync } from "fs";

export async function scan_channel(message: Message, args: string[]) {
    let config = JSON.parse(readFileSync("config.json").toString());
    let guild_id = message.guild!.id;
    if (config[guild_id]["gallery-channel"] == undefined) {
        message.channel.send("The gallery channel hasn't been set. Use the config command to set it.");
        return;
    }

    message.client.channels.fetch(config[guild_id]["gallery-channel"])
        .then(async (gallery: Channel) => {
            let all_messages: Collection<String, Message>[] = Array();
            let messages: Collection<string, Message> = new Collection();
            let last_message: Snowflake = message.id;
            console.log("starting to get all messages of channel");
            do {
                messages = await message.channel.messages.fetch({ limit: 100, before: last_message});
                last_message = messages.last()!.id;
                all_messages.push(messages);
            } while (messages.size >= 100);
            console.log("finished:" + all_messages.length);

            for (let i = all_messages.length - 1; i >= 0; i--) {
                let message_array = all_messages[i].array();
                for(let j = message_array.length - 1;  j >= 0; j--) {
                    if (message_array[j].attachments.size > 0) {
                        for (const a of message_array[j].attachments) {
                            if (a[1].url.match(/\.(jpeg|jpg|gif|png)$/) != null)
                                (gallery as TextChannel).send(a[1].url); 
                        }
                    }
                }
            }
            console.log("finished_scan");
        });
}
