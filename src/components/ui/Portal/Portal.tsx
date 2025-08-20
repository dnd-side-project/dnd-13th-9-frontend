import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
  /** CSS selector for the target container. Defaults to body when not provided or not found. */
  selector?: string;
};

export function Portal({ children, selector }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const [target, setTarget] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setMounted(true);
    const el = selector ? document.querySelector(selector) : document.body;
    setTarget(el);
    return () => setMounted(false);
  }, [selector]);

  return mounted && target
    ? ReactDOM.createPortal(<AnimatePresence>{children}</AnimatePresence>, target)
    : null;
}
