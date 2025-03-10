import Link from "next/link";
import LogoLockup from "@/assets/logo-lockup.svg";
import SearchInput from "./SearchInput";

export default function Navbar() {
  return (
    <nav
      className="w-full h-[112px] flex flex-col flex-wrap space-y-4 justify-center items-center border-b-2 borger-gray-400 px-6 sm:flex-row sm:justify-between sm:h-16 sm:space-y-0"
      role="navigation"
    >
      <Link href="/">
        <LogoLockup />
      </Link>
      <SearchInput />
    </nav>
  );
}
