import { Input } from "@chakra-ui/react";
import '../../styles/TaskSearch.css';

export function TaskSearch({searchTask, onSearchTask}) {
  return (
    <Input
      className="task-search"
      placeholder="Search a task..."
      value={searchTask}
      onChange={(e) => onSearchTask(e.target.value)}
      autoFocus
    />
  );
}