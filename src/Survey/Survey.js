import React, {Component} from 'react';
import auth0Client from '../Auth';
import App from '../App';

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
          temperament: "defensive",
          transmission: "automatic",
          vehicle: "sedan",
          time: "30min",
          fuel: "no"
        };
      }

    handleOptionChange = changeEvent => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
    };      

    submit() {
        var username = auth0Client.getProfile();
        username = username.name;
        var temperament = this.state.temperament;
        var transmission = this.state.transmission;
        var vehicle = this.state.vehicle;
        var time = this.state.time;
        var fuel = this.state.fuel;
        //App.submit(username, temperament, transmission, vehicle, time, fuel);
        console.log(this.state.temperament);
    }

    render() {
        if (!auth0Client.isAuthenticated()) {
            auth0Client.signIn();
        }

        document.getElementById('mapstuff').style.display = 'none';

        return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 text-left">
                    <h1>Driving Survey</h1>
                    <hr></hr>
                    <form>
                    <h3>How would you describe your driving temperament?</h3>
                    <p>&nbsp;</p>
                        <div className="form-check">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="defensive"
                                    value="defensive"
                                    checked={this.state.temperament === "defensive"}
                                    onChange={this.handleOptionChange}
                                />
                                Defensive
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="neutral"
                                    value="neutral"
                                    checked={this.state.temperament === "neutral"}
                                    onChange={this.handleOptionChange}
                                />
                                Neutral
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="aggressive"
                                    value="aggressive"
                                    checked={this.state.temperament === "aggressive"}
                                    onChange={this.handleOptionChange}
                                />
                                Aggressive
                            </label>
                        </div>
                        <hr></hr>
                        <h3>What type of transmission does your primary vehicle have?</h3>
                        <p>&nbsp;</p>
                        <div className="form-check">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="automatic"
                                    value="automatic"
                                    checked={this.state.transmission === "automatic"}
                                    onChange={this.handleOptionChange}
                                />
                                Automatic
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="manual"
                                    value="manual"
                                    checked={this.state.transmission === "manual"}
                                    onChange={this.handleOptionChange}
                                />
                                Manual
                            </label>
                        </div>
                        <hr></hr>
                        <h3>What type of vehicle is your primary vehicle?</h3>
                        <p>&nbsp;</p>
                        <div className="form-check" id="temper">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="sedan"
                                    value="sedan"
                                    checked={this.state.vehicle === "sedan"}
                                    onChange={this.handleOptionChange}
                                />
                                Sedan / Hatchback
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="rwd"
                                    value="rwd"
                                    checked={this.state.vehicle === "rwd"}
                                    onChange={this.handleOptionChange}
                                />
                                Sport RWD
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="fwd"
                                    value="fwd"
                                    checked={this.state.vehicle === "fwd"}
                                    onChange={this.handleOptionChange}
                                />
                                Sport FWD
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="awd"
                                    value="awd"
                                    checked={this.state.vehicle === "awd"}
                                    onChange={this.handleOptionChange}
                                />
                                Sport AWD
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="offroad"
                                    value="offroad"
                                    checked={this.state.vehicle === "offroad"}
                                    onChange={this.handleOptionChange}
                                />
                                Off-Road
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="suv"
                                    value="suv"
                                    checked={this.state.vehicle === "suv"}
                                    onChange={this.handleOptionChange}
                                />
                                Crossover SUV / Van
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="hybrid"
                                    value="hybrid"
                                    checked={this.state.vehicle === "hybrid"}
                                    onChange={this.handleOptionChange}
                                />
                                Hybrid
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="electric"
                                    value="electric"
                                    checked={this.state.vehicle === "electric"}
                                    onChange={this.handleOptionChange}
                                />
                                Electric
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="motorcycle"
                                    value="motorcycle"
                                    checked={this.state.vehicle === "motorcycle"}
                                    onChange={this.handleOptionChange}
                                />
                                Motorcycle
                            </label>
                        </div>
                        <hr></hr>
                        <h3>How much time do you spend in your vehicle daily, on average?</h3>
                        <p>&nbsp;</p>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="30min"
                                    value="30min"
                                    checked={this.state.time === "30min"}
                                    onChange={this.handleOptionChange}
                                />
                                30 minutes or less
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="1to3hours"
                                    value="1to3hours"
                                    checked={this.state.time === "1to3hours"}
                                    onChange={this.handleOptionChange}
                                />
                                1-3 hours
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="4plushours"
                                    value="4plushours"
                                    checked={this.state.time === "4plushours"}
                                    onChange={this.handleOptionChange}
                                />
                                4+ hours
                            </label>
                        </div>
                        <hr></hr>
                        <h3>Do you prioritize the fuel consumption of your vehicle? (Are you actively trying to consume less fuel?)</h3>
                        <p>&nbsp;</p>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="yes"
                                    value="yes"
                                    checked={this.state.fuel === "yes"}
                                    onChange={this.handleOptionChange}
                                />
                                Yes, I pay very close attention to my average MPG and gas gauge
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="kindof"
                                    value="kindof"
                                    checked={this.state.fuel === "kindof"}
                                    onChange={this.handleOptionChange}
                                />
                                Kind of, I pay attention to my gas gauge and would prefer to consume less fuel but don't actively do so
                            </label>
                        </div>
                        <div className="form-check" id="">
                            <label className="btn btn-outline-primary">
                                <input
                                    type="radio"
                                    name="no"
                                    value="no"
                                    checked={this.state.fuel === "no"}
                                    onChange={this.handleOptionChange}
                                />
                                No, paying attention to my fuel consumption is not my priority when driving
                            </label>
                        </div>
                        <hr></hr>
                    </form>
                    <button type="button" id="submit" className="btn btn-primary btn-lg" onClick={this.submit.bind(this)}>Submit</button>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                </div>
            </div>
        </div>
        )
    }
}

export default Survey;