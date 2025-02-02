function ForcastCard({day}) {
  return (
    <div className="day" key={day.dt}>
      {day.weather[0].icon && (
        <img
          className="day-icon"
          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
          alt={day.weather[0].description}
        />
      )}
      <p className="day-temperature">
        {Math.round(day.main.temp_min)}° /{" "}
        <span>{Math.round(day.main.temp_max)}°</span>
      </p>
    </div>
  );
}

export default ForcastCard;
