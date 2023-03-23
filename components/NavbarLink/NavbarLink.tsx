import { ubuntu, ubuntuBold } from "@/fonts/ubuntu";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavbarLinkProps {
  href: string;
  children: string;
}

const NavbarLink = ({ href, children: text }: NavbarLinkProps) => {
  const { asPath } = useRouter();
  const isCurrentPage = asPath === href;
  return (
    <li className='navbarLink w-fit h-fit'>
      <Link href={href} className={`navbarLink__link p-1 ${isCurrentPage ? "text-sky" : "text-black"} text-[1.17rem] hover:text-sky transition-all duration-500 ease-out ${ubuntuBold.className}`}>
        {text}
      </Link>
    </li>
  )
}

export default NavbarLink