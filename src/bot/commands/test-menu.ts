import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  MessageFlags,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";

class TestMenuCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-menu")
    .setDescription("Envia um select menu de teste");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    const selectRow =
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("test-menu")
          .setPlaceholder("Escolha uma opção")
          .addOptions([
            { label: "Opção 1", value: "1" },
            { label: "Opção 2", value: "2" },
          ]),
      );

    await interaction.reply({
      content: "Escolha uma opção abaixo:",
      components: [selectRow],
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default new TestMenuCommand();
