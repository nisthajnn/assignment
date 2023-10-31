const groupByFunc = (tasks, option) => {
  if (!tasks || !option) {
    return null;
  }
  const groupedData = {};

  if (option === "status") {
    tasks.tickets.forEach((ticket) => {
      const status = ticket.status;
      if (!groupedData[status]) {
        groupedData[status] = [];
      }
      groupedData[status].push(ticket);
    });
  } else if (option === "user") {
    tasks.tickets.forEach((ticket) => {
      const userId = ticket.userId;
      const user = tasks.users.find((user) => user.id === userId);
      if (!groupedData[user.id]) {
        groupedData[user.id] = [];
      }
      groupedData[user.id].push(ticket);
    });
  } else if (option === "priority") {
    tasks.tickets.forEach((ticket) => {
      const priority = ticket.priority;
      if (!groupedData[priority]) {
        groupedData[priority] = [];
      }
      groupedData[priority].push(ticket);
    });
  }
  return groupedData;
};
export { groupByFunc };
