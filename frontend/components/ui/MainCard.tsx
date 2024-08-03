import { FC, useState } from 'react';
import { TypographyH3 } from './typography';
import { Item, SortableList, SortableListItem } from './SortableList';
import { Plus } from 'lucide-react';

interface MainCardProps {
  label: string;
  initialItems: Item[];
  taskCard?: boolean;
}

export const MainCard: FC<MainCardProps> = ({
  label,
  initialItems,
  taskCard,
}) => {
  const [sortableItems, setSortableItems] = useState(initialItems);

  const handleCompleteItem = (id: number) => {
    setSortableItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const handleRemoveItem = (id: number) => {
    setSortableItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const renderItem = (
    item: Item,
    order: number,
    onCompleteItem: (id: number) => void,
    onRemoveItem: (id: number) => void,
  ) => (
    <SortableListItem
      key={item.id}
      item={item}
      order={order}
      onCompleteItem={onCompleteItem}
      onRemoveItem={onRemoveItem}
      handleDrag={() => {}}
    />
  );

  return (
    <div className="rounded-2xl max-w-[410px] bg-[#171717] p-4">
      <div className="text-white mb-2">
        <TypographyH3>{label}</TypographyH3>
      </div>
      <SortableList
        items={sortableItems}
        setItems={setSortableItems}
        onCompleteItem={handleCompleteItem}
        renderItem={(item, order) =>
          renderItem(item, order, handleCompleteItem, handleRemoveItem)
        }
      />
      {taskCard && (
        <div className="mt-4 relative">
          <button className="flex items-center text-[#848484]">
            <Plus className="mr-1" />
            ADD TASK
          </button>
          <div className="absolute top-12 left-0 right-0 h-[1px] bg-[#363636] w-full"></div>
        </div>
      )}
    </div>
  );
};
