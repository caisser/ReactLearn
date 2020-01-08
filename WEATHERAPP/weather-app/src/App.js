import React , { Component } from 'react';
import Paper from  '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
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
