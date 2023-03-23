import Link from "next/link";

interface NavbarLinkProps {
  href: string;
  children: string;
}

const NavbarLink = ({ href, children }: NavbarLinkProps) => {
  return (
    <li>
      <Link href={href} className="">
        {children}
      </Link>
    </li>
  )
}

export default NavbarLink