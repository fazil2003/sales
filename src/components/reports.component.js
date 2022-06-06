import { useState } from "react";
import BarChart from "./BarChart";
import {UserData} from "./Data";

function Reports(){

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [{
      label: "Users Gained",
      data: UserData.map((data) => data.userGain),
      backgroundColor: [
        '#f6d365',
        '#84fab0',
        '#4facfe',
        '#43e97b'
      ],
      borderColor: "black",
      borderWidth: 2,
    }]
  });

  return (
      <center>
        <div className="App">
            <div style={{ width: '1000px', height: '100%', objectFit: 'contain', backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                <BarChart chartData={userData} />
            </div>
        </div>
      </center>
  );
}

export default Reports;