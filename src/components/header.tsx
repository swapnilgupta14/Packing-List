import { FC } from 'react';
import { HeaderProps } from '../global';

const Header: FC<HeaderProps> = ({ items }) => (
  <header id="page-header">
    <h1 className="text-2xl font-bold">Packing List</h1>
    <p id="number-of-items">
      {items.length} {items.length === 1 ? 'item' : 'items'}
    </p>
  </header>
);

export default Header;