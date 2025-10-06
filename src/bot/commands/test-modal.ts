import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";

class TestModalCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-modal")
    .setDescription("Envia um modal de teste");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    const modal = new ModalBuilder()
      .setCustomId("test-modal")
      .setTitle("Modal de Teste");

    const input = new TextInputBuilder()
      .setCustomId("testInput")
      .setLabel("Digite algo")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(input),
    );

    await interaction.showModal(modal);
  }
}

export default new TestModalCommand();
