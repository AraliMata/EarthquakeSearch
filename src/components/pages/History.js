import React, { useState, useEffect} from 'react';
import './History.css';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function History({
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart
}) {
    const [historyData, setHistoryData] = useState([{'id': 0, 'name': ".", 'latitude': 0, 'longitude': 0}]);

    const orderHistoryData = (data) => {

      var history = []

      for(var i = 0; i < data.length; i++) {
        var tempElement = {};
        tempElement['id'] = data[i].id;
        tempElement['name'] = data[i].city.name;
        tempElement['latitude'] = data[i].city.latitude;
        tempElement['longitude'] = data[i].city.longitude;

        history.push(tempElement);
        
      }
     
      console.log(history);
      return history;
    }

    const fetchHistoryData = async () => {
        const {data} = await axios.get(`https://earthquake-search-api.herokuapp.com/location-history`);
        console.log(data);
        const history = orderHistoryData(data);
        setHistoryData(history);
        console.log(data.results);
       
      };

      useEffect(() => {    // Update the document title using the browser API    
        fetchHistoryData();
      }, []);

    
  return (
    <>
      <div
        className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
      >
        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>{topLine}</div>
                <h1 className={lightText ? 'heading' : 'heading dark'}>
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? 'home__hero-subtitle'
                      : 'home__hero-subtitle dark'
                  }
                >
                  {description}
                </p>
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
                <img src={img} alt={alt} className='home__hero-img' />
              </div>
            </div>
          </div>
          <BootstrapTable
        pagination
        //options={{ page: 1 }}
        data={historyData}
        bodyStyle={{ border: "none" }}
        tableStyle={{ border: "none" }}
        headerStyle={{ border: "none !important" }}
        version="4"
        height="500"
        hover
      >
        <TableHeaderColumn isKey={true} width="150" dataField="name">
          City
        </TableHeaderColumn>
        <TableHeaderColumn width="150" dataField="latitude">
          Latitude
        </TableHeaderColumn>
        <TableHeaderColumn width="150" dataField="longitude">
          Longitude
        </TableHeaderColumn>
      </BootstrapTable>
        </div>
      </div>
    </>
  );
}

export default History;