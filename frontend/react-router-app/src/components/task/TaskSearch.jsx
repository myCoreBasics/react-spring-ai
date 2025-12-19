import { Input } from "@chakra-ui/react";
import '../../styles/task/TaskSearch.css';

export default function TaskSearch({searchTask, onSearchTask}) {
  return (
    <Input
      className="task-search"
      placeholder="검색어를 입력하세요."
      value={searchTask}
      onChange={(e) => onSearchTask(e.target.value)}
      autoFocus
    />
  );
}