import { IconButton, InputAdornment, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import '../styles/searchlocation.css'

const SearchLocation = ({ city, setCity, handleSubmit }) => {
  return (
    <div class="search-wrapper">
      <TextField
        style={{width: '100%'}}
        id="outlined-basic"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleSubmit}
        autoComplete="off"
        placeholder="Enter city name"
      />
      <IconButton onClick={handleSubmit} color="primary">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchLocation;
