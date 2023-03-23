import Link from 'next/link';

import Navbar from '@/components/navbar/Navbar';
import NavbarLink from '@/components/NavbarLink/NavbarLink';
import { ubuntuBold } from "@/fonts/ubuntu";

const Header = () => {
  return (
    <header className="header h-[100px] p-4 w-full min-w-full flex justify-center">
      <div className="header__container flex w-4/5 h-full min-h-ful">
        <Link href="/" className="header__title w-fit h-fit self-center ">
          <h2 className="title__text w-fit h-fit">
            <span className={`title__blue text-[1.7rem] text-sky ${ubuntuBold.className}`}>
              My
            </span>
            <span className={`title-black text-[1.7rem] text-black ${ubuntuBold.className}`}>
              Weather
            </span>
          </h2>
        </Link>
        <div className="header__split w-[1px] h-3/5 bg-gray-500 self-center mx-6" />
        <Navbar>
          <NavbarLink href="/">
            Home
          </NavbarLink>
          <NavbarLink href="/testi">
            testi
          </NavbarLink>
        </Navbar>
      </div>
    </header >
  )
}

export default Header