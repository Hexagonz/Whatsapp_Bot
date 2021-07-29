import { WAConnection, WAMessage } from "@adiwajshing/baileys";
import CMDError from "./CmdError";
import { HandlingMessage } from "../typings"
import chalk from "chalk"




interface Init {
  prefix?: RegExp;
  noPrefix?: boolean;
  group?: boolean;
  private?: boolean;
  mods?: boolean;
  premium?: boolean;
  botAdmin?: boolean;
  admin?: boolean;
  limit?: boolean | number;
  owner?: boolean
  tags?: string[]
  help?: string[]
}


export class Command {
  public events = {}
  public _prefix: string = '#'
  public client: WAConnection
  public prefix: string | string[] | RegExp
  constructor(p: string | string[]) {
    this.prefix = new RegExp(`^[${typeof p == 'string' ? p : p.join('')}]`)
  }
  
  public on(eventName: string, pattern, callback: any, _init: Init = {}) {
    console.log(chalk.red('[CMD]'), chalk.cyan(`Re${this.events[eventName] ? '- re': ''}gister command: ${eventName}`))
    if (!this.events[eventName]) this.events[eventName] = {
      name: eventName,
      pattern,
      callback,
      enabled: true,
      ..._init
    }
    this.events[eventName] = {
      ...this.events[eventName],
      pattern,
      callback,
      ..._init
    }
    
    
  }
  
  
  public validate(data: HandlingMessage, client: WAConnection) {
    return new Promise(async(resolve, reject) => {
          try {
            this.client = client
            const { body, groupMetadata, isOwner, bot, user } = data
            let usedPrefix: any
            for (const eventName in this.events) {
              const event = this.events[eventName]
              if (!event.enabled && !isOwner) continue
              const prefix = this.getPrefix(event)
              const match = this.getMatch(body, prefix)
              if (event.noPrefix || !event.pattern) {
                if (await event.callback(client, { match, ...data })) continue
              }
              if (typeof event.callback !== 'function') continue
              if (usedPrefix = (match || [])[0]) {
                const _text: string | undefined = body.replace(usedPrefix, '').trim()
                let [command, ...args] = _text.split(' ')
                args = args || []
                let _args: string[] = _text.split(' ').slice(1)
                let text = _args.join(' ')
                let isCmd = this.getCmd(command, event.pattern)
                if (!isCmd) continue
                if (event.owner && !isOwner) {
                  continue
                }
                if (event.admin && !(user.isAdmin || user.isSuperAdmin)) {
                  continue
                }
                if (event.botAdmin && !(bot.isAdmin || bot.isSuperAdmin)) {
                  continue
                }
                try {
                  return void await event.callback(client, { args, _args, text, command, _text, match, ...data})
                } catch(err) {
                  reject(new CMDError(err, event))
                } finally {
                  console.log(event)
                  
                }
                break
              }
            }
          } catch(err) {
            throw new CMDError(err)
          }
    })

  }
  private getCmd(s: string | null, pattern?: any) {
       const isCmd = pattern instanceof RegExp ? // RegExp Mode?
            pattern.test(s) :
            Array.isArray(pattern) ? // Array?
              pattern.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                cmd.test(s) :
                cmd === s
              ) :
              typeof pattern === 'string' ? // String?
                pattern === s :
                false
       return isCmd
  }
  
  public getPrefix(event) {
    return event.prefix ? event.prefix  : this.prefix ? this.prefix : this._prefix // Default
  }
  
  
  private getMatch(s: string, prefix) {
       let match = (prefix instanceof RegExp ?
          [[prefix.exec(s), prefix]] :
          Array.isArray(prefix) ? 
            prefix.map(p => {
              let re = p instanceof RegExp ? 
                p :
                new RegExp(this.str2Regex(p))
              return [re.exec(s), re]
            }) :
            typeof prefix === 'string' ? 
              [[new RegExp(this.str2Regex(prefix)).exec(s), new RegExp(this.str2Regex(prefix))]] :
              [[[], new RegExp('(?:)')]]
        ).find(p => p[1])
        return match
  }
  private str2Regex(s: string): string {
     return s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
  }
  
  
}