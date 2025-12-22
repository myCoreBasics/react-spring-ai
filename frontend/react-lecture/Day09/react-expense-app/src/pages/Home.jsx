import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Home.css';
/**
 * Portal을 사용한 모달 컴포넌트
 * document.body에 직접 렌더링되어 z-index, overflow 문제 해결
 */
function Modal({ isOpen, onClose, title, children }) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // 모달 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 👇 핵심: createPortal로 document.body에 렌더링
  return createPortal(
    <div className="modal-overlay portal-modal" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            🌀 {title} <span className="portal-badge">Portal</span>
          </h2>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="모달 닫기"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            취소
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body  // 👈 렌더링 대상: document.body
  );
}


function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return createPortal(
    <div className="modal-overlay portal-modal" onClick={onClose}>
      <div 
        className="modal-content modal-confirm" 
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
      >
        <div className="modal-icon">⚠️</div>
        <div className="portal-badge-wrapper">
          <span className="portal-badge">Portal</span>
        </div>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            취소
          </button>
          <button className="btn btn-danger" onClick={handleConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}


const Home = () => {
    // 모달 상태 관리
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  
  // 폼 데이터 상태
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submittedData, setSubmittedData] = useState(null);


  // 폼 제출 핸들러
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setIsFormModalOpen(false);
    setFormData({ name: '', email: '' });
  };

  // 삭제 확인 핸들러
  const handleDelete = () => {
    alert('삭제되었습니다!');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🏠 홈 페이지</h1>
        <p>React 모달 패턴 실습 예제입니다.</p>
      </header>

   {/* 모달 예제 섹션 */}
      <section className="modal-examples">
        <h2>📦 모달 예제</h2>
        
        <div className="example-cards">
          {/* 기본 모달 카드 */}
          <div className="example-card">
            <h3>1. 기본 모달</h3>
            <p>가장 기본적인 모달 형태입니다. 제목, 본문, 버튼이 포함됩니다.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setIsBasicModalOpen(true)}
            >
              기본 모달 열기
            </button>
          </div>

          {/* 확인 모달 카드 */}
          <div className="example-card">
            <h3>2. 확인 모달 (Confirm)</h3>
            <p>사용자에게 확인을 요청하는 모달입니다. 삭제, 취소 등에 사용됩니다.</p>
            <button 
              className="btn btn-danger"
              onClick={() => setIsConfirmModalOpen(true)}
            >
              삭제 확인 모달
            </button>
          </div>

          {/* 폼 모달 카드 */}
          <div className="example-card">
            <h3>3. 폼 모달</h3>
            <p>폼 입력을 받는 모달입니다. 회원가입, 정보 수정 등에 사용됩니다.</p>
            <button 
              className="btn btn-success"
              onClick={() => setIsFormModalOpen(true)}
            >
              폼 모달 열기
            </button>
            {submittedData && (
              <div className="submitted-data">
                <strong>제출된 데이터:</strong>
                <p>이름: {submittedData.name}</p>
                <p>이메일: {submittedData.email}</p>
              </div>
            )}
          </div>
        </div>
      </section>

    {/* 기본 모달 */}
      <Modal 
        isOpen={isBasicModalOpen} 
        onClose={() => setIsBasicModalOpen(false)}
        title="기본 모달"
      >
        <p>이것은 기본 모달입니다.</p>
        <p>모달 외부를 클릭하거나 X 버튼을 눌러 닫을 수 있습니다.</p>
        <ul>
          <li>✅ 배경 클릭 시 닫기</li>
          <li>✅ X 버튼으로 닫기</li>
          <li>✅ 모달 내부 클릭은 닫히지 않음</li>
        </ul>
      </Modal>

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDelete}
        message="정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      />

      {/* 폼 모달 */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="정보 입력"
      >
        <form onSubmit={handleFormSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="이름을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setIsFormModalOpen(false)}>
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              제출
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}



export default Home