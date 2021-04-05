"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommand = void 0;
const scan_channel_1 = require("./commands/scan_channel");
const config_1 = require("./commands/config");
require("dotenv").config();
function handleCommand(message, PREFIX) {
    let args = message.content.split(" ");
    switch (args[0].toLowerCase().substring(PREFIX.length)) {
        case "scan_channel":
            scan_channel_1.scan_channel(message, args);
            break;
        case "config":
            config_1.config(message, args);
            break;
    }
}
exports.handleCommand = handleCommand;
