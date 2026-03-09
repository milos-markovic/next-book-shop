import CartAside from "./components/CartAside"
import CartMenu from "./components/CartMenu"

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="flex gap-8">
        <CartAside />
        <div className="w-full">
            <CartMenu />
            {children}
        </div>
    </section>
}