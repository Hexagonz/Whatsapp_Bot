import { Mongoose } from '../../routers/connect/mongoodb'
import { Registrasi } from '../../typings'

export class register extends Mongoose {
    private register = this.Client.get('register')
    constructor() {
        super()
    }
    public async CheckRegister(sender: string): Promise<boolean> {
        let status: boolean = false
        const respon = await this.register.findOne({ id: sender })
        if (respon !== null) {
            status = true
        }
        return status
    }
    public async addRegisters(sender: string): Promise<void> {
        if (await this.CheckRegister(sender)) return
        const Format: Registrasi = {
            id: sender,
            status: false,
            hit: 1,
            prefix: [
                '@',
                '#',
                '$',
                '%',
                '°',
                '•',
                'π',
                '÷',
                '×',
                '¶',
                '∆',
                '£',
                '¢',
                '€',
                '¥',
                '®',
                '™',
                '✓',
                '_',
                '=',
                '|',
                '~',
                '!',
                '^',
                '&',
                '.',
                '©',
                "'",
                '"',
                '`'
            ],
            multi: true,
            Prefix: '.'
        }
        return void (await this.register.insert(Format))
    }
    public async VerifyCheckDb(sender: string): Promise<boolean> {
        let status: boolean = false
        if (!(await this.CheckRegister(sender))) return status
        const _database: Registrasi = await this.register.findOne({ id: sender })
        return _database.status
    }
    public async DoneVerify(sender: string): Promise<void> {
        if (!(await this.CheckRegister(sender))) return
        return void (await this.register.findOneAndUpdate({ id: sender }, { $set: { status: true } }))
    }
    public async addHIT(sender: string): Promise<void> {
        if (!(await this.CheckRegister(sender))) return
        const _database: Registrasi = await this.register.findOne({ id: sender })
        return void (await this.register.findOneAndUpdate({ id: sender }, { $set: { hit: Number(_database.hit + 1) } }))
    }
    public async getHIT(sender: string): Promise<number> {
        if (!(await this.CheckRegister(sender))) return 0
        const _database: Registrasi = await this.register.findOne({ id: sender })
        return _database.hit
    }
    public async setprefix(sender: string, Prefix: string | undefined): Promise<void> {
        if (!(await this.CheckRegister(sender))) return
        return void (await this.register.findOneAndUpdate({ id: sender }, { $set: { Prefix: Prefix ? Prefix : '.' } }))
    }
    public async addMultiPrefix(sender: string, Prefix: string): Promise<boolean> {
        if (!(await this.CheckRegister(sender))) return false
        const _database: Registrasi = await this.register.findOne({ id: sender })
        let status: boolean = true
        _database.prefix.map((value: string) => {
            if (value === Prefix) status = false
        })
        if (!status) return false
        const _format: string[] = _database.prefix
        _format.push(Prefix)
        await this.register.findOneAndUpdate({ id: sender }, { $set: { prefix: _format } })
        return true
    }
    public async delMultiPrefix(sender: string, Prefix: string): Promise<boolean> {
        if (!(await this.CheckRegister(sender))) return false
        const _database: Registrasi = await this.register.findOne({ id: sender })
        if (_database.prefix.find((value) => value == Prefix)) {
            const _format: string[] = _database.prefix
            _format.splice(
                _database.prefix.findIndex((value) => value == Prefix),
                1
            )
            await this.register.findOneAndUpdate({ id: sender }, { $set: { Prefix: _format } })
            return true
        } else {
            return false
        }
    }
    public async getMultiPrefix(sender: string): Promise<string> {
        const _database: Registrasi = await this.register.findOne({ id: sender })
        return _database.prefix.join(', ')
    }
    public async statusPrefix(sender: string): Promise<boolean> {
        if (!(await this.CheckRegister(sender))) return false
        let status: boolean = true
        const _database: Registrasi = await this.register.findOne({ id: sender })
        if (_database.multi) {
            status = true
        }
        return status
    }
    public async multiPRefix(status: boolean, sender: string): Promise<boolean> {
        if (!(await this.CheckRegister(sender))) return false
        if (status) {
            await this.register.findOneAndUpdate({ id: sender }, { $set: { multi: true } })
            return true
        } else {
            await this.register.findOneAndUpdate({ id: sender }, { $set: { multi: false } })
            return false
        }
    }
    public async GetPrefix(sender: string, command: string): Promise<string> {
        if (!(await this.CheckRegister(sender))) return '.'
        const _database: Registrasi = await this.register.findOne({ id: sender })
        if (_database.multi) {
            let hasil: string = 'MULTI PREFIX'
            _database.prefix.map((value: string) => {
                if (command.startsWith(value)) {
                    hasil = value
                }
            })
            return hasil
        } else {
            return _database.Prefix
        }
    }
}
