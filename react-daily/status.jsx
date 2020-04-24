const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}
function toCelsius(fahrenheit){
    // 华氏温度转换为摄氏温度
    return (fahrenheit-32)*5/9
}
function toFahrenheit(celsius) {
    return (celsius*9/5)+32
}
function tryConvert(temperature,convert) {
    const input=parseFloat(temperature)
    if(Number.isNaN(input)) return false
    const output=convert(input)
    const rounded=Math.round(output*1000)/1000
    return rounded.toString()
}
class BoilingVerdict extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
       return  this.props.celsius>=100
            ?<p>The water would boil.</p>
            :<p>The water would not boil</p>
    }
}
class Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state={
            temperature:'',
            scale:''
        }
        this.handleFahrenheitChange=this.handleFahrenheitChange.bind(this)
        this.handleCelsiusChange=this.handleCelsiusChange.bind(this)
    }
    handleCelsiusChange(temperature){
        this.setState({
            temperature:temperature,
            scale:'c'
        })
    }
    handleFahrenheitChange(temperature){
        this.setState({
            temperature:temperature,
            scale:'f'
        })
    }
    render(){
        const scale=this.state.scale
        const temperature=this.state.temperature
        const celsius=scale=='f'?tryConvert(temperature,toCelsius):temperature
        const fahrenheit=scale=='c'?tryConvert(temperature,toFahrenheit):temperature
        return(
            <div>
                <Temperature  scale={scale} 
                            temperature={celsius} 
                            onTemperatureChange={this.handleCelsiusChange}/>
                <Temperature  scale={scale}
                            temperature={fahrenheit}
                            onTemperatureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>
        )
    }
}
class Temperature extends React.Component{
    constructor(props){
        super(props)
        this.handleChange=this.handleChange.bind(this)
    }
    handleChange(e){
        this.props.onTemperatureChange(e.target.value)
    }
    render(){
        const temperature=this.props.temperature
        const scale=this.props.scale
        return(
            <fieldset>
                <legend>输入{scaleNames[scale]}温度:</legend>
                <input type="text"
                    value={temperature} 
                    onChange={this.handleChange}/>
             </fieldset>
        )
    }
}
ReactDOM.render(
    <Calculator/>,
    document.getElementById("root")
)