export const toDateFunction = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const WeekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  }`;
  return date;
};

export function getForcastData(array) {
  const uniqueObjects = {};
  array.forEach((obj) => {
    const date = obj.dt_txt.split(" ")[0];
    if (!uniqueObjects[date]) {
      uniqueObjects[date] = obj;
    }
  });
  return Object.values(uniqueObjects);
}
