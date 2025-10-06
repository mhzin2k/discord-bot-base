import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";

class TestCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-button")
    .setDescription("Envia um botão de teste");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    const button = new ButtonBuilder()
      .setCustomId("test")
      .setLabel("Teste")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await interaction.reply({
      content: "",
      components: [row],
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default new TestCommand();
