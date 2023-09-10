import classNames from "classnames";
import { AiOutlineEdit } from "react-icons/ai";
import {
  MdOutlineDarkMode,
  MdOutlineKeyboardBackspace,
  MdOutlineLightMode,
  MdOutlineSearch,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { match } from "ts-pattern";
import useColorMode from "../hooks/useColorMode.js";
import Link from "./Link.js";

const Navbar = () => {
  const [colorMode, _, toggleColorMode] = useColorMode();
  const ColorModeIcon = match(colorMode)
    .with("dark", () => MdOutlineLightMode)
    .with("light", () => MdOutlineDarkMode)
    .exhaustive();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isEditPage = location.pathname.startsWith("/edit");

  return (
    <div className="flex items-center justify-between py-2 dark:border-gray-600 ">
      {isHomePage ? (
        <div />
      ) : (
        <button className="p-1 opacity-75" onClick={() => navigate(-1)}>
          <MdOutlineKeyboardBackspace className="w-5 h-5" />
          <span className="sr-only">Go back</span>
        </button>
      )}
      <div className="flex gap-x-2">
        <button className="p-1 opacity-75" onClick={() => toggleColorMode()}>
          <ColorModeIcon className="w-5 h-5" />
          <span className="sr-only">Write a new Article</span>
        </button>
        <Link className="p-1 opacity-75" to="/edit">
          <AiOutlineEdit
            className={classNames(
              "w-5 h-5",
              isEditPage && "text-cyan-700 scale-105"
            )}
          />
          <span className="sr-only">Write a new Article</span>
        </Link>
        <button
          className={classNames(
            "p-1",
            "cursor-not-allowed focus:outline-none opacity-50"
          )}
          disabled
        >
          <MdOutlineSearch className="w-5 h-5" />
          <span className="sr-only">Search Article by keyword</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
