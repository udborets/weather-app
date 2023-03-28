import Link from 'next/link';

import CitySearchBar from '@/components/CitySearchBar/CitySearchBar';
import { Navbar } from '@/components/Navbar/Navbar';
import { NavbarLink } from '@/components/NavbarLink/NavbarLink';
import { ubuntuBold } from "@/fonts/ubuntu";

const Header = () => {
  return (
    <header className="header h-[80px] p-4 w-full min-w-full flex justify-center">
      <div className="header__container flex w-4/5 h-full min-h-full justify-around gap-4 flex-wrap">
        <div className="header__left flex">
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
          <div className="header__split w-[1px] h-1/2 bg-slate-300 self-center mx-6" />
          <Navbar>
            <NavbarLink href="/">
              Home
            </NavbarLink>
          </Navbar>
        </div>
        <div className="header__right self-center">
          <CitySearchBar />
        </div>
      </div>
    </header >
  )
}

export default Header