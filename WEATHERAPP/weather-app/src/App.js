import React , { Component } from 'react';
import Paper from  '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import {Grid, Col, Row} from 'react-flexbox-grid';
import LocationList from './components/LocationList';
import ForecastExtended from './components/ForecastExtended';
import './App.css';

const cities = [
  'Medellín, co',
  'Bogota, co',
  'Manizales, co',
  'Cartagena, co',
  'Quindio, co',
  'Barranquilla, co',
];

class App extends Component {

  constructor (){
    super();

    this.state = { city: null }
  }

  handleSelectedLocation = city => {
    this.setState({ city })
  }

  llamarSINCO = () => {
    const url = "http://10.2.193.77/SincoWSTransversal/ep/ePortalWSTrans/bdpsincows_CCPLU";
    const json = {"COD_USUARI": "32526966", "PASSWORD1": "SEPTI2019"};
    const miInit = {method : 'POST', headers: {'accept':'application/json', 'content-type':'application/json; charset=UTF-8'}, 
    body: json };

    fetch(url, miInit)
    .then(response => console.log(response))
    .catch(err => console.log(err +" "+ url));
  }

  render() {
    const {city} = this.state;

    return (
        <Grid >
          <Row>
            <div className="appBar">
            <AppBar position='static'>
              <Toolbar>
                <Typography variant='h6'>
                  Weather App
                </Typography>
                <Button className = "prueba" onClick ={this.llamarSINCO} variant="outlined" color="inherit">SINCO</Button>
              </Toolbar>
            </AppBar>
            </div>
          </Row>
          <Row>
            <Col xs={12} md = {6}>
            <LocationList cities = {cities} onSelectedLocation = {this.handleSelectedLocation}/>
            </Col>
            <Col xs={12} md={6}>
              <Paper elevation={4}>
                <div className="Details">
                  {
                    city && 
                    <ForecastExtended city={ city }></ForecastExtended>
                  }
                </div>
              </Paper>
            </Col>
          </Row>
        </Grid>
    );
  }
}

export default App;
