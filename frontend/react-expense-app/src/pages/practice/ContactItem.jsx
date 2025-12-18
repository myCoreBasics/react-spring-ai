import './ContactList.css';
import { memo } from 'react';

export const ContactItem = memo(function ContactItem({ contact, isSelected, onSelect }) {
    console.log('Contact-item', contact.id, contact.name)
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