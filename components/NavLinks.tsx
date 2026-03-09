import Link from 'next/link'

type Link ={
    href: string, 
    label: string
}

type NavLinksProps = {
    links: Link[]
}

const NavLinks = ({links}: NavLinksProps) => {
  return (
    <nav className="max-w-7xl mx-auto p-2 px-4 space-x-10 text-lg flex">
        {links.map(link => {
            return (
                <Link key={link.label} href={link.href} className="hover:text-primary">{link.label}</Link>
            )
        })}
    </nav>
  )
}

export default NavLinks