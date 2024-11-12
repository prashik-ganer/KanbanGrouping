import React, { useState, useEffect } from 'react';
import displayLogo from '../assets/Display.svg';
import down from '../assets/down.svg';
import AddTask from '../assets/add.svg';
import editColumn from '../assets/3dotmenu.svg';

// Priority Icons
import HighPriority from '../assets/Img - High Priority.svg';       // High Priority
import LowPriority from '../assets/Img - Low Priority.svg';         // Low Priority
import MediumPriority from '../assets/Img - Medium Priority.svg';   // Medium Priority
import Urgent from '../assets/SVG - Urgent Priority colour.svg';    // Urgent Priority
import NoPriority from '../assets/No-priority.svg';                 // No Priority

const fetchData = async () => {
  const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
  const data = await response.json();
  return data;
};

// Map user IDs to dummy profile picture URLs
const USER_PROFILE_PICTURES = {
  "usr-1": "https://randomuser.me/api/portraits/men/1.jpg",
  "usr-2": "https://randomuser.me/api/portraits/men/2.jpg",
  "usr-3": "https://randomuser.me/api/portraits/men/3.jpg",
  "usr-4": "https://randomuser.me/api/portraits/men/4.jpg",
  "usr-5": "https://randomuser.me/api/portraits/men/5.jpg"
};

// Map priority levels to correct icons
const PRIORITY_ICONS = {
  4: LowPriority,         // Urgent
  3: MediumPriority,   // High
  2: HighPriority, // Medium
  1: Urgent,    // Low
  0: NoPriority      // No priority
};

// Define the desired order for priority and status groups
const PRIORITY_ORDER = ['No priority', 'Urgent', 'High', 'Medium', 'Low'];
const STATUS_ORDER = ['Backlog', 'Todo', 'In Progress', 'Done', 'Canceled'];

const KanbanBoard = () => {
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    fetchData().then((data) => {
      setTickets(data.tickets);
      setUsers(data.users);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  const getGroupedTickets = () => {
    let groupedTickets = {};

    switch (groupBy) {
      case 'status':
        groupedTickets = tickets.reduce((acc, ticket) => {
          const status = ticket.status;
          if (!acc[status]) acc[status] = [];
          acc[status].push(ticket);
          return acc;
        }, {});

        // Sort statuses by predefined STATUS_ORDER
        groupedTickets = Object.fromEntries(
          STATUS_ORDER.map((status) => [status, groupedTickets[status] || []])
        );
        break;

      case 'user':
        groupedTickets = tickets.reduce((acc, ticket) => {
          const user = users.find((u) => u.id === ticket.userId);
          const userName = user ? user.name : 'Unknown User';
          if (!acc[userName]) acc[userName] = [];
          acc[userName].push({ ...ticket, user });
          return acc;
        }, {});
        break;

      case 'priority':
        groupedTickets = tickets.reduce((acc, ticket) => {
          const priority = getPriorityLabel(ticket.priority);
          if (!acc[priority]) acc[priority] = [];
          acc[priority].push(ticket);
          return acc;
        }, {});

        // Sort by predefined PRIORITY_ORDER
        groupedTickets = Object.fromEntries(
          PRIORITY_ORDER.map((priority) => [priority, groupedTickets[priority] || []])
        );
        break;

      default:
        break;
    }

    return groupedTickets;
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4: return 'Urgent';
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      default: return 'No priority';
    }
  };

  const groupedTickets = getGroupedTickets();

  return (
    <div className="kanban-board">
      {/* Display Button with Tooltip */}
      <div className="display-container">
        <button className="display-button" onClick={toggleTooltip}>
          <img src={displayLogo} className="displayLogo" alt="Display Icon" />
          Display
          <img src={down} className="downLogo" alt="Down Icon" />
        </button>
        {showTooltip && (
          <div className="display-tooltip">
            <div className="tooltip-option">
              <label>Grouping</label>
              <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="tooltip-option">
              <label>Ordering</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Kanban Columns */}
      <div className="kanban-columns">
        {Object.entries(groupedTickets).map(([group, tickets]) => {
          const user = users.find((u) => u.name === group);
          const profileImageUrl = user ? USER_PROFILE_PICTURES[user.id] : null;
          const priorityIcon = PRIORITY_ICONS[PRIORITY_ORDER.indexOf(group)];

          return (
            <div className="kanban-column" key={group}>
              <div className="column-title">
                {groupBy === 'user' && profileImageUrl && (
                  <img src={profileImageUrl} alt={group} className="column-profile-image" />
                )}
                {groupBy === 'priority' && priorityIcon && (
                  <img src={priorityIcon} alt={group} className="column-priority-icon" />
                )}
                <span>{group}   {tickets.length}</span>
                <div className="column-icons">
                  <img src={AddTask} alt="Add Task" className="icon" />
                  <img src={editColumn} alt="Edit Column" className="icon" />
                </div>
              </div>
              {tickets.map((ticket) => (
                <div className="ticket-card" key={ticket.id}>
                  <div className="ticket-card-header">
                    <span className="ticket-id">{ticket.id}</span>
                    {/* Only display profile image when not grouped by 'user' */}
                    {groupBy !== 'user' && (
                      <img
                        className="profile-image"
                        src={USER_PROFILE_PICTURES[ticket.userId] || 'https://via.placeholder.com/32'}
                        alt="Profile"
                      />
                    )}
                  </div>
                  <h3 className="ticket-title">{ticket.title}</h3>
                  <div className="ticket-footer">
                    <img
                      src={PRIORITY_ICONS[ticket.priority]}
                      alt={getPriorityLabel(ticket.priority)}
                      className="ticket-priority-icon"
                    />
                    <p className="ticket-tag">{ticket.tag[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
