import LogoLockup from "@/assets/logo-lockup.svg";
import SearchInput from "./SearchInput";

export default function Navbar() {
  return (
    <nav
      className="w-full h-28 flex flex-wrap justify-center items-center sm:justify-between sm:h-16 border-b-2 border-gray-400 content-evenly px-6"
      role="navigation"
    >
      <a href="http://localhost:3000/">
        <LogoLockup />
      </a>
      <SearchInput />
    </nav>
  );
}
