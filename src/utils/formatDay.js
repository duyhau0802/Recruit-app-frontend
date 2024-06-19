const formatDay = (unformattedDate) => {
  const dateObject = new Date(unformattedDate);
  // Extract components
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; //getMonth() returns 0-based index
  const day = dateObject.getDate();
  // Format the date for MySQL
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  return formattedDate;
};

module.exports = formatDay;
