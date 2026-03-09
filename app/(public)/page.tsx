import { getBooks } from "@/action/Book";
import Slider from "@/components/Slider";


export default async function Home() {
  const {books} = await getBooks({});

  if(!books.length){
    return <h2 className="title">No books</h2>
  }

  return (
    <div className="space-y-20 mt-5">
      <section>
        <h2 className="title">Novi naslovi</h2>

        <Slider items={books} slideNumber="basis-1/3" bgCard="bg-card" />
      </section>

      <section className=" py-10 rounded-2xl">
        <h2 className="title">Knjige pisaca rođenih u februaru</h2>

        <div>
          <Slider items={books} slideNumber="basis-1/5"  />
        </div>
      </section>

      <section>
        <h2 className="title">Dobitnici Ninove nagrade</h2>

        <Slider items={books} slideNumber="basis-1/5" />
      </section>
    </div>
  );
}
