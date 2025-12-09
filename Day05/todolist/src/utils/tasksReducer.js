// ==========================================
// Reducer Logic (Pure Functions)
// ==========================================

export const initialTasks = [
  { id: 0, text: 'React 기본 문법 익히기', done: false },
  { id: 1, text: 'React 컴포넌트 구조 잡기', done: false },
  { id: 2, text: 'DB 스키마 정의', done: false },
  { id: 3, text: 'AI 기반 영수증 OCR 구매 물품 관리 시스템 실습 프로젝트', done: false },
  { id: 4, text: 'API 명세서 작성', done: false },
];

export function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'add' :
      return [
        ...tasks, 
        {
          id : action.id, 
          text : action.text, 
          done : false
        }
      ];
    case 'change' :
      return tasks.map(task => {
        if(task.id === action.id){
          return { ...task, text: action.text };
        } else {
          return task;
        }
      })
    case 'delete' :
      return tasks.filter(task => action.id !== task.id);
    case 'check' :
      return tasks.map(task => {
        if(task.id === action.id){
          return { ...task, done: !task.done };
        } else {
          return task;
        }
      })
  }
}

export let nextId = 5;