import React, { useState, useEffect } from 'react';
import displayLogo from '../assets/Display.svg'
const fetchData = async () => {
  const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
  const data = await response.json();
  return data;
};

const KanbanBoard = () => {
  // Retrieve initial values from localStorage or set defaults
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

  // Save to localStorage whenever groupBy or sortBy changes
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
        break;

      case 'user':
        groupedTickets = tickets.reduce((acc, ticket) => {
          const user = users.find((u) => u.id === ticket.userId)?.name || 'Unknown User';
          if (!acc[user]) acc[user] = [];
          acc[user].push(ticket);
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
        <img src={displayLogo} className="displayLogo" alt="displayLogo" /> Display
        </button>
        {showTooltip && (
          <div className="display-tooltip">
            <div className="tooltip-option">
              <label>Grouping</label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="tooltip-option">
              <label>Ordering</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Kanban Columns */}
      <div className="kanban-columns">
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <div className="kanban-column" key={group}>
            <h2 className="column-title">{group}</h2>
            {tickets.map((ticket) => (
              <div className="ticket-card" key={ticket.id}>
                <div className="ticket-card-header">
                  <span className="ticket-id">{ticket.id}</span>
                  <img
                    className="profile-image"
                    src="https://via.placeholder.com/32"
                    alt="Profile"
                  />
                </div>
                <h3 className="ticket-title">{ticket.title}</h3>
                <p className="ticket-tag">{ticket.tag[0]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
