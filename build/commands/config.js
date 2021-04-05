"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const fs_1 = require("fs");
async function config(message, args) {
    switch (args[1]) {
        case "gallery-channel":
            let config = JSON.parse(fs_1.readFileSync("config.json").toString());
            config["gallery-channel"] = args[2].replace("<#", "").replace(">", "");
            fs_1.writeFileSync("config.json", JSON.stringify(config));
            message.channel.send(`The channel ${args[2]} is now the gallery channel`);
            break;
    }
}
exports.config = config;
