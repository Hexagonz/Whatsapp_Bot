import { Command } from '../src/command';
//type CommandType = Command

declare global {
  var CMD: Command;
  var prefix: string | string[]
}