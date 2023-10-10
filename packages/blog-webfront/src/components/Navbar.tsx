import classNames from "classnames";
import { Suspense, startTransition, useState } from "react";
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
import LoginButton from "./LoginButton.js";
import SearchModal from "./SearchModal.js";
import { ErrorBoundary } from "react-error-boundary";
import Authorized from "./Authorized.js";

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
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const handleSearchIconClick = () => setOpenSearchModal(true);
  const handleSearchModalClose = () => setOpenSearchModal(false);

  return (
    <>
      <div className="flex items-center justify-between py-2 dark:border-gray-600 ">
        {isHomePage ? (
          <div />
        ) : (
          <button
            className="p-1 opacity-75"
            onClick={() => startTransition(() => navigate(-1))}
          >
            <MdOutlineKeyboardBackspace className="w-5 h-5" />
            <span className="sr-only">Go back</span>
          </button>
        )}
        <div className="flex gap-x-2">
          <button className="p-1 opacity-75" onClick={() => toggleColorMode()}>
            <ColorModeIcon className="w-5 h-5" />
            <span className="sr-only">Write a new Article</span>
          </button>
          <Authorized expectedRole="admin">
            <Link className="p-1 opacity-75" to="/edit">
              <AiOutlineEdit
                className={classNames(
                  "w-5 h-5",
                  isEditPage && "text-cyan-700 scale-105"
                )}
              />
              <span className="sr-only">Write a new Article</span>
            </Link>
          </Authorized>
          <button className={"p-1"} onClick={handleSearchIconClick}>
            <MdOutlineSearch className="w-5 h-5" />
            <span className="sr-only">Search Article by keyword</span>
          </button>
          <ErrorBoundary fallback={<></>}>
            <Suspense fallback={null}>
              <LoginButton />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <SearchModal open={openSearchModal} onClose={handleSearchModalClose} />
    </>
  );
};

export default Navbar;
