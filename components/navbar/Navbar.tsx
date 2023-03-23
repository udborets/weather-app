interface INavbarProps {
  children: JSX.Element[];
}

const Navbar = ({ children }: INavbarProps) => {
  return (
    <nav className='navbar grid items-center'>
      <ul className="navbar__links flex gap-3 self-center align-center w-full">
        {children}
      </ul>
    </nav>
  )
}

export default Navbar