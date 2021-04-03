import { useState, useEffect } from 'react';

import './App.css';

/*Challenge 2: Render a list of the users' first names into the element with id "response"
				  	from the string that the server returns */

/*Challenge 3: Alert the users' last name when one of the first names is clicked */

/*Challenge 4: Have the first names of all users with the 'role' property equal to 'Admin' show with green font color  */

function App() {
  const [ serverResponse, setServerResponse ] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:3001')
      .then(res => res.text())
      .then(
        (result) => {
          setServerResponse(result);
        },
        (error) => {
          setServerResponse('Error making server request.');
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="App">
      {serverResponse}
    </div>
  );
}

export default App;
