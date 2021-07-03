import React from "react";

function Statistics({ stats, date }) {
	return (
		<div>
			<div className="mid">
				<table style={{ overflowX: "auto" }}>
					<thead>
						<tr>
							<th>State/UTs</th>
							<th id="total">Total</th>
							<th id="active">Active</th>
							<th id="cured">Cured</th>
							<th id="death">Deaths</th>
						</tr>
					</thead>
					<tbody>
						{stats.map((stat, index) => (
							<tr key={index}>
								<td>{stat.state}</td>
								<td id="total">{stat.noOfCases}</td>
								<td id="active">{stat.noOfCases - stat.cured - stat.deaths}</td>
								<td id="cured">{stat.cured}</td>
								<td id="death">{stat.deaths}</td>
							</tr>
						))}
					</tbody>
				</table>
				<br />
				As on: {date.substring(0, 8)}
			</div>
		</div>
	);
}

export default Statistics;
