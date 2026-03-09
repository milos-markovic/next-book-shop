import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import mongoose from "mongoose"
import {User} from '../models/User'
import {Category} from '../models/Category'
import {Book} from '../models/Book'
import {Filter} from '../models/Filter'
import {Cart} from '../models/Cart'
import {Order} from '../models/Order'
import { cryptPassword } from "../lib/password";
import connectDb from '@/db/connectDB'

const seed = async () => {
  await connectDb();

  // delete table dates
  await User.deleteMany({})
  await Category.deleteMany({})
  await Book.deleteMany({})
  await Filter.deleteMany({})
  await Cart.deleteMany({})
  await Order.deleteMany({})

  // insert user
  await User.create({name: 'Test',email: 'test@mail.com',password: await cryptPassword('secret')})

  await Category.insertMany([
    { name: 'Drama'},{ name: 'Akcija'},{ name: 'Istorijski'},{ name: 'Biografski'},{ name: 'Knjige za decu'}
  ])

  await Filter.insertMany([
    { name: 'Najmlađi: do 3 god'},{ name: 'Mali školarci: od 7 do 9 god'},{ name: 'Predškolci: od 3 do 6 god'},{ name: 'Školarci: 10 do 12 god'}
  ])

  const dramaCategory = await Category.findOne({name: 'Drama'});
  const historyCategory = await Category.findOne({name: 'Istorijski'});
  const childrenCategory = await Category.findOne({name: 'Knjige za decu'});

  const filterCategory1 = await Filter.findOne({name: 'Najmlađi: do 3 god'});
  const filterCategory2 = await Filter.findOne({name: 'Mali školarci: od 7 do 9 god'});

  await Book.insertMany([
    {
      title:'Svaki izlazak sunca',
      author: 'Džamila Ahmed',
      letter: 'latin',
      format: '13x20',
      img: '/img/books/svaki_izlazak_sunca.jpg',
      price: 1000,
      binding: 'hard',
      pages: 300, // number
      publisher: 'Laguna',
      year: 2001, // number
      description: 'Kerman, XII vek. Maštovita i lepa devojka po imenu Šeherezada, izvanrednog pripovedačkog talenta i ljupke lepote, poželela je da nikad nije otvorila vrata i uhvatila Fataneh-hatun u preljubi. Tajna, teška kao olovo, morila je neodlučnu Šeherezadu – da li će njenim otkrivanjem slomiti malikovo srce?',
      category: dramaCategory._id,
    },
    {
      title:'Okean: Poslednja divljina na Zemlji',
      author: 'Dejvid Atenboro, Kolin Batfild',
      letter: 'cyrilic',
      format: '13x20',
      img: '/img/books/okean-dejvid_atenboro-_kolin_batfild.jpg',
      price: 1000,
      binding: 'hard',
      pages: 200, // number
      publisher: 'Laguna',
      year: 2025, // number
      description: 'Od zaleđenih prostranstava naših polova do skrovitih kutaka toplih mora, Dejvid Atenboro je kamerom zabeležio mnoge delove jedinstvenog okeana planete Zemlje. Sada nam, sa dugogodišnjim saradnikom Kolinom Batfildom, donosi priču o toj našoj poslednjoj velikoj divljini – onoj koja oblikuje kopno na kome živimo, reguliše klimu i stvara vazduh koji udišemo. Zaronite u osam bajkovitih morskih staništa, plivajte kroz šume algi, guste mangrove i duž živopisnih koralnih grebena, sve do dubina od gotovo 3.500 metara, do najudaljenijih kutaka najneistraženijeg ekosistema na našoj planeti. Prepustite se putovanju s veličanstvenim plavim kitovima; razigranim ribama klovnovima, blistavim bioluminescentnim meduzama i misterioznom vampirskom lignjom.',
      category: dramaCategory._id,
    },
    {
      title:'Najkraća istorija ekonomije',
      author: 'Endru Li',
      letter: 'latin',
      format: '13x20',
      img: '/img/books/najkraca_istorija_ekonomije-endru.jpg',
      price: 900,
      binding: 'hard',
      pages: 220, // number
      publisher: 'Laguna',
      year: 2024, // number
      description: 'Počevši od zore poljoprivrede i krećući se kroz ključne epohe poput industrijske revolucije i globalizacije, Endru Li vešto istražuje teme kao što su uloga tehnologije, važnost tržišta i uticaj politike na ekonomski rast i nejednakost. Čitaoci će steći dublje razumevanje ključnih pojmova poput komparativne prednosti, ponude i potražnje i uloge institucija u oblikovanju ekonomskih ishoda. Autor se suočava i sa izazovima i dilemama savremene ekonomije, uključujući klimatske promene, nejednakost dohotka i etičke implikacije tehnološkog napretka. Bilo da ste student ekonomije, politički analitičar ili jednostavno radoznali um, ova knjiga će vam pružiti bogato i pristupačno razumevanje snaga koje pokreću naš svet.',
      category: historyCategory._id,
    },
    {
      title:'Mastering the Craft',
      author: 'Miroslav Mišković',
      letter: 'latin',
      format: '13x20',
      img: '/img/books/mastering_the_craft.jpg',
      price: 700,
      binding: 'hard',
      pages: 220, // number
      publisher: 'Laguna',
      year: 2023, // number
      description: 'Everything I Have Learned About Business The Hard Way Following the success of his bestseller I, Tycoon, Miroslav Mišković distills over half a century of business experience into Mastering the Craft. In this book, he shares the invaluable lessons he’s learned—often the hard way—so readers can avoid his mistakes and, most importantly, gain insights from his successes.',
      category: historyCategory._id,
    },
    {
      title:'Hajduk u Beogradu',
      author: 'Gradimir Stojković',
      letter: 'latin',
      format: '13x20',
      img: '/img/books/hajduk_u_beogradu.jpg',
      price: 600,
      binding: 'hard',
      pages: 240, // number
      publisher: 'Laguna',
      year: 2024, // number
      description: 'Gligorije Pecikoza Hajduk dolazi iz sela u Beograd i polazi u osmi razred. Trudi se da bude prihvaćen i kao izvanredan košarkaš, i kao dobar drug, i kao odličan đak, i kao odgovoran sin. Rastrzan između novih iskustava i osećanja, Hajduk će se nositi sa raznim preprekama i otkriti da postoji sila koja sve može da promeni i uzburka: ljubav...',
      category: childrenCategory._id,
      filter: filterCategory1._id
    },
    {
      title:'Rob i Ot: Dva robota',
      author: 'Đaume Kopons',
      letter: 'latin',
      format: '13x20',
      img: '/img/books/rob_i_ot_dva_robota.jpg',
      price: 500,
      binding: 'hard',
      pages: 70, // number
      publisher: 'Laguna',
      year: 2024, // number
      description: 'Upoznajte ROBA i OTA – dva šašava robota! Iako mnogo toga ne znaju, tu su UNA i njen pas ŠVRĆA da im pomognu! Uz ovu posebnu knjigu deca će sa Robom i Otom istraživati svet oko sebe, usvajati nove pojmove i podsticati znatiželju.',
      category: childrenCategory._id,
      filter: filterCategory2._id
    },
    {
      title:'Tom Gejts – Epska avantura ',
      author: 'Liz Pišon',
      letter: 'latin',
      format: '13x20',
      img: '/img/books/tom_gejts_epska_avantura.jpg',
      price: 700,
      binding: 'hard',
      pages: 240, // number
      publisher: 'Laguna',
      year: 2024, // number
      description: 'To što imam dva para baka i deka ispalo je super po mene. Ura! Smežuranci stalno dele poklone, a porodični izlet koji planiraju biće pravo epsko putovanje. Ide i Dilija (nažalost). Dobro, uvek mogu da je ignorišem.',
      category: childrenCategory._id,
      filter: filterCategory2._id
    }
  ])

  console.log("Seeding done")

  await mongoose.connection.close()
}

seed()
  .then(() => {
    console.log("Process finished")
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })