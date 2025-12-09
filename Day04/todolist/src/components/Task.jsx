// ==========================================
// Task Component
// ==========================================

import { useState } from "react";

export default function Task({task, onCheckTask, onDeleteTask, onChangeTask}) {
  const [isEditing, setIsEditing] = useState(false);
  const [changeText, setChangeText] = useState(task?.text);

  const handleCheck = () => {
    onCheckTask(task)
  };

  const handleEdit = () => {
    setIsEditing(true)
  };

  const handleSave = () => {
    if (changeText.trim() === '') return;
    onChangeTask({
      ...task, 
      text: changeText
    }); 
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDeleteTask(task)
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
    <div className="task-item">
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          className="checkbox-input"
          checked={task?.done}   
          onChange={handleCheck}
        />
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
    </div>
  );
}

