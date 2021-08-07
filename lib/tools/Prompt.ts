import prompt from 'prompt-sync'
import * as fs from 'fs'
import chalk from 'chalk'
import { Stating } from '../functions/log'
import { config } from 'dotenv'
config({ path: './.env' })

export const StartingLog = () => {
    return void Stating(String(process.env.ownerNumber).replace(/\D/g, ''), String(process.env.bot))
}
