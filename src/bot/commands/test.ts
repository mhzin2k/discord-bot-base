import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";

class TestCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test")
    .setDescription("Envia um teste");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    await interaction.reply({
      content: "Teste",
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default new TestCommand();
