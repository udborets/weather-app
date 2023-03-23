interface NavbarProps {
  children: JSX.Element[];
}

const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav className='navbar grid items-center'>
      <ul className="navbar__links flex gap-3 self-center align-center w-full">
        {children}
      </ul>
    </nav>
  )
}

export default Navbar