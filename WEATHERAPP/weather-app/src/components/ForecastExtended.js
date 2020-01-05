import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ForecastItem from './ForecastItem';
import { url_base_forecast, api_key } from './../constants/api_url'
import transformForecast from './../Services/transformForecast';
import LinearProgress from '@material-ui/core/LinearProgress';
import './styles.css' ;

/*
const days = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
];

const data = {
    temperature: 10,
    humidity: 10,
    weatherState: 'idk',
    wind: 'idk',
};
*/
class ForecastExtended extends Component {

    constructor (){
        super();
        this.state = {
            forecastData: null
        }
    }

    componentDidMount(){
        // fetch or axios
        this.updateCity(this.props.city);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.city !== this.props.city){
            this.setState({forecastData: null})
            this.updateCity(nextProps.city);
        }
    }
    
    updateCity = city => {
        const url_forecast = `${url_base_forecast}?q=${city}&appid=${api_key}` ;

        fetch(url_forecast).then(
            data => (data.json()) 
        ).then(
            weather_data => {
                //console.log(weather_data);
                const forecastData = transformForecast(weather_data);
                //console.log(forecastData);
                this.setState({ forecastData })
                
            }
        );
    }

    renderForecastItemDays(forecastData) {
        return forecastData.map( forecast => (
            <ForecastItem 
                key = {`${forecast.weekDay}${forecast.hour}`}
                weekDay = {forecast.weekDay} 
                hour={forecast.hour} 
                data = {forecast.data}>
            </ForecastItem>
        ))
    }

    renderProgress = () => {
        return (
            <div>
                <LinearProgress />
                <br />
                <LinearProgress color="secondary" />
            </div>
        );
    }

    render(){
        const { city } = this.props;
        const { forecastData } = this.state;
        return(
            <div>
                <h2 className='forecast-title'>Pronóstico Extendido para {city}</h2>
                {
                    forecastData ?
                        this.renderForecastItemDays(forecastData) :
                        this.renderProgress()
                }
            </div>
        );
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}

export default ForecastExtended;