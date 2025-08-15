import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
type Props = {
  children: React.ReactNode;
};
export function Portal({ children }: Props) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? ReactDOM.createPortal(<AnimatePresence>{children}</AnimatePresence>, document.body)
    : null;
}
