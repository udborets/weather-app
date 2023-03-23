import Link from 'next/link';

import { ubuntuBold } from "@/fonts/ubuntu";

const Header = () => {
  return (
    <header className="header h-[100px] p-4 w-full min-w-full flex justify-center">
      <div className="header__container flex w-4/5 h-full min-h-ful">
        <Link href="/" className="w-fit h-fit self-center">
          <h2 className="header__title w-fit h-fit">
            <span className={`title__blue text-[1.7rem] pl-3 text-[#089cfc] ${ubuntuBold.className}`}>
              My
            </span>
            <span className={`title-black text-[1.7rem] text-black pr-3 border-r-[1px] ${ubuntuBold.className}`}>
              Weather
            </span>
          </h2>
        </Link>
      </div>
    </header >
  )
}

export default Header