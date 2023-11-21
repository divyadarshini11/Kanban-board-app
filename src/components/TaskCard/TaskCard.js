import React from 'react';
import './TaskCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import {
  faCheckCircle,
  faClock,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

const TaskCard = ({ task, user }) => {
  console.log(task);
  console.log(user);
  const getInitials = (name) => {
    return name.split(' ').map((word) => word[0]).join('');
  };
 
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Todo':
        return <FontAwesomeIcon icon={faExclamationCircle} className="status-icon todo" />;
      case 'In progress':
        return <FontAwesomeIcon icon={faClock} className="status-icon in-progress" />;
      case 'Backlog':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon completed" />;
      default:
        return null;
    }
  };

  return (
    <div className="task-card">
        <p className="task-id">{task.id}</p>
        <FontAwesomeIcon icon={faCircleXmark} />
        <div className="status-icon-container">
        {renderStatusIcon(task.status)}
        {task.status}
      </div>
                      <p className="task-title">{task.title}</p>
      <div className="tag-container">
        {task.tag && task.tag.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <div className="user-info">
        <div className="user-image">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt="User" />
          ) : (
            <div className="initials">{getInitials(user.name)}</div>
          )}
          <div className={`availability-dot ${user.available ? 'available' : 'unavailable'}`} />
        </div>
        <div className="user-details">
          <strong>{user.name}</strong><br />
          <span>{user.available ? 'available' : 'unavailable'}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;