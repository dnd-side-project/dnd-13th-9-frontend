import { DropdownMain } from './DropdownMain';
import { DropdownTrigger } from './DropdownTrigger';
import { DropdownContent } from './DropdownMain';
import { DropdownBaseItem } from './DropdownBaseItem';
import { DropdownFavoriteItem } from './DropdownFavoriteItem';
import { DropdownItemSeparator } from './DropdownItemSeparator';
import { DropdownTextAreaItem } from './DropdownTextAreaItem';

type DropdownCompoundProps = typeof DropdownMain & {
  Trigger: typeof DropdownTrigger;
  FavoriteItem: typeof DropdownFavoriteItem;
  TextAreaItem: typeof DropdownTextAreaItem;
  Separator: typeof DropdownItemSeparator;
  BaseItem: typeof DropdownBaseItem;
};

const Dropdown = DropdownMain as DropdownCompoundProps;

Dropdown.Trigger = DropdownTrigger;
Dropdown.FavoriteItem = DropdownFavoriteItem;
Dropdown.TextAreaItem = DropdownTextAreaItem;
Dropdown.Separator = DropdownItemSeparator;
Dropdown.BaseItem = DropdownBaseItem;

export { Dropdown, DropdownContent };
