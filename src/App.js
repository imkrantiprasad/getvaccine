import React from "react";
import StateDropDown from "./StateDropDown";
import "antd/dist/antd.css";
var values;

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			options: [],
		};
	}

	componentDidMount() {
		this.fetchOptions();
	}

	fetchOptions() {
		fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
			.then((res) => {
				// console.log(res);
				return res.json();
			})
			.then((json) => {
				values = json;
				this.setState({ options: values.states });
			});
	}
	render() {
		return (
			<div className="drop-down">
				<StateDropDown stateList={values} />
			</div>
		);
	}
}

export default App;
