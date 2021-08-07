import { instaStalk, TiktokStalk, LirikResult, Azlirik } from '../typings'
import { ChannelSearchResult } from 'yt-search'
import { WAGroupMetadata } from '@adiwajshing/baileys'
import parsems from 'parse-ms'

export const IndTest = (): string => {
    return `Test`
}
export const IndTunggu = (): string => {
    return `Tunggu sebentar sedang menjalankan perintah...`
}
export const IndBukanVid = (): string => {
    return `Maaf file yang anda kirim bukan berformat video`
}
export const IndBukanAud = (): string => {
    return `Maaf file yang anda kirim bukan berformat audio`
}
export const IndToVid = (): string => {
    return `Maaf terjadi kesalahan pada fitur media tovideo harap coba lagi`
}
export const IndToCute = (): string => {
    return `Maaf terjadi kesalahan pada fitur media tocute harap coba lagi`
}
export const IndSuccesSetPrefix = (prefix: string, status: boolean): string => {
    return `Sukses mengubah prefix menjadi ${prefix}.\n\n_*Status Prefix saat ini :* ${status ? 'multi' : prefix}_`
}
export const IndSuccesSetMulti = (status: boolean): string => {
    return `Sukses  ${status ? 'Mengaktifkan mode multi prefix' : 'Menonaktifkan mode multi prefix'}`
}
export const IndErrMulti = (status: boolean): string => {
    return `${
        status
            ? 'Anda sudah berada dalam mode multi prefix'
            : 'Anda sudah berada dalam mode non multi prefix check prefix anda, ketik prefix'
    }`
}
export const IndDonePushMulti = (Prefix: string): string => {
    return `Sukses menambakan prefix *[${Prefix}]* kedalam multi prefix`
}
export const IndErrPushMulti = () => {
    return `Harap masukkan prefix yang ingin di tambahkan kedalam multi prefix`
}
export const IndDoneDelMulti = (Prefix: string): string => {
    return `Berhasil menghapus prefix *[${Prefix}]* dalam multi prefix`
}
export const IndErrDelMulti = (): string => {
    return `Harap masukkan prefix yang ingin di dihapus dalam multi prefix`
}
export const IndMultiData = (prefix: string): string => {
    return `Multi Prefix saat ini adalah *${prefix}*`
}
export const IndBukanSticker = (): string => {
    return `Harap kirim caption dengan reply sticker`
}
export const IndGagalSticker = (): string => {
    return `Terjadi keselahan dalam menbuat sticker harap coba lagi`
}
export const IndFileGede = (sender: string): string => {
    return `Maaf ka @${sender.replace(/@s.whatsapp.net/i, '')} Size media yang anda kirim terlalu besar untuk bot`
}
export const LimitStorage = (): string => {
    return `Maaf, Limit storage anda telah habis. Agar anda bisa menggunakan kembali harap hapus salah satu media anda untuk menambah limit storage`
}
export const IndIdDuplicate = (): string => {
    return `Maaf, Id yang anda masukkan sudah ada di penyimpanan bot harap ganti dengan id lain`
}
export const IndSuccesSave = (Id: string, Prefix: string, isOwner: boolean, limit: number): string => {
    return `
*ID :* ${Id}
*STATUS :* Berhasil menyimpan media ketik ${Prefix}get ${Id} untuk mengambil file anda
*NOTES*
Sisa Limit File anda tersisa  ${
        isOwner ? 'Unlimited' : Number(4 - limit)
    }, jika habis anda tidak dapat menyimpan kembali`
}
export const IndMasukkanId = (): string => {
    return `Harap masukkan id`
}
export const IndIdStorageKosong = (): string => {
    return `Maaf id storage yang ingin anda cari kosong`
}
export const IndCheckStorage = (data: string[], sender: string): string => {
    let jumlah = 1
    let text = `*STORAGE*\n\n`
    for (let result of data) {
        text += `${jumlah}. ${result.split('.')[0].replace(sender, '')}\n`
        jumlah++
    }
    return text
}
export const IndErrorMP3 = (): string => {
    return `Maaf, Terjadi kesalahan pada fitur media mp3 silahkan coba kembali`
}
export const IgStalk = (data: instaStalk): string => {
    return `
	*INSTAGRAM STALK*
	
*🎁 Id :* ${data.id}
*🌐 Username :* ${data.username}
*🌹 Nickname :* ${data.nickname}
*⚔️ Kategori :* ${data.category}
*🎀 Bio :* ${data.bio}
*🔖Akun bisnis :* ${data.akun_bisnis ? 'Iya' : 'Tidak'}
*🔐 Private Akun :* ${data.private ? 'Iya' : 'Tidak'}
*🚨 Akun Terverifikasi :* ${data.centang ? 'Iya' : 'Tidak'}
*📦 Total Post:* ${data.total_post}
`
}
export const IndUserKosong = (pushname: string): string => {
    return `Maaf ka ${pushname} Username instagram yang anda cari kosong / akun pemilik di private`
}
export const IndUsernameNoKosong = () => {
    return `Maaf ka Harap masukkan username instagram yang ingin anda stalk`
}
export const IndYtStalk = (data: ChannelSearchResult): string => {
    return `
Nama : ${data.name}
Url : ${data.url}
Total Video : ${data.videoCount}
Total Subcriber : ${data.subCountLabel}
`
}
export const IndYtStalkError = (): string => {
    return `Fitur Yt stalk sedang error harap coba lagi nanti`
}
export const IndStalkUsernameNull = (fitur: string): string => {
    return `Username ${fitur} yang anda cari sedang kosong`
}
export const IndTiktokStalk = (data: TiktokStalk): string => {
    const Tanggal_Upload = new Date(Number(data.createTime) * 1000).toLocaleString('id', {
        year: 'numeric',
        month: 'short',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric'
    })
    return `
ID : ${data.id}
Unique Id : ${data.uniqueId}
Nickname : ${data.nickname}
Signature : ${data.signature}
Tanggal Buat : ${Tanggal_Upload}
Verived : ${data.verified ? 'Yes' : 'No'}
Private : ${data.privateAccount ? 'Yes' : 'No'}
Bio Link : ${data.bioLink ? data.bioLink.link : ''}
Room Id : ${data.roomId}
`
}
export const IndMasukkanUsernameNoUrl = (fitur: string): string => {
    return `Maaf ka harap masukkan username ${fitur} bukan Link`
}
export const Indverifikasi = (status: number, otp: string): string => {
    if (status === 1) {
        return `Kode Verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 5 menit`
    } else if (status === 2) {
        return `Kode Verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 90 menit`
    } else if (status === 3) {
        return `Kode verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 8 jam`
    } else if (status === 4) {
        return `Berhasil anda telah selesai melakukan verifikasi`
    } else {
        return ''
    }
}
export const IndPublicSucces = (status: boolean): string => {
    return `Berhasil mengubah status Bot ${status ? 'ke publik' : 'ke Self'}`
}
export const IndPublicDuplicate = (status: boolean): string => {
    return `Status Bot untuk saat ini sudah ${status ? 'PUBLIK' : 'SELF'}`
}
export const IndPrefix = (Pref: string): string => {
    return `Prefix anda untuk saat ini adalah *[${Pref}]*`
}
export const IndSpammer = (): string => {
    return `Warning Harap tunggu perintah anda sebelumnya berakhir untuk mencegah terjadinya spam`
}
export const IndStickerReply = (command: string): string => {
    return `Maaf ka harap Kirim/ reply Gambar/video/sticker dengan caption ${command} untuk menggunakan fitur sticker`
}
export const IndSpam5S = (jeda: string): string => {
    return `Maaf ka setelah anda menggunakan command ada jeda ${jeda} detik untuk anda bisa menggunakan command kembali`
}
export const StickerDuplicate = (sender: string, posisi: number): string => {
    return `Maaf ka media itu udah pernah dijadiin sticker sebelumnya di grup ini sebelumnya si @${sender.replace(
        '@s.whatsapp.net',
        ''
    )}, Urutan ${posisi} sebelumnya`
}
export const StickerFound = (sender: string): string => {
    return `Ini ka @${sender.replace('@s.whatsapp.net', '')} stickernya jangan menggunakan media yang sama`
}
export const BotGaAdmin = () => {
    return `Maaf Bot bukan admin tidak bisa melaksanakan perintah`
}
export const PilihBukatutup = () => {
    return `Format salah Pilih buka/tutup`
}
export const BukanDalamGroup = () => {
    return `Maaf ka bot bukan Perintah ini hanya tersedia didalam group`
}
export const UserBaruOut = () => {
    return `Maaf user tersebut baru baru ini keluar group anda tidak bisa memasukkannya`
}
export const UserDalamGroup = () => {
    return `Maaf user tersebut telah berada didalam group`
}
export const UserGadaDalamGroup = () => {
    return `Maaf user tersebut tidak ada didalam group`
}
export const UserPrivate = () => {
    return `Maaf tidak dapat menginvit user tersebut kedalam group kemungkinan di private`
}
export const SuccesAdd = () => {
    return `Succes add member ke group`
}
export const AddHarapTagSeseorang = () => {
    return `Maaf ka harap tag/ reply seseorang yang ingin ditambahkan`
}
export const TagOrReply = () => {
    return `Maaf ka Harap tag/reply seseorang`
}
export const isOwnerGroupNokick = () => {
    return `Maaf Bot tidak dapat mengeluarkan owner group`
}
export const kickSucces = (sender: string) => {
    return `Berhasil mengeluarkan @${sender.replace('@s.whatsapp.net', '')}`
}
export const Admindia = (sender: string) => {
    return `Tidak dapat mengeluarkan @${sender.replace(
        '@s.whatsapp.net',
        ''
    )} karena sesama admin, Hanya owner group yang bisa mengeluarkan admin`
}
export const ButakahLinkGc = () => {
    return `Butakah ? di deskripsi group ada tod, caper caper`
}
export const IndLinkGroup = (groupMetadata: WAGroupMetadata, link: string) => {
    return `
Group : ${groupMetadata.subject}
Link: ${link}`
}
export const SuccesOpenCloseGc = (Status: boolean) => {
    return Status ? 'Berhasil menutup group' : 'Berhasil membuka group'
}
export const PromoteSuccess = (tag: string) => {
    return `Berhasil menjadikan ${tag.replace('@s.whatsapp.net', '')} seorang admin`
}
export const DemoteSuccess = (tag: string) => {
    return `Berhasil menurunkan jabatan ${tag.replace('@s.whatsapp.net', '')}`
}
export const PromoteDiaAdmin = (tag: string) => {
    return `Anda tidak dapat menaikkan jabatan ${tag.replace('@s.whatsapp.net', '')} karena dia sudah menjadi admin`
}
export const DemoteBukanAdmin = (tag: string) => {
    return `Gagal, anda tidak dapat menurunkan jabatan ${tag.replace('@s.whatsapp.net', '')} karena dia bukan admin`
}
export const GagalUpdatePP = () => {
    return `Terjadi kesalahan saat ingin mengubah profile grup`
}
export const SuccesUpdatePP = () => {
    return `Berhasil mengubah foto profil group`
}
export const SuccesSetName = (nama: string) => {
    return `Berhasil mengubah nama  menjadi ${nama}`
}
export const SuccesSetDesk = () => {
    return `Berhasil mengubah deskripsi group`
}
export const IndListOn = (result: { id: string; nama: string | undefined }[]): string => {
    let Text: string = `*LIST ONLINE*\n\n`
    let count: number = 1
    for (let respon of result) {
        Text += count + '. ' + '@' + respon.id.replace('@s.whatsapp.net', '') + ` (${respon.nama})\n`
        count++
    }
    return Text
}
export const IndGadaOn = () => {
    return `Maaf untuk saat ini tidak ada yang terlihat online`
}
export const IndVoteStart = (pelapor: string, target: string, alasan: string, time: number) => {
    return `*VOTING*

Pengajuan Voting : @${pelapor.replace('@s.whatsapp.net', '')}
Target Vote : @${target.replace('@s.whatsapp.net', '')}
Alasan : ${alasan}



Ketik *vote* Jika setuju
Ketik *devote* Jika tidak

Voting berlangsung selama ${time} Menit
`
}
export const IndVoting = (pelapor: string, target: string, alasan: string, data: any) => {
    let Text = `
*VOTING*
	
Pengajuan Voting : @${pelapor.replace('@s.whatsapp.net', '')}
Target Vote : @${target.replace('@s.whatsapp.net', '')}
Alasan : ${alasan}
	
	
Ketik *vote* Jika setuju
Ketik *devote* Jika tidak\n\n
`
    let Vote: number = 1
    let Devote: number = 1
    let vote: {
        id: string | null | undefined
        status: string
        pushname: string
    }[] = data.filter(
        (value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'vote'
    )
    let devote: {
        id: string | null | undefined
        status: string
        pushname: string
    }[] = data.filter(
        (value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'devote'
    )
    Text += '  VOTE\n\n'
    for (let result of vote) {
        Text += `${Vote}. ${result.pushname} *(${result.id?.replace('@s.whatsapp.net', '')})*\n`
        Vote++
    }
    Text += '\n\n  DEVOTE\n\n'
    for (let result of devote) {
        Text += `${Devote}. ${result.pushname} *(${result.id?.replace('@s.whatsapp.net', '')})*\n`
        Devote++
    }
    return Text
}
export const IndHasilVote = (pelapor: string, target: string, alasan: string, data: any) => {
    let Text: string = `
*VOTING*
	
Pengajuan Voting : @${pelapor.replace('@s.whatsapp.net', '')}
Target Vote : @${target.replace('@s.whatsapp.net', '')}
Alasan : ${alasan}\n\n\n
`
    let Vote: number = 1
    let Devote: number = 1
    let vote: {
        id: string | null | undefined
        status: string
        pushname: string
    }[] = data.filter(
        (value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'vote'
    )
    let devote: {
        id: string | null | undefined
        status: string
        pushname: string
    }[] = data.filter(
        (value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'devote'
    )
    Text += `VOTING BERAKHIR DENGAN HASIL :\n\n Vote : ${vote.length}\nDevote : ${devote.length}\n\n\n`
    Text += '  VOTE\n\n'
    for (let result of vote) {
        Text += `${Vote}. ${result.pushname} *(${result.id?.replace('@s.whatsapp.net', '')})*\n`
        Vote++
    }
    Text += '\n\n  DEVOTE\n\n'
    for (let result of devote) {
        Text += `${Devote}. ${result.pushname}  *(${result.id?.replace('@s.whatsapp.net', '')})*\n`
        Devote++
    }
    Text += '\n\n*VOTING DITUTUP*'
    return Text
}
export const IndTagall = (data: string[] | undefined) => {
    let Text: string = '*TAGALL*\n\n'
    let count: number = 1
    for (let result of data || []) {
        Text += count + '. ' + '@' + result.replace('@s.whatsapp.net', '') + '\n'
        count++
    }
    return Text
}
export const IndRevoked = (nama: string) => {
    return `Berhasil mereset link group ${nama}`
}
export const IndSesiVotingAda = () => {
    return `Maaf sesi voting sedang berlangsung di grup ini selesaikan sesi voting terlebih dahulu/ admin group bisa mereset sesi voting`
}
export const IndSesiVotingGada = () => {
    return `Maaf sesi voting tidak ada dalam group ini harap aktifkan sesi voting terlebih dahulu`
}
export const IndResetSesi = () => {
    return `Berhasil menghapus sesi voting dalam group ini`
}
export const IndVoteLebih15 = () => {
    return `Maaf waktu voting tidak boleh lebih dari 15 menit`
}
export const BerhasilKickVote = (sender: string) => {
    return `Berhasil mengeluarkan @${sender.replace('@s.whatsapp.net', '')} berdasarkan sesi voting`
}
export const CancelVote = () => {
    return `Berhasil membatalkan vote dikarenakan lebih dari 15 orang memilih devote`
}
export const DiaKeluarVote = () => {
    return `Yah Out, voting ditutup`
}
export const BukanStickerGif = () => {
    return `Maaf ka itu bukan sticker gif harap gunakan sticker gif`
}
export const InputImage = () => {
    return `Maaf ka harap kirim / reply gambar dengan caption`
}
export const IndBukanSgif = () => {
    return `Maaf ka sticker gif tidak bisa dijadiin profil`
}
export const IndLirikMusicMatch = (result: LirikResult) => {
    return `
Judul : ${result.result.title}
Artis : ${result.result.artist}


  ${result.result.lirik}`
}
export const IndAzLirik = (result: Azlirik) => {
    return `
Judul : ${result.title}
Artis : ${result.artis}


  ${result.lirik}`
}
export const LirikGada = () => {
    return `Maaf Lirik yang anda cari tidak ditemukan`
}
export const BerhasilJoin = () => {
    return `Succes join group`
}
export const IndGagalJoin = () => {
    return `Harap masukkan link dengan valid`
}
export const IndSudahDalamGc = () => {
    return `Mohon maaf ka bot sudah berada di grup tersebut`
}
export const IndSpamPrefix = () => {
    return `Maaf ka setelah anda menggunakan command prefix ada jeda 60 detik untuk anda bisa menggunakan command prefix kembali`
}
export const IndAbsenStart = () => {
    return `Absen dimulai Ketik hadir, Jika izin ketik izin, jika sakit ketik sakit`
}
export const IndAbsensi = (result: any, mem: number) => {
    let text: string = `
*Daftar List Absen Hari ini*
	
Total Absen : ${result.length}
Total Anggota : ${mem}\n\n`
    let hadir = 1
    for (let respon of result) {
        text += `${hadir}. ${respon.nama} ( *${respon.status}* )\n\n`
        hadir++
    }
    text += `\n\nAbsen akan berakhir dalam 30 menit `
    return text
}
export const IndAbsen = (result: any, mem: number) => {
    let text = `
*Hasil List absen hari ini*

Anggota Absen: ${mem}\n\n`

    let hadir = 1
    text += 'anggota yang tanpa keterangan:\n\n'
    for (let respon of result) {
        text += `${hadir}. @${respon.jid.replace('@s.whatsapp.net', '')} ( *TANPA KETERANGAN* )\n\n`
        hadir++
    }
    text += `\n\nAbsen Berakhir`
    return text
}
export const indAfkOn = () => {
    return `Fitur afk telah diaktifkan`
}
export const indJanganTagAfk = (alasan: string, waktu: number) => {
    const Time = parsems(waktu - Date.now())
    return `Jangan tag dia dia sedang afk dengan alasan ${alasan},\n\nTelah afk selama ${Time.hours} Jam ${Time.minutes} menit ${Time.seconds} detik yang lalu`
}
export const IndWarningSpamTag = () => {
    return `Warning anda terdeteksi melakukan spam kepada user yang afk`
}
export const IndAfkBalik = (time: number) => {
    const Time = parsems(time)
    return `Anda telah berhenti Afk, setelah afk selama  ${Time.hours} Jam ${Time.minutes} menit ${Time.seconds} detik yang lalu`
}
