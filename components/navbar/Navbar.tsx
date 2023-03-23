interface NavbarProps {
  children: JSX.Element[];
}

const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav>
      <ul>
        {children}
      </ul>
    </nav>
  )
}

export default Navbar