"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const handle_message_1 = require("./handle_message");
require("dotenv").config();
const client = new discord_js_1.Client();
client.once("ready", () => console.log("Ready!"));
client.on("message", message => handle_message_1.handleMessage(message));
client.login(process.env.TOKEN);
