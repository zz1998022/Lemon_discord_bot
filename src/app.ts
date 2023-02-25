// 引入配置文件
import { deepl_key, BOT_TOKEN } from "../config";
// 引入discordjs
import { Client, Intents, MessageEmbed } from "discord.js";
// 引入Deepl翻译
import Deepl from "./utils/translate";
// 引入色图插件
import { getSetu } from "./utils/setu";

// 初始化Deepl翻译
const deepl = new Deepl(deepl_key);
// 初始化客户端
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
// 读取配置文件

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// 监听用户输入消息
client.on("messageCreate", async (msg) => {
  console.log(msg.content);
  // 将字符串分割为数组
  const language = msg.content.substring(0, 6);
  const messageContent = msg.content.substring(6);
  // console.log(messageContent);
  switch (language) {
    case "TS_JA ":
      // 翻译为日语
      const text_JA = await deepl.translate({
        text: messageContent,
        target_lang: "ja",
      });
      msg.reply(text_JA.toString());
      break;
    case "TS_CN ":
      // 翻译为中文
      const text_CN = await deepl.translate({
        text: messageContent,
        target_lang: "zh",
      });
      msg.reply(text_CN.toString());
      break;
  }

  // 672737629850173440
  if (msg.author.id === "635074176759365632") {
    // 对消息进行翻译
    deepl
      .translate({ text: msg.content, target_lang: "zh" })
      .then((text) => {
        msg.reply(text);
      })
      .catch(() => {
        msg.reply("翻译功能出错，请联系 @柠檬就是酸");
      });
  }
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});
// 监听用户输入消息
client.on("messageCreate", async (msg) => {
  // 判断用户输入的是否是指令
  const { content } = msg;
  const instru = content.slice(0, 5);
  const embed: MessageEmbed = new MessageEmbed();
  if (instru === "!setu") {
    // 对消息进行切割
    const params = content.split(" ")[1];
    const tags = params ? params.split(/\uff0c|\u002c/) : [];
    console.log(params);
    console.log(tags);
    // 判断用户是否输入了tag
    if (!params) {
      // 直接调用api
      getSetu().then((res) => {
        const data = res.data[0];
        embed
          .setTitle(`作者: ${data.author}`)
          .setDescription(`标签: ${data.tags.toString()}`)
          .setURL(data.urls.original)
          .setImage(data.urls.original);

        msg.channel.send({ embeds: [embed] });
      });
    } else {
      getSetu({ tag: tags })
        .then((res) => {
          const data = res.data[0];
          embed
            .setTitle(`作者: ${data.author}`)
            .setDescription(`标签: ${data.tags.toString()}`)
            .setURL(data.urls.original)
            .setImage(data.urls.original);

          msg.channel.send({ embeds: [embed] });
        })
        .catch(() => {
          msg.channel.send("参数错误，请按照格式输入：!setu tag1,tag2,tag3...");
        });
    }
  }
});
// 监听用户输入的指令
client.on("interactionCreate", async (interaction) => {
  // 判断用户输入的是否是指令
  if (!interaction.isCommand()) return;
  // interaction.options.getString()
  switch (interaction.commandName) {
    case "ping":
      await interaction.reply("pong");
      break;
    case "ts":
      console.log(111);
      console.log(interaction.command.equals);
      break;
  }
});

client
  .login(BOT_TOKEN)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("登录失败!");
    console.log(err);
  });

// client.destroy;
