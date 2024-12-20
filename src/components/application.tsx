import { FC, useState } from 'react';
import {
  createItem,
  filterItems,
  getInitialItems,
  removeItem,
  updateItem,
} from '../lib/items';
import Header from './header';
import ItemList from './item-list';
import MarkAllAsUnpacked from './mark-all-as-unpacked';
import NewItem from './new-item';
import { Item, ItemUpdates } from '../global';

const Application: FC = () => {
  const [items, setItems] = useState<Item[]>(getInitialItems());
  const [newItemName, setNewItemName] = useState<string>('');

  const add = (name: string): void => {
    const item = createItem(name);
    setItems([...items, item]);
  };

  const update = (id: string, updates: ItemUpdates): void => {
    setItems(updateItem(items, id, updates));
  };

  const remove = (id: string): void => {
    setItems(removeItem(items, id));
  };

  const unpackedItems = filterItems(items, { packed: false });
  const packedItems = filterItems(items, { packed: true });

  const markAllAsUnpacked = (): void => {
    setItems(items.map((item) => ({ ...item, packed: false })));
  };

  return (
    <main className="flex flex-col gap-8 p-8 mx-auto lg:max-w-4xl">
      <Header items={items} />
      <NewItem
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        addItem={add}
      />
      <section className="flex flex-col gap-8 md:flex-row">
        <ItemList
          title="Unpacked Items"
          items={unpackedItems}
          update={update}
          remove={remove}
        />
        <ItemList
          title="Packed Items"
          items={packedItems}
          update={update}
          remove={remove}
        />
      </section>
      <MarkAllAsUnpacked onClick={markAllAsUnpacked} />
    </main>
  );
};

export default Application;