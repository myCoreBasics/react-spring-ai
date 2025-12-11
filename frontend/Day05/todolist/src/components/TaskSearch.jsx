export function TaskSearch({searchTask, onSearchTask}) {
  return (
    <>
      <input
        className="task-search"
        placeholder="Search a task..."
        value={searchTask}
        onChange={(e) => onSearchTask(e.target.value)}
        autoFocus
      />
    </>
  );
}