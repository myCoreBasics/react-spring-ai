/**
 * PortalPatternDemo 실습용 컴포넌트
 * React Portal 패턴 실습
 */

import { useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, X, Layout, Zap } from 'lucide-react';
import './PortalPatternDemo.css';

interface ModalPortalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Portal 컴포넌트
 * 부모의 DOM 계층 구조를 벗어나 document.body에 직접 렌더링합니다.
 * z-index 문제나 overflow:hidden 문제를 해결할 때 필수적입니다.
 */
const ModalPortal = ({ children, isOpen, onClose }: ModalPortalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="portal-overlay">
      <div className="portal-backdrop" onClick={onClose} />
      <div className="portal-modal">
        <button onClick={onClose} className="portal-close-btn">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default function PortalPatternDemo() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBadModalOpen, setIsBadModalOpen] = useState<boolean>(false);

  return (
    <div className="portal-demo-page">
      <div className="demo-container-wrapper">
        <header className="demo-header">
          <div className="header-icon blue">
            <Layout size={32} />
          </div>
          <div>
            <h1 className="demo-title">React Portals 패턴</h1>
            <p className="demo-subtitle">
              모달(Modal)이나 툴팁(Tooltip)처럼 부모 컴포넌트의 스타일에
              영향받지 않고 화면 최상단에 렌더링해야 할 때 사용합니다.
            </p>
          </div>
        </header>

        {/* 개념 설명 */}
        <section className="concept-section">
          <h2 className="section-title">📚 핵심 개념</h2>
          <div className="concept-grid">
            <div className="concept-card">
              <h3>Portal이란?</h3>
              <p>
                React Portal은 부모 컴포넌트의 DOM 계층 구조 밖에 있는 DOM 노드에
                자식을 렌더링하는 방법입니다.
              </p>
              <pre className="code-block">
                {`import { createPortal } from 'react-dom';

createPortal(
  <Modal />,
  document.body  // 렌더링 위치
);`}
              </pre>
            </div>
            <div className="concept-card">
              <h3>언제 사용하나요?</h3>
              <ul className="feature-list">
                <li>✅ 모달 / 다이얼로그</li>
                <li>✅ 툴팁 / 팝오버</li>
                <li>✅ 토스트 알림</li>
                <li>✅ 드롭다운 메뉴</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 실습 영역 */}
        <section className="practice-section">
          <h2 className="section-title">🔬 실습: Portal vs Non-Portal</h2>

          <div className="demo-box overflow-hidden-box">
            <div className="demo-info-badge">
              <code>overflow: hidden</code> 적용된 컨테이너
            </div>

            <div className="demo-content">
              <p className="demo-description">
                이 박스는 <code>overflow: hidden</code> 상태입니다.
                <br />
                Portal을 사용하지 않으면 모달이 이 박스 안에 갇히게 됩니다.
              </p>

              <div className="button-group">
                <button
                  onClick={() => setIsBadModalOpen(true)}
                  className="demo-btn btn-gray"
                >
                  Portal 미사용 ❌
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="demo-btn btn-blue"
                >
                  Portal 사용 ✅
                </button>
              </div>
            </div>

            {/* Portal 미사용 모달 */}
            {isBadModalOpen && (
              <div className="bad-modal-overlay">
                <div className="bad-modal-content">
                  <AlertTriangle className="bad-modal-icon" />
                  <h3 className="bad-modal-title">갇혀버린 모달</h3>
                  <p className="bad-modal-text">
                    이 모달은 부모 박스 내부에 있어서
                    <br />
                    <code>overflow: hidden</code>에 의해 갇힙니다.
                  </p>
                  <button
                    onClick={() => setIsBadModalOpen(false)}
                    className="bad-modal-close"
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}

            <div className="decorative-circle" />
          </div>
        </section>

        {/* 코드 예시 */}
        <section className="code-section">
          <h2 className="section-title">💻 구현 코드</h2>
          <pre className="code-block large">
            {`// ModalPortal 컴포넌트
const ModalPortal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="backdrop" onClick={onClose} />
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.body  // 👈 핵심: body에 직접 렌더링
  );
};

// 사용 예시
<ModalPortal isOpen={isOpen} onClose={handleClose}>
  <h2>모달 제목</h2>
  <p>모달 내용...</p>
</ModalPortal>`}
          </pre>
        </section>

        {/* Portal 사용 모달 */}
        <ModalPortal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="success-modal-content">
            <div className="success-icon-wrapper">
              <Zap className="success-icon" />
            </div>
            <h3 className="success-title">Portal 성공! 🎉</h3>
            <p className="success-text">
              이 모달은 <code>document.body</code> 바로 아래에
              렌더링되었습니다. 부모의 overflow 속성과 관계없이 전체 화면 중앙에
              표시됩니다.
            </p>
            <div className="dom-tree-visual">
              <code>{'<body>'}</code>
              <div className="tree-child">
                <code>{'<div id="root">...</div>'}</code>
              </div>
              <div className="tree-child highlight">
                <code>{'<div class="modal-overlay">👈 여기!</div>'}</code>
              </div>
              <code>{'</body>'}</code>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="success-close-btn"
            >
              닫기
            </button>
          </div>
        </ModalPortal>
      </div>
    </div>
  );
}

