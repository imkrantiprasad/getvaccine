import React from "react";
import StateDropDown from "./StateDropDown";
import "antd/dist/antd.css";
import Statistic from "./Statistics";
var values;

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			options: [],
			stats: [],
			con: [],
			stLoaded: false,
			date: new Date().toLocaleString(),
		};
	}

	componentDidMount() {
		fetch("https://covid-india-cases.herokuapp.com/states/")
			.then((res) => res.json())
			.then((json) => {
				console.log("json", json);
				this.setState({
					stats: json,
					stLoaded: true,
				});
			});

		// fetch(
		// 	"https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true"
		// )
		// 	.then((res) => res.json())
		// 	.then((json) => {
		// 		var nationStats = {};
		// 		nationStats.noOfCases = json.totalCases;
		// 		nationStats.cured = json.recovered;
		// 		nationStats.deaths = json.deaths;
		// 		this.setState({
		// 			con: nationStats,
		// 		});
		// 	});
		this.fetchOptions();
	}

	fetchOptions() {
		fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				values = json;
				this.setState({ options: values.states });
			});
	}
	render() {
		console.log("in render", this.state.stats);
		return (
			<div>
				<Statistic stats={this.state.stats} date={this.state.date} />
				<div className="drop-down">
					<StateDropDown stateList={values} />
				</div>
			</div>
		);
	}
}

export default App;
