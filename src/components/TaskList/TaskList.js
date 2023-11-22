import React, { useEffect, useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayOption, setDisplayOption] = useState('Status');
  const [sortOption, setSortOption] = useState('Priority');

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

  const filterTasks = () => {
    let filteredTasks = [...tasks];
  
    // Sort tasks based on sort option
    if (sortOption === 'Priority') {
      filteredTasks.sort((a, b) => b.priority - a.priority);
    } else if (sortOption === 'Title') {
      filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'User') {
      filteredTasks.sort((a, b) => getUserDetails(a.userId).name.localeCompare(getUserDetails(b.userId).name));
    }
  
    // Group tasks based on display option
    if (displayOption === 'Status') {
      // Group by status
      filteredTasks = groupBy(filteredTasks, 'status');
    } else if (displayOption === 'User') {
      // Group by user
      filteredTasks = groupBy(filteredTasks, 'userId');
    } else if (displayOption === 'Priority') {
      // Group by priority
      filteredTasks = groupBy(filteredTasks, 'priority');
    }
  
    // Include user details in grouped tasks
    filteredTasks = filteredTasks.map((group) => ({
      key: group.key,
      tasks: group.tasks.map((task) => ({
        ...task,
        user: getUserDetails(task.userId),
      })),
    }));
  
    return filteredTasks;
  };
   

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      const groupKey = currentValue[key];
      const group = result.find((item) => item.key === groupKey);

      if (group) {
        group.tasks.push(currentValue);
      } else {
        result.push({ key: groupKey, tasks: [currentValue] });
      }

      return result;
    }, []);
  };

  return (
    <div>
      <div className="display-options">
        <label htmlFor="display">Display:</label>
        <select id="display" value={displayOption} onChange={(e) => setDisplayOption(e.target.value)}>
          <option value="Status">By Status</option>
          <option value="User">By User</option>
          <option value="Priority">By Priority</option>
        </select>
      </div>
      <div className="sort-options">
        <label htmlFor="sort">Sort:</label>
        <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="Priority">Priority</option>
          <option value="Title">Title</option>
          <option value="User">User</option>
        </select>
      </div>
      <div className="task-list">
        {filterTasks().map((group) => (
          <div key={group.key} className="task-group">
            <h3>{displayOption === 'User' ? getUserDetails(group.key).name : group.key}</h3>
            {group.tasks.map((task) => (
              <TaskCard key={task.id} task={task} user={getUserDetails(task.userId)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
