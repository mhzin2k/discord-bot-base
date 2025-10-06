import { MessageFlags } from "discord.js";
import {
  AnySelectMenuInteraction,
  ExtendedClient,
  SelectMenu,
} from "../../../core";

class TestSelectMenu extends SelectMenu {
  customId = "test-menu";

  async execute(client: ExtendedClient, interaction: AnySelectMenuInteraction) {
    await interaction.reply({
      content: `Você selecionou: ${interaction.values.join(", ")}`,
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default new TestSelectMenu();
