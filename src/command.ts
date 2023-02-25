import { BOT_TOKEN } from "../config";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

// 注册指令
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "say",
    description: "say something",
  },
  {
    name: "ts",
    description: "translate something",
  },
];

const rest = new REST({ version: "9" }).setToken(BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest
      .put(
        Routes.applicationGuildCommands(
          "905298955011784735",
          "905296187207344158"
        ),
        { body: commands }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.requestBody);
      });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
