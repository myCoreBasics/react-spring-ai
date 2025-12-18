import './ContactList.css';

export default function ContactItem({ contact, isSelected, onSelect }) {
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
}
