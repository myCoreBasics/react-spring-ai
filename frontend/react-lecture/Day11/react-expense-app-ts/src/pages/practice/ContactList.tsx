/**
 * ContactList 실습용 컴포넌트
 *
 * React.memo 실습: 연락처 목록
 */

import { useState, useCallback } from 'react';
import ContactItem from './ContactItem';
import './ContactList.css';

interface Contact {
  id: number;
  name: string;
  phone: string;
  avatar: string;
}

// 더미 데이터 (수정하지 마세요)
const CONTACTS: Contact[] = [
  { id: 1, name: '김철수', phone: '010-1234-5678', avatar: '👨' },
  { id: 2, name: '이영희', phone: '010-2345-6789', avatar: '👩' },
  { id: 3, name: '박민수', phone: '010-3456-7890', avatar: '👨‍💼' },
  { id: 4, name: '정수진', phone: '010-4567-8901', avatar: '👩‍💼' },
  { id: 5, name: '최동훈', phone: '010-5678-9012', avatar: '👨‍🔬' },
  { id: 6, name: '강미나', phone: '010-6789-0123', avatar: '👩‍🔬' },
  { id: 7, name: '조현우', phone: '010-7890-1234', avatar: '👨‍🎨' },
  { id: 8, name: '윤서연', phone: '010-8901-2345', avatar: '👩‍🎨' },
];

function ContactList() {
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<Contact | null>(null);

  const handleSelect = useCallback((contact: Contact) => {
    setSelected(contact);
  }, []);

  // 필터링된 연락처
  const filteredContacts = CONTACTS.filter((contact) =>
    contact.name.includes(search)
  );

  return (
    <div className="contact-list-page">
      <div className="contact-container">
        <h1>📞 연락처</h1>
        <p className="contact-subtitle">React.memo 실습: 렌더링 최적화</p>

        {/* 검색 입력 */}
        <input
          type="text"
          placeholder="이름 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {/* 선택된 연락처 */}
        {selected && (
          <div className="selected-contact">
            <span className="selected-avatar">{selected.avatar}</span>
            <div>
              <strong>{selected.name}</strong>
              <p>{selected.phone}</p>
            </div>
          </div>
        )}

        {/* 연락처 목록 */}
        <div className="contacts-grid">
          {filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isSelected={selected?.id === contact.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* 실습 가이드 */}
        <div className="contact-info">
          <h4>📝 실습 가이드</h4>
          <ul>
            <li>
              <strong>Step 1</strong>: ContactItem 함수를 memo()로 감싸기
            </li>
            <li>
              <strong>Step 2</strong>: handleSelect을 useCallback()으로 감싸기
            </li>
            <li>
              <strong>Step 3</strong>: "강제 리렌더링" 버튼 클릭 후 콘솔 확인
            </li>
            <li>
              <strong>Step 4</strong>: 검색어 입력 또는 항목 클릭 시 콘솔 비교
            </li>
          </ul>
        </div>

        <div
          className="contact-info"
          style={{ marginTop: '1rem', background: '#e3f2fd' }}
        >
          <h4>🔍 확인 방법</h4>
          <table className="check-table">
            <thead>
              <tr>
                <th>테스트</th>
                <th>memo 없음</th>
                <th>memo 있음</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>강제 리렌더링</td>
                <td>8개 모두 렌더링</td>
                <td>0개 렌더링 ✅</td>
              </tr>
              <tr>
                <td>항목 클릭</td>
                <td>8개 모두 렌더링</td>
                <td>2개만 렌더링 ✅</td>
              </tr>
              <tr>
                <td>검색어 입력</td>
                <td>필터된 모두 렌더링</td>
                <td>필터된 모두 렌더링</td>
              </tr>
            </tbody>
          </table>
          <p className="tip" style={{ marginTop: '0.5rem' }}>
            💡 검색어 입력 시에는 필터링 결과가 바뀌므로 memo와 관계없이
            리렌더링됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactList;

