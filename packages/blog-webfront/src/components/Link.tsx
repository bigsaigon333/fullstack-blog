import { forwardRef, startTransition } from "react";
import { LinkProps, useHref, useLinkClickHandler } from "react-router-dom";

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ onClick, replace = false, state, target, to, ...rest }, ref) => {
    const href = useHref(to);
    const handleClick = useLinkClickHandler(to, { replace, state, target });

    return (
      <a
        {...rest}
        href={href}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            startTransition(() => handleClick(event));
          }
        }}
        ref={ref}
        target={target}
      />
    );
  }
);

export default Link;
