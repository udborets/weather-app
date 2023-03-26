<<<<<<< HEAD
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
=======
import Link from "next/link";
import { useRouter } from "next/router";
>>>>>>> e447c6cbc073bbd9c4471de428231d75170d4756

import { ubuntuBold } from "@/fonts/ubuntu";

interface INavbarLinkProps {
  href: string;
  children: string;
}

export const NavbarLink = ({ href, children: text }: INavbarLinkProps) => {
<<<<<<< HEAD
  const path = usePathname();
  const isCurrentPage = path === href;
=======
  const { asPath } = useRouter();
  const isCurrentPage = asPath === href;
>>>>>>> e447c6cbc073bbd9c4471de428231d75170d4756
  return (
    <li className='navbarLink w-fit h-fit'>
      <Link href={href} className={`navbarLink__link p-1 ${isCurrentPage ? "text-sky" : "text-black"} text-[1.17rem] hover:text-sky transition-all duration-500 ease-out ${ubuntuBold.className}`}>
        {text}
      </Link>
    </li>
  )
}
