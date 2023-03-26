'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ubuntuBold } from "@/fonts/ubuntu";

interface INavbarLinkProps {
  href: string;
  children: string;
}

export const NavbarLink = ({ href, children: text }: INavbarLinkProps) => {
  const path = usePathname();
  const isCurrentPage = path === href;
  return (
    <li className='navbarLink w-fit h-fit'>
      <Link href={href} className={`navbarLink__link p-1 ${isCurrentPage ? "text-sky" : "text-black"} text-[1.17rem] hover:text-sky transition-all duration-500 ease-out ${ubuntuBold.className}`}>
        {text}
      </Link>
    </li>
  )
}
