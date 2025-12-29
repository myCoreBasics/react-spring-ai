/**
 * ContactItem 컴포넌트
 * React.memo를 사용한 렌더링 최적화 실습
 */

import './ContactList.css';
import { memo } from 'react';

interface Contact {
  id: number;
  name: string;
  phone: string;
  avatar: string;
}

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: (contact: Contact) => void;
}

export const ContactItem = memo(function ContactItem({
  contact,
  isSelected,
  onSelect,
}: ContactItemProps) {
  console.log('Contact-item', contact.id, contact.name);
  return (
    <div
      onClick={() => onSelect(contact)}
      className={`contact-item ${isSelected ? 'selected' : ''}`}
    >
      <span className="contact-avatar">{contact.avatar}</span>
      <div className="contact-details">
        <strong className="contact-name">{contact.name}</strong>
        <p className="contact-phone">{contact.phone}</p>
      </div>
    </div>
  );
});

export default ContactItem;

