import React, { useEffect, useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment'); 
        const data = await response.json();
        setTasks(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); 

  const getUserDetails = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? { name: user.name, available: user.available } : { name: '', available: '' };
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} user={getUserDetails(task.userId)} />
      ))}
    </div>
  );
};

export default TaskList;