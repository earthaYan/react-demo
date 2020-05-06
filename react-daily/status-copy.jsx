class BoilingVerdict extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        if(this.props.celsius>=100){
            var element= <p>水会沸腾</p>
        }else{
            element= <p>水不会沸腾</p>
        }
        return element
    }
}
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}
class TemperatureInput extends React.Component{
    constructor(props){
        super(props)
        this.handleChange=this.handleChange.bind(this)
    }
    handleChange(e){
        this.props.onTempeartureChange(e.target.value)
    }
    render(){
        const temperature=this.props.temperature
        const scale=this.props.scale
        return(
            <fieldset>
                <legend>输入{scaleNames[scale]}温度值</legend>
                <input type="text" value={temperature} onChange={this.handleChange}/>
            </fieldset>
        )
    }
}
class Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state={
            temperature:'37',
            scale:'c'
        }
        this.handleCelsiusChange=this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange=this.handleFahrenheitChange.bind(this)
    }
    handleFahrenheitChange(temperature){
        this.setState({
            temperature:temperature,
            scale:'f'
        })
    }
    handleCelsiusChange(temperature){
        this.setState({
            temperature:temperature,
            scale:'c'
        })
    }
    render(){
        const scale=this.state.scale
        const temperature=this.state.temperature
        const celsius=scale=='f'?tryConvert(temperature,toCelsius):temperature
        const fahrenheit=scale=='c'?tryConvert(temperature,toFahrenheit):temperature
        return (
            <div>
                <TemperatureInput scale='c' temperature={celsius}
                    onTempeartureChange={this.handleCelsiusChange}/>
                <TemperatureInput scale='f' temperature={fahrenheit}
                    onTempeartureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>
        )
    }
}
ReactDOM.render(
    <Calculator/>,
    document.getElementById("root")
)
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
} 
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}