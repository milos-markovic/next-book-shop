
import { ModeToggle } from './ModeToggle'
import Logo from './Logo'
import { getAuthUser } from '@/lib/dal'
import Search from './Search'
import NavDropdown from './NavDropdown'
import { navLinks } from '@/links/header'
import NavLinks from './NavLinks'
import Cart from './Cart'

const Header = async () => {
   const user = await getAuthUser();

  return (
    <header className='bg-background'>
        <div className='max-w-7xl mx-auto flex items-center justify-between py-3 px-4 text-primary border-b border-border'>
            <Logo />
            <Search />
            <div className="flex items-center space-x-8">
               <ModeToggle />
               <Cart />
               <NavDropdown user={user} />
            </div>
        </div>
        <NavLinks links={navLinks} />
    </header>
  )
}

export default Header