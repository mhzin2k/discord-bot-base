import {
  Client,
  ClientEvents,
  Collection,
  GatewayIntentBits,
  Partials,
} from "discord.js";

import fs from "fs";
import path from "path";

import { logger } from "../utils/logger";

import { Button, Command, Event, Modal, SelectMenu } from "./";

export class ExtendedClient extends Client {
  public commands = new Collection<string, Command>();
  public buttons = new Collection<string, Button>();
  public modals = new Collection<string, Modal>();
  public selectMenus = new Collection<string, SelectMenu>();

  constructor() {
    super({
      intents: Object.values(GatewayIntentBits) as GatewayIntentBits[],
      partials: Object.values(Partials) as Partials[],
    });
  }

  async loadCommands() {
    const commandsPath = path.join(__dirname, "..", "bot", "commands");
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const imported = await import(`file://${filePath}`);
      const command: Command = imported.default;

      if ("data" in command && "execute" in command) {
        this.commands.set(command.data.name, command);
        logger.info(`[+] Comando carregado: ${command.data.name}`);
      } else {
        logger.warn(
          `[!] Comando invalido em ${file}: faltando "data" ou "execute"`,
        );
      }
    }

    logger.info(`[=>] Total de comandos carregados: ${this.commands.size}`);
  }

  async loadEvents() {
    const eventsPath = path.join(__dirname, "..", "bot", "events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".ts"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const imported = await import(`file://${filePath}`);
      const event: Event<keyof ClientEvents> = imported.default;

      if ("once" in event && "execute" in event) {
        if (event.once) {
          this.once(event.name, (...args) => event.execute(this, ...args));
        } else {
          this.on(event.name, (...args) => event.execute(this, ...args));
        }
        logger.info(`[+] Evento carregado: ${event.name}`);
      } else {
        logger.warn(
          `[!] Evento invalido em ${file}: faltando "once" ou "execute"`,
        );
      }
    }

    logger.info(`[=>] Total de eventos carregados: ${eventFiles.length}`);
  }

  async loadInteractions() {
    const basePath = path.join(__dirname, "..", "bot", "interactions");
    const folders = [
      { name: "buttons", collection: this.buttons, label: "Botao" },
      { name: "modals", collection: this.modals, label: "Modal" },
      { name: "menus", collection: this.selectMenus, label: "Menu" },
    ];

    for (const { name, collection, label } of folders) {
      const folderPath = path.join(basePath, name);

      if (!fs.existsSync(folderPath)) {
        logger.warn(`[!] Pasta "${name}" nao encontrada`);
        continue;
      }

      const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".ts"));

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const imported = await import(`file://${filePath}`);
        const interaction = imported.default;

        if ("customId" in interaction && "execute" in interaction) {
          collection.set(interaction.customId, interaction);
          logger.info(`[+] ${label} carregado: ${interaction.customId}`);
        } else {
          logger.warn(
            `[!] ${label} invalido em ${file}: faltando "customId" ou "execute"`,
          );
        }
      }

      logger.info(`[=>] Total de ${name} carregados: ${collection.size}`);
    }
  }

  async start(token: string) {
    await this.loadCommands();
    await this.loadInteractions();
    await this.loadEvents();
    await this.login(token);
  }
}
