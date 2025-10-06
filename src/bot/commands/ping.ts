import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";

class PingCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com Pong!");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    const button = new ButtonBuilder()
      .setCustomId("reping")
      .setLabel("Reping")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await interaction.reply({
      content: `Pong! Latência: ${client.ws.ping}ms`,
      components: [row],
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default new PingCommand();
