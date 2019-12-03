import React, { Component } from 'react';
import auth0Client from '../Auth';

class Survey extends Component {
    constructor(props) {
        super(props);
        var user = auth0Client.getProfile();
        var username = user.name;
        this.state = {
            user: username,
            temperament: "defensive",
            transmission: "automatic",
            vehicle: "sedan",
            preference: "fastest",
            traffic: "yes",
            toll: "yes",
            thrill: "no",
            fuel: "no"
        };
    }

    handleOptionChange = changeEvent => {
        this.setState({
            [changeEvent.target.name]: changeEvent.target.value
        });
    };

    componentDidMount() {
        if (!auth0Client.isAuthenticated()) {
            auth0Client.signIn();
        }

        var page = document.getElementById("buildMapHere");
        var map = page.children[0];
        var mapScript = page.children[1]
        page.removeChild(map);
        page.removeChild(mapScript);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 text-left">
                        <form method='post' action='http://localhost:3001'>
                            <h1>Driving Survey</h1>
                            <hr></hr>
                            <div>
                                <label htmlFor='user'>

                                </label>
                                <p name="user" className="text-secondary"></p>
                            </div>
                            <h3>What type of transmission does your primary vehicle have?</h3>
                            <p>&nbsp;</p>
                            <div className="form-check">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="transmission"
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
                                        name="transmission"
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
                                        name="vehicle"
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
                                        name="vehicle"
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
                                        name="vehicle"
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
                                        name="vehicle"
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
                                        name="vehicle"
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
                                        name="vehicle"
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
                                        name="vehicle"
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
                                        name="vehicle"
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
                                        name="vehicle"
                                        value="motorcycle"
                                        checked={this.state.vehicle === "motorcycle"}
                                        onChange={this.handleOptionChange}
                                    />
                                    Motorcycle
                            </label>
                            </div>
                            <hr></hr>
                            <h3>How would you describe your driving temperament?</h3>
                            <p>&nbsp;</p>
                            <div className="form-check">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="temperament"
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
                                        name="temperament"
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
                                        name="temperament"
                                        value="aggressive"
                                        checked={this.state.temperament === "aggressive"}
                                        onChange={this.handleOptionChange}
                                    />
                                    Aggressive
                            </label>
                            </div>
                            <h3>Do you prefer getting to your location as fast as possible, or getting to your location in the shortest distance?</h3>
                            <p>&nbsp;</p>
                            <div className="form-check" id="">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="preference"
                                        value="shortest"
                                        checked={this.state.preference === "shortest"}
                                        onChange={this.handleOptionChange}
                                    />
                                    Shortest Distance
                            </label>
                            </div>
                            <div className="form-check" id="">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="preference"
                                        value="fastest"
                                        checked={this.state.preference === "fastest"}
                                        onChange={this.handleOptionChange}
                                    />
                                    Fastest Time
                            </label>
                            </div>
                            <h3>Would you add time to your route if it meant less traffic?</h3>
                            <p>&nbsp;</p>
                            <div className="form-check" id="">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="traffic"
                                        value="yes"
                                        checked={this.state.traffic === "yes"}
                                        onChange={this.handleOptionChange}
                                    />
                                    Yes
                            </label>
                            </div>
                            <div className="form-check" id="">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="traffic"
                                        value="maybe"
                                        checked={this.state.traffic === "maybe"}
                                        onChange={this.handleOptionChange}
                                    />
                                    Yes, but not too much additional time
                            </label>
                            </div>
                            <div className="form-check" id="">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="traffic"
                                        value="no"
                                        checked={this.state.traffic === "no"}
                                        onChange={this.handleOptionChange}
                                    />
                                    No
                            </label>
                            </div>
                            <h3>Are you okay with toll roads?</h3>
                            <p>&nbsp;</p>
                            <div className="form-check" id="">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="toll"
                                        value="yes"
                                        checked={this.state.toll === "yes"}
                                        onChange={this.handleOptionChange}
                                    />
                                    Yes, if it comes to it
                            </label>
                            </div>
                            <div className="form-check" id="">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="toll"
                                        value="no"
                                        checked={this.state.toll === "no"}
                                        onChange={this.handleOptionChange}
                                    />
                                    No
                            </label>
                            </div>
                            <h3>Do you prefer thrilling, windy roads, or using more common roadways?</h3>
                            <p>&nbsp;</p>
                            <div className="form-check" id="">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="thrill"
                                        value="speed"
                                        checked={this.state.thrill === "speed"}
                                        onChange={this.handleOptionChange}
                                    />
                                    ADVENTURE TIME
                            </label>
                            </div>
                            <div className="form-check" id="">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="thrill"
                                        value="sortof"
                                        checked={this.state.thrill === "sortof"}
                                        onChange={this.handleOptionChange}
                                    />
                                    In for the thrill, but not too crazy
                            </label>
                            </div>
                            <div className="form-check" id="">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="thrill"
                                        value="no"
                                        checked={this.state.thrill === "no"}
                                        onChange={this.handleOptionChange}
                                    />
                                    Common Roadways
                            </label>
                            </div>
                            <hr></hr>
                            <h3>Do you prioritize the fuel consumption of your vehicle? (Are you actively trying to consume less fuel?)</h3>
                            <p>&nbsp;</p>
                            <div className="form-check" id="">
                                <label className="btn btn-outline-primary">
                                    <input
                                        type="radio"
                                        name="fuel"
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
                                        name="fuel"
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
                                        name="fuel"
                                        value="no"
                                        checked={this.state.fuel === "no"}
                                        onChange={this.handleOptionChange}
                                    />
                                    No, paying attention to my fuel consumption is not my priority when driving
                            </label>
                            </div>
                            <hr></hr>
                            <div className='form-check'>
                                <label htmlFor='user' className="btn btn-outline-primary">
                                    <input type="hidden" name="user" value={this.state.user}></input>
                                    <input type='submit'></input>
                                </label>
                            </div>
                        </form>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Survey;