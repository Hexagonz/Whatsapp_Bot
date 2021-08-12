import { instaStalk, TiktokStalk, LirikResult, Azlirik } from '../typings'
import { ChannelSearchResult } from 'yt-search'
import { WAGroupMetadata, WAGroupParticipant } from '@adiwajshing/baileys'
import parsems from 'parse-ms';
import moment from "moment-timezone";

moment.tz.setDefault('Asia/Jakarta').locale('id')


export const IndTest = (): string => {
    return `Test`
}
export const IndTunggu = (): string => {
	let kata: string[] = [
		`_Tunggu sebentar sedang menjalankan perintah..._`,
		`_Mohon tunggu sebentar ya kak bot sedang mengeksekusi perintah_`,
		`_Tunggu sebentar ya kak_`,
		`_Harap tunggu sebentar bot sedang mengeksekusi perintah_`,
		`_Mohon tunggu sebentar bot sedang melaksanakan perintah_`,
		`_Harap tunggu sesaat bot sedang melaksanakan perintah anda_`
	];
	let Loading: string[] = [
		`*⏳*`, `*⌛*`, `*⏱*`, `*⏲*`, `*🕰*`, `*🕔*`, `*🕖*`, `*🕙*`, `*🕧*`, `*🕞*`
	]
    return Loading[Math.floor(Math.random() * (Loading.length))] + " " + kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndBukanVid = (): string => {
    return `Maaf file yang anda kirim bukan berformat video`
}
export const IndBukanAud = (): string => {
	let kata: string[] = [
		`*「❗」* _Maaf kak untuk menggunakan perintah ini harap reply audio dengan caption_`,
		`*「❗」*  _Maaf kak harap reply audio menggunakan caption_`,
		`*「❗」*  _Maaf kak bot tidak dapat melaksanakan perintah dikarenakan bot tidak menerima audio_`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndSuccesToVid = (Proses: string) => {
	let Success: string[] = [
		`*✅*`,
		`*✔*`
	]
	let kata: string[] = [
		`_Success mengubah sticker menjadi video dengan waktu ${Proses}_`,
		`_Berhasil mengubah sticker menjadi video dalam waktu ${Proses}_`,
		`_Berhasil melaksanakan perintah dengan waktu ${Proses}_`
	]
	return Success[Math.floor(Math.random() * (Success.length))] + " " + kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndToVid = (): string => {
	let kata: string[] = [
		`*「❗」*  _Maaf kak terjadi kesalahan saat conversi sticker menjadi video harap gunakan media yang lain_`,
		`*「❗」*  _Mohon maaf kak terjadi kesalahan saat conversi sticker menjadi video harap gunakan media yang berbeda ya kak makasih 🙏🏻_`,
		`*「❗」*  _Maaf kak ada terjadi error saat bot ingin conversi sticker menjadi video harap ganti media ya kak_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
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
export const IndBukanSticker = (caption: string): string => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf ka reply sticker dengan caption *${caption}*, untuk menggunakan perintah ini_`,
		`*「❗」* _Mohon maaf ka Kaka tidak reply sticker apapun harap reply sticker dengan caption *${caption}*, untuk menggunakan perintah ini_`,
		`*「❗」* _Mohon maaf ka harap reply sticker dengan caption *${caption}*, untuk menggunakan perintah ini_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndGagalSticker = (): string => {
	let kata: string[] = [
		`*「❗」*  _Maaf ka terjadi kesalahan / error saat process membuat sticker harap ganti media lain_`,
		`*「❗」*  _Mohon maaf ka terjadi error saat prosess membuat sticker harap ganti media lainnya kak_`,
		`*「❗」*  _Maaf ka bot tidak dapat membuat sticker pada media itu harap ganti medianya kak_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
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
export const IndTungguSearch = () => {
	let kata: string[] = [
		`*🔎* _Tunggu sebentar bot akan mencarikan untuk anda_`,
		`*🔎* _Tunggu sebentar bot sedang mencarikan perintah anda_`,
		`*🔎* _Tunggu sebentar bot sedang mencarikan untuk anda_`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndErrorMP3 = (): string => {
    return `Maaf, Terjadi kesalahan pada fitur media mp3 silahkan coba kembali`
}
export const IgStalk = (data: instaStalk): string => {
    return `
	ㅤㅤ  *「 INSTA STALK 」* 


*🖥️ Id :* ${data.id}
*👤 Username :* ${data.username}
*🉐 Nickname :* ${data.nickname}
*⚔️ Kategori :* ${data.category}
*👥 Pengikut :* ${data.follower}
*🫂 Mengikuti :* ${data.following} 
*🛡️ Bio :* ${data.bio}
*🔖Akun bisnis :* ${data.akun_bisnis ? '✅' : '❎'}
*🔐 Private Akun :* ${data.private ?  '✅' : '❎'}
*📧 Akun Terverifikasi :* ${data.centang ?  '✅' : '❎'}
*📦 Total Post:* ${data.total_post}
`
}
export const IndUserKosong = (nama: string): string => {
	let kata: string[] = [
		`*❌* _Mohon maaf kak username ${nama} yang mau kakak stalk tidak di temukan_`,
		`*❌* _Mohon maaf, username ${nama} yang kakak ingin stalk tidak bot temukan_`,
		`*❌* _Mohon maaf kak, username ${nama} yang mau kakak cari tidak bot temukan, Harap ganti usernamenya kak *🙏🏻*_`,
		`*❌* _Mohon maaf kak, username ${nama} yang ingin kakak cari tidak ditemukan, Harap ganti usernamenya ya kak *🙏🏻*_`,
		`*❌* _Mohon maaf kak, Username ${nama} yang mau kakak cari tidak bot temukan, Mohon ganti usernamenya ya kak  *🙏🏻*_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndUsernameNoKosong = (nama: string) => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf kak, harap masukkan username ${nama}, yang mau kakak stalk_`,
		`*「❗」* _Mohon maaf kak, masukkan username ${nama} yang mau kakak cari  *🙏🏻*_`,
		`*「❗」* _Maaf kak, harap masukkan username ${nama} yang ingin kakak cari  *🙏🏻*_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndAntiDahViewOnce = (status: boolean) => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf kak mode anti view once ${status ? "Sudah diaktifkan" : "Sudah dimatikan"} di group ini_`,
		`*「❗」* _Mohon maaf kak anti view once sudah ${status ? "Di nyalakan" : "Di matikan"}di group ini_`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndAntiViewOnce = (status: boolean, metadata: WAGroupMetadata) => {
	return  `ㅤ   *「 ANTI VIEWONCE 」* 

*💠 ID :* ${metadata.id}
*⚠ STATUS :* ${status ? "AKTIF" : "MATI"}
*🖋 IN :* ${metadata.subject}
`
}
export const IndYtStalk = (data: ChannelSearchResult): string => {
    return `ㅤㅤㅤ  *「 YT STALK 」* 


*🎬 Nama Channel :* ${data.name}
*🌐 Url :* ${data.url}
*📽 Total Video :* ${data.videoCount}
*👥 Total Subcriber :* ${data.subCountLabel}
`
}
export const IndYtStalkError = (): string => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf kak, untuk saat ini fitur yt stalk sedang error harap coba lagi lain kali_`,
		`*「❗」* _Mohon maaf kak, fitur yt stalk saat ini sedang error harap coba lagi nanti_`,
		`*「❗」* _Mohon maaf kak, Fitur yt stalk untuk saat ini error, bisa di coba lain kali_`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndTiktokStalk = (data: TiktokStalk): string => {
    const Tanggal_Upload: string = new Date(Number(data.createTime) * 1000).toLocaleString('id', {
        year: 'numeric',
        month: 'short',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric'
    })
    return `	ㅤ *「 TIKTOK STALK 」*


_*📡 ID :* ${data.id}_
_*🕵🏻‍♂️ Username :* ${data.uniqueId}_
_*👤 Nama :* ${data.nickname}_
_*👥 Pengikut :* ${data.follower}_
_*🫂  Mengikuti :* ${data.following}_
_*❤ Suka :* ${data.suka}_
_*🎞 Total Video :* ${data.total_video}_
_*🎥 Tanggal Buat :* ${Tanggal_Upload}_
_*📧 Verived :* ${data.verified ?  '✅' : '❎'}_
_*🔐 Private :* ${data.privateAccount ?  '✅' : '❎'}_
_*🌐 Bio Link :* ${data.bioLink ? data.bioLink.link : ''}_
_*🛡️ Bio :*_ ${data.signature}
`
}
export const IndMasukkanUsernameNoUrl = (fitur: string): string => {
	let kata: string[] = [
		`*「❗」*  _Mohon maaf kak, harap masukkan username ${fitur} bukan link_`,
		`*「❗」*  _Mohon maaf kak, harap masukkan username ${fitur}, Bukan URL nya kak_`
	];
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const Indverifikasi = (status: number, otp: string, data?: { nama: string, id: string, dalam: string}): string => {
    if (status === 1) {
        return `Kode Verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 5 menit.\n\nKetik kode verifikasi anda dengan valid agar bot dapat verifikasi bahwa anda adalah user`
    } else if (status === 2) {
        return `Kode Verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 90 menit.\n\nKetik kode verifikasi anda dengan valid agar bot dapat verifikasi bahwa anda adalah user`
    } else if (status === 3) {
        return `Kode verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 8 jam.\n\nKetik kode verifikasi anda dengan valid agar bot dapat verifikasi bahwa anda adalah user`
    } else if (status === 4) {
        return `ㅤㅤㅤ  *「 VERIFICATION 」* 

*❒ Nama :* ${data?.nama}
*❒ Id :* ${data?.id}
*❒ Status :* SUCCESS
*❒ In :* ${data?.dalam}`
    } else {
        return ''
    }
}
export const IndSdhVerifikasi = (nama: string) => {
	nama = /@s.whatsapp.net/i.test(nama) ? "@"+ nama.replace("@s.whatsapp.net", "") : nama
	const result = [`*「❗」* Maaf ka ${nama}, kaka sudah terverifikasi, cukup sekali untuk melakukan verifikasi tidak usah berulang kali`, `*「❗」* Maaf ka ${nama}, kaka sudah pernah verifikasi sebelumnya`, `*「❗」* Maaf ka ${nama}, kaka udah terverifikasi mohon untuk tidak menggunakan command ini lagi ya kak ☺🙏🏻`]
	return result[Math.floor(Math.random() * (result.length))]
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
	let kata: string[] = [
		`*「❗」* _Mohon maaf ka, diharapkan kirim/reply Gambar / Video / Sticker / dokument (image/video) dengan caption ${command} untuk menggunakan perintah ini_`,
		`*「❗」* _Maaf ka, kaka tidak mengirimkan media apapun, Harap Kirim/reply media dengan caption ${command} untuk menggunakan command ini_`,
		`*「❗」* _Mohon maaf kak, harap kirim/ reply media menggunakan caption ${command} Untuk menggunakan perintah ini_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndStickerVideoPanjang = () => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf kak, video yang kakak kirim terlalu besar untuk dijadikan sticker maksimal video 15 detik_`,
		`*「❗」* _Mohon maaf kak, durasi video yang kakak kirim terlalu besar untuk dijadikan sticker maksimal video hanya 15 detik_`,
		`*「❗」* _Mohon maaf kak, durasi video yang kakak kirim terlalu besar untuk bot jadikan sticker, untuk video maksimal hanya 15 detik kak_`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndSpam5S = (jeda: string): string => {
    return `Maaf ka setelah anda menggunakan command ada jeda ${jeda} detik untuk anda bisa menggunakan command kembali`
}
export const StickerDuplicate = (sender: string, posisi: number): string => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf Ka media itu sudah dijadikan sticker sebelumnya,  @${sender.replace('@s.whatsapp.net','')} yang bikin. Harap tidak menggunakan media yang sama ya kak 🙏🏻_`,
		`*「❗」* _Mohon maaf ka di harapkan tidak membuat sticker dengan media yang sama kak @${sender.replace('@s.whatsapp.net','')} sudah pernah bikin media itu sebelumnya. Harap gunakan media yang berbeda_`,
		`*「❗」* _Mohon maaf ka media yang kaka ingin jadikan sticker sudah pernah dibuat sama @${sender.replace('@s.whatsapp.net','')} sebelumnya. Diharapkan gunakan media yang berbeda ya kak makasih 🙏🏻_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const StickerFound = (sender: string): string => {
	let kata: string[] = [
		`_Ini ka stickernya @${sender.replace('@s.whatsapp.net', '')}, Mohon tidak gunakan media yang sama ya kak 🙏🏻_`,
		`_Ini kak sticker yang mau kakak buat tadi  @${sender.replace('@s.whatsapp.net', '')}_ `,
		`_ini kan kak sticker yang mau di buat tadi ?, Mohon tidak gunakan media yang sama ya kak makasih 🙏🏻_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const BotGaAdmin = () => {
	let kata: string[] = [
		`*「❗」*  _Maaf kak bot bukan admin group tidak bisa melaksanakan perintah_`,
		`*「❗」*  _Mohon maaf kak jika ingin menggunakan fitur ini harap jadikan bot sebagai admin_`,
		`*「❗」* _Maaf ka, fitur ini berlaku jika bot menjadi admin_`,
		`*「❗」*  _Maaf kak, bot bukan admin grup bot tidak bisa melaksanakan perintah :(_`,
		`*「❗」*  _Mohon maaf kak harap jadikan bot sebagai admin terlebih dahulu_`,
		`*「❗」*  _Maaf kak bot bukan admin grup tidak dapat melaksanakan perintah_`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const PilihBukatutup = () => {
	let kata: string[] = [
		`*「❗」*  _Maaf kak format yang kakak masukkan salah, pilih buka/tutup_`,
		`*「❗」*  _Mohon maaf kak untuk menggunakan perintah ini harap pilih buka atau tutup_`,
		`*「❗」*  _Maaf kak harap pilih buka/tutup_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const PilihOnOff = () => {
	let kata: string[] = [
		`*「❗」*  _Maaf kak format yang kakak masukkan salah, pilih on/off_`,
		`*「❗」*  _Mohon maaf kak untuk menggunakan perintah ini harap pilih on atau off_`,
		`*「❗」*  _Maaf kak harap pilih buka/tutup_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const BukanDalamGroup = () => {
	let kata: string[] = [
		`*「❗」* _Maaf kak perintah ini hanya bisa di gunakan di dalam grup saja kak_`,
		`*「❗」* _Mohon maaf kak sebelumnya, command ini hanya tersedia dalam group_`,
		`*「❗」* _Maaf ka perintah ini khusus untuk didalam group saja kak_`, 
		`*「❗」* _Maaf kak perintah ini hanya berlaku jika kakak berada didalam group_`,
		`*「❗」* _Maaf kak perintah ini khusus untuk group, bukan personal chat_`,
		`*「❗」* _Maaf kak fitur ini tersedia hanya di dalam group_`,
		`*「❗」* _Maaf kak fitur ini tidak berlaku dalam personal chat_`,
		`*「❗」* _Maaf kak, kakak hanya bisa menggunakan perintah ini jika berada didalam group_`,
		`*「❗」* _Mohon maaf kak perintah ini tidak tersedia untuk personal chat_`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const UserBaruOut = () => {
    return `Maaf user tersebut baru baru ini keluar group anda tidak bisa memasukkannya`
}
export const UserDalamGroup = () => {
	let kata: string[] = [
		`*「❗」* _Maaf kak user tersebut telah berada didalam group_`,
		`*「❗」* _Maaf kak user tersebut sudah berada di group_`,
		`*「❗」* _Maaf kak user tersebut sekarang ada di group_`
	]
	return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const UserGadaDalamGroup = () => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf kak untuk saat ini user tersebut sedang tidak berada didalam group_`,
		`*「❗」*  _maaf kak user tersebut sedang tidak berada didalam group_`,
		`*「❗」*  _Maaf kak bot tidak bisa melaksanakan perintah karena user tersebut sedang tidak berada didalam group_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const UserPrivate = () => {
    return `Maaf tidak dapat menginvit user tersebut kedalam group kemungkinan di private`
}
export const SuccesAdd = (namagc: string) => {
	let kata: string[] = [
		`*✅* _Berhasil menambahkan target ke dalam group ${namagc}_`,
		`*✅* _Berhasil memasukkan user tersebut ke dalam group ${namagc}_`,
		`*✅* _Berhasil memasukkan peserta tersebut ke dalam group ${namagc}_`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const AddHarapTagSeseorang = () => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf kak harap tag/reply seseorang yang ingin ditambahkan kedalam group_`,
		`*「❗」* _Maaf kak harap tag/reply seseorang yang ingin ditambahkan ke group_`,
		`*「❗」* _Mohon maafkak untuk menggunakan perintah ini kaka harus tag/reply seseorang yang ingin ditambahkan_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const TagOrReply = () => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf kak untuk menggunakan perintah ini harap tag/reply pesan seseorang_`,
		`*「❗」* _Maaf kak harap tag/reply pesan seseorang untuk menggunakan fitur ini_`,
		`*「❗」* _Maaf kak untuk menggunakan command ini harap tag/ reply pesan seseorang_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const isOwnerGroupNokick = () => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf kak bot tidak dapat mengeluarkan pembuat group_`,
		`*「❗」* _Maaf kak bot tidak dapat mengeluarkan owner group_`,
		`*「❗」* _Mohon maaf kak bot tidak dapat mengeluarkan pembuat group_`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const kickSucces = (sender: string, admin: string) => {
	let kata: string[] = [
		`*✅* _Berhasil mengeluarkan @${sender.replace('@s.whatsapp.net', '')} atas perintah admin ${admin.replace("@s.whatsapp.net","")}_`,
		`*✅* _Berhasil mengnyepak @${sender.replace('@s.whatsapp.net', '')} atas perintah admin ${admin.replace("@s.whatsapp.net","")}_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const Admindia = (sender: string) => {
	let kata: string[] = [
		`*「❗」* _Tidak dapat mengeluarkan @${sender.replace('@s.whatsapp.net', '')} karena dia admin_`,
		`*「❗」* _Tidak dapat mengeluarkan @${sender.replace('@s.whatsapp.net',"")}, dikarenakan masih menjabat sebagai admin hanya owner group yang bisa mengeluarkan admin_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const ButakahLinkGc = () => {
    return `_Butakah ? di deskripsi group ada tod, caper caper_`
}
export const IndAntiViewOn = () => {
	let kata: string[] = [
		`*✅* _Anti ViewOnce on kamu setiap media ViewOnce akan dikirim ulang otomatis. Jika tidak menginginkan fitur ini admin group bisa mematikannya_`,
		`*✅*  _Anti ViewOnce dinyalakan setiap media yang kamu kirim berupa View Once maka otomatis di kirim ulang oleh bot. Jika tidak menginginkan fitur ini admin group bisa mematikannya_`,
		`*✅*  _Anda Terdeteksi mengirim ViewOnce setiap media yang dikirim berupa ViewOnce maka otomatis akan di kirim ulang oleh bot. Jika tidak menginginkan fitur ini admin group bisa mematikannya_`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndLinkGroup = (groupMetadata: WAGroupMetadata, link: string) => {
    return `ㅤㅤㅤ  ㅤㅤ *「 LINK GROUP 」* 

*🚀 Group :* ${groupMetadata.subject}
*🤴🏻 Owner Group :* ${groupMetadata.owner || "Tidak terdeteksi"}
*💫 Creation :* ${groupMetadata.subject ? moment(Number(groupMetadata.creation * 1000)).format("LLLL") : "Tidak terdeteksi"}
*🌐 Link :* ${link}`
}
export const SuccesOpenCloseGc = (Status: boolean, metadata: WAGroupMetadata) => {
	let Close: string[] = [
		`*✅* _Berhasil menutup group ${metadata.subject}, Sekarang semua member tidak dapat mengirim pesan_`,
		`*✅* _Berhasil menutup group ${metadata.subject}, Member tidak dapat mengirim pesan_`
	]
	let Open: string[] = [
		`*✅* _Berhasil membuka group  ${metadata.subject}, Sekarang semua member dapat mengirimkan pesan_`,
		`*✅* _Berhasil menutup group ${metadata.subject}, Member dapat mengirim pesan_`
	]
    return Status ? Close[Math.floor(Math.random() * (Close.length))].trim() : Open[Math.floor(Math.random() * (Open.length))].trim()
}
export const PromoteSuccess = (tag: string) => {
	let kata: string[] = [
		`*✅* _Berhasil menaikkan jabatan ${tag.replace('@s.whatsapp.net', '')} menjadi admin_`,
		`*✅* _Berhasil menjadikan  ${tag.replace('@s.whatsapp.net', '')} seorang admin_`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const DemoteSuccess = (tag: string) => {
	let kata: string[] = [
		`*✅* _Berhasil menurunkan jabatan ${tag.replace("@s.whatsapp.net", "")} menjadi seorang member_`,
		`*✅* _Berhasil mencabut jabatan admin  ${tag.replace("@s.whatsapp.net", "")}_`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const PromoteDiaAdmin = (tag: string) => {
	let kata: string[] = [
		`*「❗」* _Perintah di tolak dikarenakan ${tag.replace('@s.whatsapp.net', '')} telah menjadi seorang admin_`,
		`*「❗」* _kamu tidak dapat menaikkan  ${tag.replace('@s.whatsapp.net', '')}, karena dia telah menjadi admin_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const DemoteBukanAdmin = (tag: string) => {
	let kata: string[] = [
		`*「❗」* _Kamu tidak dapat menurunkan jabatan ${tag.replace("@s.whatsapp.net", "")} karena dia bukan admin_`,
		`*「❗」* _Perintah ditolak dikarenakan  ${tag.replace("@s.whatsapp.net", "")} bukan seorang admin_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const GagalUpdatePP = () => {
	let kata: string[] = [
		`*「❗」*  _Terjadi kesalahan saat ingin mengubah foto profil harap ganti media anda_`,
		`*「❗」*  _Maaf ada kesalahan saat proses mengubah foto profil group harap ganti media anda_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const SuccesUpdatePP = () => {
	let kata: string[] = [
		`*✅* _Berhasil mengubah foto profil group_`,
		`*✅* _Berhasil menganti foto profil group_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const SuccesSetName = (nama: string) => {
	let kata: string[] = [
		`*✅*  _Berhasil mengubah nama group menjadi ${nama}_`,
		`*✅* _Berhasil mengganti nama grup menjadi ${nama}_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const SuccesSetDesk = () => {
	let kata: string[] = [
		`*✅*  _Berhasil mengubah deskripsi group_`,
		`*✅* _Berhasil mengganti deskripsi group_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndListOn = (result: { id: string; nama: string | undefined }[]): string => {
    let Text: string = `*╭───㊚ LIST ONLINE ㊚────*\n*│*⁩\n`
    let count: number = 1
    for (let respon of result) {
        Text += "*│" + count + '.* ' + '@' + respon.id.replace('@s.whatsapp.net', '') + ` (${respon.nama})\n`
        count++
    }
	Text += `*│⁩*\n*╰───── ㊊ RA BOT ㊊ ───*`
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
    let Text: string = `
	ㅤㅤㅤㅤㅤ  *「 VOTING 」*
	
_*📬 Pengajuan Voting :* @${pelapor.replace('@s.whatsapp.net', '')}_
_*🐷 Target Vote :* @${target.replace('@s.whatsapp.net', '')}_
_*💬 Alasan :* ${alasan}_\n\n\n
	
	
_Ketik *vote* Jika anda setuju mengeluarkan target_
_Ketik *devote* Jika anda tidak setuju mengeluarkan target_\n\n
`
    let Vote: number = 1
    let Devote: number = 1
    let vote: { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'vote')
    let devote: { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'devote')
    Text += '_*VOTE*_\n\n'
    for (let result of vote) {
        Text += `_*${Vote}.* ${result.pushname} *(${result.id?.replace('@s.whatsapp.net', '')})*_\n`
        Vote++
    }
    Text += '\n\n_*DEVOTE*_\n\n'
    for (let result of devote) {
        Text += `_*${Devote}.* ${result.pushname} *(${result.id?.replace('@s.whatsapp.net', '')})*_\n`
        Devote++
    }
    return Text
}
export const IndHasilVote = (pelapor: string, target: string, alasan: string, data: any) => {
    let Text: string = `
	ㅤㅤㅤㅤㅤ  *「 VOTING 」*


_*📬 Pengajuan Voting :* @${pelapor.replace('@s.whatsapp.net', '')}_
_*🐷 Target Vote :* @${target.replace('@s.whatsapp.net', '')}_
_*💬 Alasan :* ${alasan}_\n\n\n
`
    let Vote: number = 1
    let Devote: number = 1
    let vote: { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'vote')
    let devote: { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'devote')
    Text += `_*Voting berakhir dengan hasil :*_\n\n_*✅ Vote :* ${vote.length}_\n_*❎ Devote :* ${devote.length}_\n\n\n`
    Text += '  	ㅤㅤㅤㅤㅤ  _*VOTE*_\n\n'
    for (let result of vote) {
        Text += `${Vote}. ${result.pushname} *(${result.id?.replace('@s.whatsapp.net', '')})*\n`
        Vote++
    }
    Text += '\n\n  	ㅤㅤㅤㅤㅤ  _*DEVOTE*_\n\n'
    for (let result of devote) {
        Text += `_*${Devote}.* ${result.pushname}  *(${result.id?.replace('@s.whatsapp.net', '')})*_\n`
        Devote++
    }
    Text += '\n\n_Voting telah berakhir, Sesi voting telah *DI TUTUP* untuk group ini._'
    return Text
}
export const IndTagall = (data: string[] | undefined) => {
    let Text: string = '*╭───㊚ TAGALL ㊚────* \n*│*⁩\n'
    let count: number = 1
    for (let result of data || []) {
        Text += `*│ ` + count + '.* ' + '@' + result.replace('@s.whatsapp.net', '') + '\n'
        count++
    }
	Text += `*│⁩*\n*╰───── ㊊ RA BOT ㊊ ───*`
    return Text
}
export const IndRevoked = (metadata: WAGroupMetadata) => {
	let kata: string[] = [
		`*✅* _Success menarik link group ${metadata.subject}_`,
		`*✅* _Berhasil mereset link group ${metadata.subject}_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndSesiVotingAda = () => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf kak, Sesi voting berlangsung di dalam group ini kakak bisa menyelesaikan sesi voting sebelumnya / kaka bisa menggunakan fitur delvote_`,
		`*「❗」* _Maaf sesi voting sedang berlangsung di grup ini selesaikan sesi voting terlebih dahulu/ admin group bisa mereset sesi voting yang berlangsung._`,
		`*「❗」* _Mohon maaf kak sesi voting sedang berjalan di group ini kaka bisa selesaikan sesi voting sebelumnya / kaka bisa menggunakan fitur *delvote*_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndSesiVotingGada = () => {
	let kata: string[] = [
		`*「❗」*  _Mohon maaf kak, sesi voting tidak ada dalam group ini_`,
		`*「❗」* _Mohon maaf, sesi voting sedang tidak berlangsung didalam group ini_`,
		`*「❗」* _Mohon maaf kak, Group ini tidak mempunyasi sesi voting apapun_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndResetSesi = () => {
	let kata: string[] = [
		`*✅* _Berhasil menghapus sesi voting yang berlangsung di group ini untuk saat ini tidak ada sesi votung yang berlangsung_`,
		`*✅* _Berhasil mereset sesi voting yang sedang berlangsung di dalam group ini. Untuk saat ini tidak ada sesi voting yang berlangsung_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndVoteLebih15 = () => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf kak waktu voting tidak bisa lebih dari 15 menit maksimal 15 menit_`,
		`*「❗」* _Mohon maaf, waktu voting yang anda masukkan lebih dari 15 menit._`,
		`*「❗」* _Mohon maaf waktu voting tidak boleh melebihi dari 15 menit_`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const BerhasilKickVote = (sender: string) => {
    return `_Bot akan mengeluarkan @${sender.replace("@s.whatsapp.net", "")} dikarenakan voting 15 Orang memilih vote_`
}
export const BerhasilVote = (sender: string) => {
	return `_Voting berakhir dengan hasil anggota setuju telah melebihi 15 orang, tetapi bot tidak akan mengeluarkan ${sender.replace("@s.whatsapp.net", "")} karena bot bukan admin, Keputusan sekarang diserahkan kepada admin group_`
}
export const CancelVote = () => {
    return `_Voting berakhir dengan hasil anggota yang tidak setuju melebihi 15 orang, Voting di tutup._`
}
export const DiaKeluarVote = () => {
    return `_Target vote terdeteksi kabur Sesi voting otomatis di tutup_`
}
export const IndUdahVote = () => {
	let kata: string[] = [
		`*「❗」* _Mohon maaf kak anda sudah melakukan pemilihan kakak tidak bisa memilih kedua kalinya_`,
		`*「❗」* _Mohon maaf kak kakak sudah mememilih sebelumnya, kakak tidak bisa memilih 2 kali_`,
		`*「❗」* _Mohon maaf kak kakak sebelumnya sudah pernah melakukan pemilihan, kakak tidak bisa memilih 2 kali_`,
		`*「❗」* _Mohon maaf, Anda sudah pernah melakukan pemilihan sebelumnya anda tidak dapat memilih untuk kedua kalinya, harap tunggu sampai voting berakhir_`,
		`*「❗」* _Mohon maaf, kamu telah melakukan voting sebelumnya. voting hanya dapat dilakukan sekali di setiap nomer_`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const BukanStickerGif = () => {
	let kata: string[] = [
		`*「❗」*  _Mohon maaf kak Sticker yang kaka gunakan bukan sticker gif, bot tidak dapat melaksanakan perintah_`,
		`*「❗」*  _Maaf ka harap gunakan sticker gif kak 🙏🏻_`,
		`*「❗」* _Maaf ka media yang kaka gunakan bukan sticker gif harap gunakan sticker gif kak 🙏🏻_`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const InputImage = () => {
    return `Maaf ka harap kirim / reply gambar dengan caption`
}
export const InputSticker = () => {
	let kata: string[] = [
		`*「❗」* _Maaf kak untuk menggunakan perintah ini harap kirim caption dengan reply sticker_`,
		`*「❗」* _Mohon maaf kak Harap reply sticker dengan caption_`,
		`*「❗」* _Maaf kak perintah ini berlaku jika kakak mereply sticker_`
	]
	return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndToimgDone = (waktu: string) => {
	let Success: string[] = [
		`*✅*`,
		`*✔*`
	]
	let kata: string[] = [
		`_Success mengubah sticker menjadi Image dengan waktu ${waktu}_`,
		`_Berhasil mengubah sticker menjadi Image dalam waktu ${waktu}_`,
		`_Berhasil melaksanakan perintah dengan waktu ${waktu}_`
	]
	return Success[Math.floor(Math.random() * (Success.length))] + " " + kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndBukanSgif = () => {
	let kata: string[] = [
		`*「❗」*  _Mohon maaf kak sticker gif tidak bisa dijadikan foto profil_`,
		`*「❗」*  _Perintah ditolak dikarenakan sticker gif tidak dijadikan foto profil_`,
		`*「❗」* _Maaf kak sticker gif tidak dapat dijadikan foto profil_`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndLirikMusicMatch = (result: LirikResult) => {
    return  `	ㅤㅤㅤㅤㅤ  *「 LIRIK LAGU 」*

_*📚 Judul :* ${result.result.title}_
_*💍 Artis :* ${result.result.artist}_
	
	
${result.result.lirik}`
}
export const IndAzLirik = (result: Azlirik) => {
    return `	ㅤㅤㅤㅤㅤ  *「 LIRIK LAGU 」*

_*📚 Judul :* ${result.title}_
_*💍 Artis :* ${result.artis}_


  ${result.lirik}`
}
export const LirikGada = () => {
	let kata: string[] = [
		`*❌* _Maaf kak lirik lagu yang anda cari tidak ditemukan_`,
		`*❌* _Mohon maaf kak lirik lagu yang ingin kakak cari tidak bot temukan_`,
		`*❌* _Mohon maaf kak judul lagu yang kakak ingin cari tidak ditemukan, Harap ganti judul lagu!_`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
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
    return `_Absen pada tanggal ${moment(Date.now()).format("LLLL")} dimulai silakan ketik : (Pilih salah satu)_\n\n_1. *HADIR* (Jika anda masuk)_\n_2. *IZIN* (Jika ada halangan) + alasan_\n_3. *SAKIT* (jika anda sakit)_\n\n*Notes :*\n\n_- Anda hanya dapat memilih salah satu_\n_- Absen berlangsung selama 30 menit_\n_- Jika ada anggota yang tidak mengisi absen selama 30 menit otomatis dimasukkan ke list *TANPA KETERANGAN* di akhir absen_`
}
export const IndAbsensi = (result: any, mem: number) => {
    let text: string = `ㅤㅤㅤㅤㅤ  *「 ABSENSI 」*


_*Daftar list absen yang terdata untuk saat ini*_
	
_*Total anggota sudah melakukan absen :* ${result.length}_
_*Total seluruh anggota :* ${mem}_\n\n`
    let hadir: number = 1
    for (let respon of result) {
		if (respon.alasan) {
			text += `_*${hadir}.* ${respon.nama} ( *${respon.status}* )_\n_*Alasan :* ${respon.alasan}_\n\n`
			hadir++
		} else {
			text += `_*${hadir}.* ${respon.nama} ( *${respon.status}* )_\n\n`
			hadir++
		}
    }
    text += `\n\n_Absen pada tanggal ${moment(Date.now()).format("LLLL")} silakan ketik : (Pilih salah satu)_\n\n_1. *HADIR* (Jika anda masuk)_\n_2. *IZIN* (Jika ada halangan) + Alasan_\n_3. *SAKIT* (jika anda sakit)_\n\n*Notes :*\n\n_- Anda hanya dapat memilih salah satu_\n_- Absen berlangsung selama 30 menit_\n_- Jika ada anggota yang tidak mengisi absen selama 30 menit otomatis dimasukkan ke list *TANPA KETERANGAN* di akhir absen_`
    return text
}
export const IndAbsen = (result: any, mem: number) => {
    let text: string = `ㅤㅤㅤ  *「 ABSEN 」*
	
*Jumlah Anggota Absen :* ${mem}\n\n`

    let hadir: number = 1
    text += '*TANPA KETERANGAN :*\n\n'
    for (let respon of result) {
        text += `*${hadir}.* @${respon.jid.replace('@s.whatsapp.net', '')} ( *TANPA KETERANGAN* )\n\n`
        hadir++
    }
    text += `\n\nAbsen untuk tanggal ${moment(Date.now()).format("LLLL")} telah berakhir`
    return text
}
export const indAfkOn = (target: string, group: string, alasan: string, pushname: string) => {
    return `ㅤㅤ *「 AFK MODE 」*

_*➸ Nama :* ${pushname}_
_*➸ Target :* ${target}_
_*➸ In :* ${group}_
_*➸ Alasan :* ${alasan}_

_*Fitur AFK berhasil diaktifkan !_*
`
}
export const indAfkDahNyala = () => {
	return `Fitur AFK telah anda diaktifkan sebelumnya.`
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
