import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import '../../styles/Task/AddTask.css';

export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  
  return (
    <>
      <Input
        className="task-input"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <Button 
        variant='gradient'
        colorScheme="white"
        color="white"
        type="submit" 
        // className="btn btn-primary"
        onClick={() => {
          onAddTask(text)
          setText(''); 
        }}
      >
        Add Task
      </Button>
    </>
  );
}