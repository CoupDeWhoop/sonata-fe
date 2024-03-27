const options = {
  short: {
    day: "numeric",
    month: "long",
  },
  long: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

export const formatDate = (timestamp, option = "short") => {
  return new Intl.DateTimeFormat("en-GB", options[option]).format(
    new Date(timestamp)
  );
};

export const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
