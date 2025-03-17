const Searchsection = ({getWeatherDetails, searchInputRef}) => {

 const API_KEY=import.meta.env.VITE_API_KEY;

  //to handle city search form submission
  const handleCitySearch=(e)=>{ 
     e.preventDefault();
     const searchinput=e.target.querySelector(".search-input");
     const API_URL=` http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchinput.value}&days=2`
     console.log(searchinput.value);
     //fetch weather details for enterd city
       getWeatherDetails(API_URL)
  }
  const HandleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>{
        const { latitude, longitude } = pos.coords;
      const API_URL=` http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`
      getWeatherDetails(API_URL)
    
      window.innerWidth >= 768 && searchInputRef.current.focus();
      } // Success callback

      ,() => {
        alert('Access denied. Enable location feature');
      } // Error callback
    );
  };
  
  return (
    <div className="search-section">
      <form action="#" className="search-form" onSubmit={handleCitySearch}>
        <span className="material-symbols-rounded" style={{ color: "#fff" }}>
          search
        </span>
        <input
          type="search"
          className="search-input"
          placeholder="Enter a City Name"
          required
        />
      </form>
      <button className="location-button" onClick={HandleLocationSearch}>
        <span className="material-symbols-rounded">my_location</span>
      </button>
    </div>
  );
};

export default Searchsection;
