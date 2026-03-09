import { UserType } from '@/models/User'
import { DropdownMenuAvatar } from './ProfileDropdown'
import Link from 'next/link'

type NavDropdownProps = {
    user: UserType
}


const NavDropdown = ({user}: NavDropdownProps) => {
  return (
     <>
        {user ? (
            <div className="flex items-center gap-3">
                <span className='dark:text-accent'>Welcome {user.name} !</span>
                <DropdownMenuAvatar />
            </div>
        ) : (
            <Link href="/login" className="hover:text-red-700">Login</Link>
        )}  
    </>
  )
}

export default NavDropdown