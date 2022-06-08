import { useState, useEffect } from "react";
import BarChart from "./BarChart";
import axios from "axios";

import './components-styles/products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faAdd, faFileCode, faGear, faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
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

      <div class="customers-container">
            <div class="heading-div">
                <p class="heading"><FontAwesomeIcon icon={faBox} className="icon" />&nbsp;&nbsp;Reports</p>
            </div>

            <center>
              <div className="App">
                  <div style={{ width: '1000px', height: '100%', objectFit: 'contain', backgroundColor: 'white', borderRadius: '30px', padding: '20px' }}>
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

      </div>
  );
}

export default Reports;