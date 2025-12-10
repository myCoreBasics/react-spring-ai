import { useState } from "react";
import { useTaskContext } from '../context/TaskContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

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
  
  const handleCheck = () => {
    // if (!task.done) {
    //   confetti({
    //     particleCount: 100,
    //     spread: 70,
    //     origin: { y: 0.8 }
    //   });
    // }
    handleCheckTask(task)
  };

  const handleEdit = () => {
    setIsEditing(true)
  };

  const handleSave = () => {
    if (changeText.trim() === '') return;
    handleChangeTask({
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
      <span {...listeners} style={{ cursor: 'grab' }}>☰</span>
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          className="checkbox-input"
          checked={task?.done}
          onChange={handleCheck}
        />
        {/* 반짝이 별들 추가 */}
        {task?.done && (
          <>
            <span className="sparkle sparkle-1">✦</span>
            <span className="sparkle sparkle-2">✦</span>
            <span className="sparkle sparkle-3">✦</span>
            <span className="sparkle sparkle-4">✦</span>
            <span className="sparkle sparkle-5">✦</span>
          </>
        )}
      </div>
      {isEditing ? 
        <input
          type="input"
          className="edit-input"
          value={changeText}
          onChange={(e) => setChangeText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      : <span 
          className={`task-text ${task?.done ? 'completed' : ''}`}
        >
          {task?.text}
        </span>
      } 
      
      <div className="task-actions">
        {isEditing ? 
          (
            <div>
              <button 
                className="btn btn-danger"
                onClick={handleSave}
              >
                <span>Save</span>
              </button>
              <button 
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <span>Delete</span>
            </button>
            </div>
          )
        :
          (
          <div>
            <button 
              className="btn btn-ghost"
              onClick={handleEdit}
            >
              <span>Edit</span>
            </button> 
            <button 
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <span>Delete</span>
            </button>
          </div>
          )
        }
      </div>
    </motion.div>
  );
}

