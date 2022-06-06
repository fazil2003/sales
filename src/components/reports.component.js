import { useState, useEffect } from "react";
import BarChart from "./BarChart";
import axios from "axios";
import { UserData } from "./Data";
// import {UserData} from "./Data";

const Reports = () => {

    const [reportData, setReportData] = useState([
        {
            _id: 1,
            count: 100
        },
        {
            _id: 2,
            count: 200
        },
    ])

    const [userData, setUserData] = useState({
        labels: reportData.map((data) => data.year),
        datasets: [{
          label: "Products sales",
          data: reportData.map((data) => data.userGain),
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

    const [isDisplayed, setIsDisplayed] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/sales/reports`).then(response => {
            setReportData(response.data);
            setIsDisplayed(true);
            console.log(reportData)
        }).catch(err => console.log(err));
    }, [])

  

  return (
      <center>
        <div className="App">
            <div style={{ width: '1000px', height: '100%', objectFit: 'contain', backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
            {isDisplayed && <BarChart chartData={
                {
                    labels: reportData.map((data) => data._id),
                    datasets: [{
                      label: "Products sales",
                      data: reportData.map((data) => data.count),
                      backgroundColor: [
                        '#f6d365',
                        '#84fab0',
                        '#4facfe',
                        '#43e97b'
                      ],
                      borderColor: "black",
                      borderWidth: 2,
                    }]
                  }
            } />}
            </div>
        </div>
      </center>
  );
}

export default Reports;