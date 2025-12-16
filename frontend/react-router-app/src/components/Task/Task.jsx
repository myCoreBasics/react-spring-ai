import { useState } from "react";
import { useTaskContext } from '../../context/TaskContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Box, Text, Input, Button, Checkbox } from "@chakra-ui/react";
import '../../styles/task/Task.css';

// ==========================================
// Task Component
// ==========================================

export default function Task({task}) {
  const { handleCheckTask, handleDeleteTask, handleChangeTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [changeText, setChangeText] = useState(task?.text);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  
  const handleCheck = (isChecked) => {
    // if (!task.done) {
    //   confetti({
    //     particleCount: 100,
    //     spread: 70,
    //     origin: { y: 0.8 }
    //   });
    // }
    // handleCheckTask(task)
    handleCheckTask({ ...task, done: isChecked });
  };

  const handleEdit = () => {
    setChangeText(task?.text);
    setIsEditing(true)
  };

  const handleSave = async () => {
    if (changeText.trim() === '') return;
    await handleChangeTask({
      ...task, 
      text: changeText
    }); 
    setIsEditing(false)
  }

  const handleDelete = () => {
    handleDeleteTask(task)
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      handleSave()
    }else if(e.key === 'Escape'){
      setChangeText(task?.text)
      setIsEditing(false)
    }
  }

  return (
    <motion.div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      className="task-item"
    >
      <Text {...listeners} style={{ cursor: 'grab' }}>☰</Text>
      <Box className="checkbox-wrapper">
        <Checkbox
          className="task-checkbox"
          size="md"
          colorScheme="purple"
          isChecked={task?.done}
          onChange={handleCheck}
        />
        {/* 반짝이 별들 추가 */}
        {task?.done && (
          <>
            <Text className="sparkle sparkle-1">✦</Text>
            <Text className="sparkle sparkle-2">✦</Text>
            <Text className="sparkle sparkle-3">✦</Text>
            <Text className="sparkle sparkle-4">✦</Text>
            <Text className="sparkle sparkle-5">✦</Text>
          </>
        )}
      </Box>
      {isEditing ? 
        <Input
          type="input"
          className="edit-input"
          value={changeText}
          onChange={(e) => setChangeText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      : <Text 
          className={`task-text ${task?.done ? 'completed' : ''}`}
        >
          {task?.text}
        </Text>
      } 
      
      <Box className="task-actions">
        {isEditing ? 
          (
            <Box>
              <Button 
                variant="ghost"
                colorScheme="gray"
                onClick={handleSave}
                _hover={{ bg: "gray.100" }}
                size="xs"
              >
                <Text>Save</Text>
              </Button>
              <Button 
                variant="ghost"
                color="red.500" 
                onClick={handleDelete}
                _hover={{ bg: "red.50" }}
                size="xs"
              >
              <Text>Delete</Text>
            </Button>
            </Box>
          )
        :
          (
            <Box>
              <Button 
                variant="ghost"
                colorScheme="gray"
                onClick={handleEdit}
                _hover={{ bg: "gray.100" }}
                size="xs"
              >
                <Text>Edit</Text>
              </Button> 
              <Button 
                variant="ghost"
                color="red.500" 
                onClick={handleDelete}
                _hover={{ bg: "red.50" }}
                size="xs"
              >
                <Text>Delete</Text>
              </Button>
            </Box>
          )
        }
      </Box>
    </motion.div>
  );
}

