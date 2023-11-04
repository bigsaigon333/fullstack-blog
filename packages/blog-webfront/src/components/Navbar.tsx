import classNames from "classnames";
import { Suspense, startTransition, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineKeyboardBackspace, MdOutlineSearch } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Authorized from "./Authorized.js";
import Link from "./Link.js";
import LoginButton from "./LoginButton.js";
import SearchModal from "./SearchModal.js";

const Navbar = () => {
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
          <Suspense fallback={null}>
            <Authorized expectedRole="admin" fallback={null}>
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
          </Suspense>
          {isHomePage && (
            <button className={"p-1"} onClick={handleSearchIconClick}>
              <MdOutlineSearch className="w-5 h-5" />
              <span className="sr-only">Search Article by keyword</span>
            </button>
          )}
          <ErrorBoundary fallback={<></>}>
            <LoginButton />
          </ErrorBoundary>
        </div>
      </div>
      <SearchModal open={openSearchModal} onClose={handleSearchModalClose} />
    </>
  );
};

export default Navbar;
