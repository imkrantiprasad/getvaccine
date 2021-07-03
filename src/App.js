import React, { useEffect, useState } from "react";
import StateDropDown from "./StateDropDown";
import "antd/dist/antd.css";
import Statistic from "./Statistics";

function App() {
	const [options, setOptions] = useState([]);
	const [stats, setStats] = useState([]);
	const [con, setCon] = useState([]);
	const date = new Date().toLocaleString();
	const [statsFor, setStatsFor] = useState("1");

	useEffect(() => {
		fetch("https://covid-india-cases.herokuapp.com/states/")
			.then((res) => res.json())
			.then((json) => {
				setStats(json);
			});

		fetch(
			"https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true"
		)
			.then((res) => res.json())
			.then((json) => {
				var nationStats = [
					{ state: "", totalCases: 0, recovered: 0, deaths: 0 },
				];
				nationStats[0].state = "Total";
				nationStats[0].noOfCases = json.totalCases;
				nationStats[0].cured = json.recovered;
				nationStats[0].deaths = json.deaths;
				setCon(nationStats);
			});

		fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				setOptions(json);
			});
	}, []);
	function handleStatsChange() {
		statsFor === "1" ? setStatsFor("2") : setStatsFor("1");
	}
	return (
		<div className="main">
			<div className="stats-section">
				<h1>{statsFor === "1" ? "India's " : "All State/UTs "} Statistics</h1>
				Click<span onClick={handleStatsChange}> here </span>to check{" "}
				{statsFor === "2" ? "India's " : "all State/UTs "} Statistics.
			</div>
			<Statistic stats={statsFor === "1" ? con : stats} date={date} />
			<hr style={{ width: 300 }} />
			<div className="drop-down">
				<StateDropDown stateList={options} />
			</div>
		</div>
	);
}

export default App;
