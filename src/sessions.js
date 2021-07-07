import React from "react";

function Sessions({ sessions, tabName }) {
	// const tabs = ["tabName"]
	// console.log(sessions);
	if (sessions && sessions.length) {
		return (
			<>
				<div className="result-header">
					Results for "
					{tabName === "1" ? "Track By District" : "Track By Pincode"}
					":
				</div>
				<div>
					<ul
						className="cards-container"
						style={{
							listStyleType: "none",
						}}>
						{sessions.map((session) => {
							return (
								<li key={session.session_id}>
									<div className="card-container">
										<div style={{ display: "flex", position: "relative" }}>
											<div className="center-address">
												<h5>{session.name}</h5>
												<p>
													{session.address}, {session.district_name},{" "}
													{session.state_name}
												</p>
												<p>{session.pincode}</p>
											</div>
											<div className="vaccine-type-fee">
												{session.vaccine}
												<p>{session.fee_type}</p>
											</div>
										</div>
										<div style={{ display: "flex", marginTop: 10 }}>
											<div className="age-limit">
												<div className="age-wrap">
													{session.max_age_limit
														? `${
																session.min_age_limit +
																" - " +
																session.max_age_limit
														  }`
														: session.min_age_limit + " & Above"}
												</div>
											</div>
											<div className="dose-details">
												Dose 1{" "}
												<span className="dose-number">
													{session.available_capacity_dose1}
												</span>
												Dose 2{" "}
												<span className="dose-number">
													{session.available_capacity_dose2}
												</span>
											</div>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</>
		);
	} else {
		return <div></div>;
	}
}

export default Sessions;
