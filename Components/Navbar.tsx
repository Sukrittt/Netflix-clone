import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";

import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66; //bg animation starting after crossing this offset.

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false); //mobile menu visibility
  const [showAccountMenu, setShowAccountMenu] = useState(false); //account menu visibility
  const [showBackground, setShowBackground] = useState(false); //navbar bg animation

  //to set the state for change of navbar background color on scroll.
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
        return;
      }
      setShowBackground(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      //unmount function
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //to toggle account menu
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  //to toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current); //reverse of current value
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground && "bg-zinc-900/90"
        }`}
      >
        <img
          className="h-4 lg:h-7"
          src="/images/logo.png"
          alt="netflix-logo"
          loading="lazy"
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu && "rotate-180"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                src="/images/profile-blue.png"
                alt="profile-icon"
                height={75}
                width={100}
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu && "rotate-180"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
