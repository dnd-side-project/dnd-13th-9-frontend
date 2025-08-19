import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DropdownContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(undefined);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('useDropdown must be used within a DropdownProvider');
  return context;
};

interface Props {
  children: ReactNode;
  defaultOpen?: boolean;
}

export function DropdownProvider({ children, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>{children}</DropdownContext.Provider>
  );
}
