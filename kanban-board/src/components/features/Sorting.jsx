const sortTasks = (groupedData, groupingOption, sortingOption) => {
  if (sortingOption === "title") {
    const sortedGroupedData = {};
    Object.keys(groupedData).forEach((key) => {
      const userTickets = groupedData[key];
      const sortedTickets = userTickets.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      sortedGroupedData[key] = sortedTickets;
    });
    return sortedGroupedData;
  } else if (sortingOption === "priority" && groupingOption === "priority") {
    return groupedData;
  } else {
    const sortedGroupedData = {};

    Object.keys(groupedData).forEach((key) => {
      const userTickets = groupedData[key];
      const sortedTickets = userTickets.sort((a, b) => {
        return b.priority - a.priority;
      });
      sortedGroupedData[key] = sortedTickets;
    });
    return sortedGroupedData;
  }
};
export { sortTasks };
