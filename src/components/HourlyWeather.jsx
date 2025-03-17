const HourlyWEATHER = ({ data }) => {
  // Destructure the necessary properties from the data prop
  const { time, temp_c, condition } = data;
  
  // Format the time to display only the hour and minute (e.g., "18:45")
  const formattedTime = new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <li className="weather-item">
      <p className="time">{formattedTime}</p>
      <img src={condition.icon} alt={condition.text} className="weather-icon" />
      <p className="temparature">
        {temp_c} <span>&deg;C</span>
      </p>
    </li>
  );
};

export default HourlyWEATHER;
