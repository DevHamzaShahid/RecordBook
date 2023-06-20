export const isMidnightDealTime = () => {
  const currentTime = new Date();
  // const currentHour = currentTime.getHours();
  const currentHour = 1;
  // Check if current hour is between 0 (midnight) and 4 (4 AM)
  return currentHour >= 0 && currentHour < 5;
};
