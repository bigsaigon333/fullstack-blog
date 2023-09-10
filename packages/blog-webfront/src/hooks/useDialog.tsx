import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import {
  FC,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";

const dialogOpenAtomFamily = atomFamily((key: number) => atom(true));

let key = 0;

export const useDialog = () => {
  const addDialog = useContext(dialogContext);

  if (!addDialog) {
    throw new Error("DialogProvider를 사용하지 않았습니다.");
  }

  const open = (
    Component: FC<{ open: boolean; onOpenChange: (force: boolean) => void }>
  ) => {
    const Dialog = () => {
      const [isOpen, setIsOpen] = useAtom(dialogOpenAtomFamily(key));

      return (
        <>
          {isOpen &&
            createPortal(
              <div className="fixed w-full h-full bg-gray-500/50 inset-0 z-10 grid place-content-center">
                <Component
                  open={isOpen}
                  onOpenChange={(force) => setIsOpen(force)}
                />
              </div>,
              document.body
            )}
        </>
      );
    };

    addDialog(<Dialog key={++key} />);
  };

  return { open };
};

const dialogContext = createContext<((element: ReactElement) => void) | null>(
  null
);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [ReactElements, setReactElements] = useState<ReactElement[]>([]);

  const addDialog = useCallback((node: ReactElement) => {
    setReactElements((prev) => [...prev, node]);
  }, []);

  return (
    <dialogContext.Provider value={addDialog}>
      {children}
      {ReactElements}
    </dialogContext.Provider>
  );
};
