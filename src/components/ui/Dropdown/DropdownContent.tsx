import { useDropdown } from './Dropdown.Context';
export function DropdownContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useDropdown();
  if (!isOpen) return null;
  return <div>{children}</div>;
}
