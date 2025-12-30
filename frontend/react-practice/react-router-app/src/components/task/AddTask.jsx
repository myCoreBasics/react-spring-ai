import { useState } from "react";
import '../../styles/task/AddTask.css';
import { Box, Button, Input } from "@chakra-ui/react";

export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  
  return (
    <>
      <Input
        className="task-input"
        placeholder="내용을 입력하세요."
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