import React from 'react'
import Square from './Square'

function Board() {

  const renderSquare = (i) => {
    // React.createElement를 사용하여 Square 컴포넌트 생성
    // 첫 번째 인자: 컴포넌트 타입 (Square)
    // 두 번째 인자: props 객체 (value, onClick)
    // 세 번째 인자: children (없음)
    return React.createElement(
      Square,                    // 컴포넌트 타입
      {                          // props 객체
        value: null,             // 현재 값: null (빈 칸)
        onClick: () => {}        // 현재 클릭 핸들러: 빈 함수 (향후 게임 로직 추가 예정)
      }
    )
  }

  return (
    <div className="board">
      <div className="player-info">
        다음 플레이어: X
      </div>
      <div className="board-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i}>{renderSquare(i)}</div>
        ))}
      </div>
    </div>
  )
}

export default Board

