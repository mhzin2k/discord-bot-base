import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { Command, ExtendedClient } from "../core";

class PingCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com Pong!");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    await interaction.reply(`Pong! Latência: ${client.ws.ping}ms`);
  }
}

export default new PingCommand();
