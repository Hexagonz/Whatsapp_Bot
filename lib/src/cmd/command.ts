import util from "util";
import { MessageType } from "@adiwajshing/baileys"

globalThis.CMD.on('eval', /(?:)/, async (client, { mess, from, command, match, _text, body}) => {
   let _return: any;
   let code: string = (/=/i.test(match[0]) ? 'return ' : '') + _text
   try {
     _return = await eval(`;(async() => { ${code}})()`)
   } catch(err) {
     _return = err
   } finally {
     return await client.sendMessage(from, util.format(_return), MessageType.extendedText, { quoted: mess})
   }
  
}, { noPrefix: false, owner: false, prefix: /=?>/})

export var cmd: string = 'test';