import { register as Registrasi } from '.'

export class AFK extends Registrasi {
    private _database = this.Client.get('afk')
    constructor() {
        super()
    }
    public async AddAfk(
        sender: string,
        format: { id: string; from: string; alasan: string; time: number }
    ): Promise<void> {
        if (await this.checkAfk(sender)) return
        return void (await this._database.insert(format))
    }
    public async checkAfk(sender: string): Promise<boolean> {
        let status: boolean = false
        if (await this._database.findOne({ id: sender })) {
            status = true
        }
        return status
    }
    public async delAfk(sender: string): Promise<void> {
        if (!(await this.checkAfk(sender))) return
        return void (await this._database.remove({ id: sender }))
    }
    public async getDataAfk(sender: string): Promise<{ id: string; from: string; alasan: string; time: number }> {
        return this._database.findOne({ id: sender })
    }
}
