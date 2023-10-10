export const isMidnightDealTime = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  // const currentHour = 1;
  // Check if current hour is between 0 (midnight) and 4 (4 AM)
  return currentHour >= 0 && currentHour < 5;
};

export const MAILCHIMP_APIKEY='3eb2e18f7b594928d5f0e84871243698-us14'