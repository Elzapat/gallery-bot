import { Client } from "discord.js";
import { handleMessage } from "./handle_message";
require("dotenv").config();


const client: Client = new Client();

client.once("ready", () => console.log("Ready!"));

client.on("message", message => handleMessage(message));

client.login(process.env.TOKEN);
