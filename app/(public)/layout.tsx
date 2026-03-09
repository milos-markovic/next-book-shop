import Footer from "@/components/Footer"
import Header from "@/components/Header"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="min-h-screen flex flex-col">
    <Header />
    
    <main className="flex-1 max-w-7xl mx-auto w-full p-4">
      {children}
    </main>

    <Footer />
  </section>
}