import React from "react";

function Statistics({ stats, date }) {
	console.log("Stats:", stats);
	return (
		<div>
			<div className="mid">
				{/* <div className="flex-container">
              <div className="h" id="box">Cases around India:</div>
              <div className="total" id="box">Total: {this.state.con.totalCases}</div>
              <div className="active" id="box">Active: {this.state.con.activeCases}</div>
              <div className="recover" id="box">Cured: {this.state.con.recovered}</div>
              <div className="death" id="box">Deaths: {this.state.con.deaths}</div>
            </div>
            <br /> */}
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
						{stats.map((stat) => (
							<tr>
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
				{/* As on: {date.substring(0, 9)} */}
			</div>
		</div>
	);
}

export default Statistics;
