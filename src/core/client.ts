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

import { Command } from "./command";
import { Event } from "./event";

export class ExtendedClient extends Client {
  public commands = new Collection<string, Command>();

  constructor() {
    super({
      intents: Object.values(GatewayIntentBits) as GatewayIntentBits[],
      partials: Object.values(Partials) as Partials[],
    });
  }

  async loadCommands() {
    const commandsPath = path.join(__dirname, "..", "commands");
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const imported = await import(`file://${filePath}`);
      const command: Command = imported.default;

      if ("data" in command && "execute" in command) {
        this.commands.set(command.data.name, command);
        logger.info(`Comando carregado: ${command.data.name}`);
      } else {
        logger.warn(
          `O comando em ${filePath} está faltando "data" ou "execute"`,
        );
      }
    }

    logger.info(`Total de comandos carregados: ${this.commands.size}`);
  }

  async loadEvents() {
    const eventsPath = path.join(__dirname, "..", "events");
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
        logger.info(`Evento carregado: ${event.name}`);
      } else {
        logger.warn(
          `O evento em ${filePath} está faltando "once" ou "execute"`,
        );
      }
    }

    logger.info(`Total de eventos carregados: ${eventFiles.length}`);
  }

  async start(token: string) {
    await this.loadCommands();
    await this.loadEvents();
    await this.login(token);
  }
}
