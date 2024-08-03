'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  Reorder,
  motion,
  useDragControls,
} from 'framer-motion';
import { Plus, Trash } from 'lucide-react';
import useMeasure from 'react-use-measure';

import { cn } from '@/lib/utils';

export type Item = {
  text: string;
  checked: boolean;
  id: number;
  description: string;
  timeLeft: number;
};

interface SortableListItemProps {
  item: Item;
  order: number;
  onCompleteItem: (id: number) => void;
  onRemoveItem: (id: number) => void;
  renderExtra?: (item: Item) => React.ReactNode;
  isExpanded?: boolean;
  className?: string;
  handleDrag: () => void;
}

function SortableListItem({
  item,
  order,
  onCompleteItem,
  onRemoveItem,
  renderExtra,
  handleDrag,
  isExpanded,
  className,
}: SortableListItemProps) {
  let [ref, bounds] = useMeasure();
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggable, setIsDraggable] = useState(true);
  const dragControls = useDragControls();
  const [timeLeft, setTimeLeft] = useState(item.timeLeft);
  const isCompleteRef = useRef(false);

  // for temporary timer output
  useEffect(() => {
    if (timeLeft === 0 && !isCompleteRef.current) {
      isCompleteRef.current = true;
      onCompleteItem(item.id);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, item.id, isCompleteRef.current]);

  const formatedTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);

    return `${hours}h ${minutes} min`;
  };

  const handleDragStart = (event: any) => {
    setIsDragging(true);
    dragControls.start(event, { snapToCursor: true });
    handleDrag();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <motion.div className={cn('', className)} key={item.id}>
      <div className="flex w-full items-center">
        <Reorder.Item
          value={item}
          className={cn(
            'relative z-auto grow',
            'h-full rounded-xl bg-[#262626]/80',
            'min-h-14 my-1',
            'shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]',
            item.checked ? 'cursor-not-allowed' : 'cursor-grab',
            item.checked && !isDragging ? 'w-7/10' : 'w-full',
          )}
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            height: bounds.height > 0 ? bounds.height : undefined,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.4,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.05,
              type: 'spring',
              bounce: 0.1,
            },
          }}
          layout
          layoutId={`item-${item.id}`}
          dragListener={!item.checked}
          dragControls={dragControls}
          onDragEnd={handleDragEnd}
          style={
            isExpanded
              ? {
                  zIndex: 9999,
                  marginTop: 10,
                  marginBottom: 10,
                  position: 'relative',
                  overflow: 'hidden',
                }
              : {
                  position: 'relative',
                  overflow: 'hidden',
                }
          }
          whileDrag={{ zIndex: 9999 }}
        >
          <div className="flex flex-col w-full">
            <div ref={ref} className={cn(isExpanded ? '' : '', 'z-20 ')}>
              <motion.div
                layout="position"
                className="flex items-center justify-between w-full"
              >
                <AnimatePresence>
                  {!isExpanded ? (
                    <motion.div
                      initial={{ opacity: 0, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: 0.001 }}
                      className="flex items-center justify-between w-full m-2"
                    >
                      {/* List Title */}
                      <motion.div
                        key={`${item.checked}`}
                        className="min-w-[150px]"
                        initial={{
                          opacity: 0,
                          filter: 'blur(4px)',
                        }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{
                          bounce: 0.2,
                          delay: item.checked ? 0.2 : 0,
                          type: 'spring',
                        }}
                      >
                        <h4
                          className={cn(
                            'tracking-tighter text-xs',
                            item.checked ? 'text-red-400' : 'text-white',
                          )}
                        >
                          {item.checked ? 'Delete' : ` ${item.text}`}
                        </h4>
                      </motion.div>
                      <Plus className="text-white ml-auto" />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                {/* List Item Children */}
                {renderExtra && renderExtra(item)}
              </motion.div>
              {/* Time display (fix) */}
              <div className="flex w-full items-center justify-between text-[#848484] text-[10px] m-2">
                <div>{formatedTime()}</div>
                <span className="text-white text-[10px] px-5">00:00</span>{' '}
              </div>
            </div>
            <div
              onPointerDown={isDraggable ? handleDragStart : undefined}
              style={{ touchAction: 'none' }}
            />
          </div>
        </Reorder.Item>
        {/* List Delete Action Animation */}
        <AnimatePresence mode="popLayout">
          {item.checked ? (
            <motion.div
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.17,
                  duration: 0.17,
                  type: 'spring',
                  bounce: 0.6,
                },
                zIndex: 5,
              }}
              exit={{
                opacity: 0,
                x: -5,
                transition: {
                  delay: 0,
                  duration: 0.0,
                  type: 'spring',
                  bounce: 0,
                },
              }}
              className="-ml-[1px] h-[1.5rem] w-3 rounded-l-none  rounded-r-none border-y  border-y-white/5 border-r-white/10 bg-[#161716] "
            />
          ) : null}
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          {item.checked ? (
            <motion.div
              layout
              initial={{ opacity: 0, x: -5, filter: 'blur(4px)' }}
              animate={{
                opacity: 1,
                x: 0,
                filter: 'blur(0px)',
                transition: {
                  delay: 0.3,
                  duration: 0.15,
                  type: 'spring',
                  bounce: 0.9,
                },
              }}
              exit={{
                opacity: 0,
                filter: 'blur(4px)',
                x: -10,
                transition: { delay: 0, duration: 0.12 },
              }}
              className="inset-0 z-0 border-spacing-1  rounded-r-xl rounded-l-sm border-r-2   border-r-red-300/60 bg-[#161716]/80 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)] dark:bg-[#161716]/50"
            >
              <button
                className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium  transition-colors duration-150   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => onRemoveItem(item.id)}
              >
                <Trash className="h-4 w-4 text-red-400 transition-colors duration-150 fill-red-400/60 " />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

SortableListItem.displayName = 'SortableListItem';

interface SortableListProps {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  onCompleteItem: (id: number) => void;
  renderItem: (
    item: Item,
    order: number,
    onCompleteItem: (id: number) => void,
    onRemoveItem: (id: number) => void,
  ) => ReactNode;
}

function SortableList({
  items,
  setItems,
  onCompleteItem,
  renderItem,
}: SortableListProps) {
  if (items) {
    return (
      <LayoutGroup>
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="flex flex-col"
        >
          <AnimatePresence>
            {items?.map((item, index) =>
              renderItem(item, index, onCompleteItem, (id: number) =>
                setItems((items) => items.filter((item) => item.id !== id)),
              ),
            )}
          </AnimatePresence>
        </Reorder.Group>
      </LayoutGroup>
    );
  }
  return null;
}

SortableList.displayName = 'SortableList';

export { SortableList, SortableListItem };
