import Task from "./Task";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskContext } from "../../context/TaskContext";
import { VStack } from "@chakra-ui/react";
import '../../styles/TaskList.css';

// ==========================================
// Task List Component
// ==========================================

export default function TaskList({tasks}) {
  const { handleDragEnd } = useTaskContext();

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map(task => task?.id)} strategy={verticalListSortingStrategy}>
        <VStack className="task-list" spacing={2} align="stretch">
          <AnimatePresence>
            {tasks.map(task => (
              <motion.li 
                key={task.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
              >
                  <Task task={task} />
              </motion.li>
            ))}
          </AnimatePresence>
        </VStack>
      </SortableContext>
    </DndContext>
  );
}

