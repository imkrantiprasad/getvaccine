import React, { useState, useEffect } from "react";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Tabs, DatePicker, Select, Button, Row, Col, InputNumber } from "antd";
import Sessions from "./sessions";

function StateDropDown({ stateList = {} }) {
	const { states = [] } = stateList;
	const [stateValue, setStateValue] = useState(null);
	const [districtValue, setDistrictValue] = useState(null);
	const [districtValues, setDistrictValues] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
	const [pinCode, setPinCode] = useState(null);
	const [key, setKey] = useState("1");
	const [sessions, setSessions] = useState([]);
	const { TabPane } = Tabs;
	const { Option } = Select;

	function handleStateSelectClick(e) {
		setStateValue(e);
		setDistrictValue(null);
	}
	function handleDistrictSelectClick(e) {
		setDistrictValue(e);
	}
	function handlePinChange(e) {
		setPinCode(e);
	}
	function handleTabChange(e) {
		setKey(e);
		if (key === "2") {
			setStateValue(null);
			setDistrictValue(null);
		} else {
			setPinCode(null);
		}
	}
	function handleSubmitClick() {
		var date = startDate.toJSON().slice(0, 10);
		var nDate =
			date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
		if (key === "1") {
			if (stateValue && districtValue && nDate) {
				fetch(
					`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtValue}&date=${nDate}`
				)
					.then((res) => {
						return res.json();
					})
					.then((json) => {
						setSessions(json.sessions);
						console.log(districtValues);
					});
			}
		} else {
			if (pinCode && nDate) {
				fetch(
					`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${nDate}`
				)
					.then((res) => {
						return res.json();
					})
					.then((json) => {
						// values = json;
						// setDistrictValues(json.districts);
						console.log(json);
					});
			}
		}
	}
	useEffect(() => {
		if (stateValue) {
			fetch(
				`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateValue}`
			)
				.then((res) => {
					return res.json();
				})
				.then((json) => {
					setDistrictValues(json.districts);
					// console.log(json.districts);
				});
		}
	}, [stateValue]);
	return (
		<div className="form">
			<Row>
				<Col span={1}></Col>
				<Col span={22}>
					<Tabs defaultActiveKey={key || "1"} onChange={handleTabChange}>
						<TabPane tab="Track By District" key={1}>
							<Row type="flex" justify="center" align="middle">
								<div className="form-row container">
									<Select
										value={stateValue}
										showSearch
										style={{ width: 200 }}
										placeholder="Select State"
										optionFilterProp="children"
										onChange={handleStateSelectClick}
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}>
										{states.map((opt, key) => (
											<Option key={key} value={opt.state_id}>
												{opt.state_name}
											</Option>
										))}
									</Select>
								</div>
								<div className="form-row container">
									<Select
										showSearch
										value={districtValue}
										disabled={!stateValue}
										style={{ width: 200 }}
										placeholder="Select District"
										optionFilterProp="children"
										onChange={handleDistrictSelectClick}
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}>
										{districtValues.map((opt, key) => (
											<Option key={key} value={opt.district_id}>
												{opt.district_name}
											</Option>
										))}
									</Select>
								</div>
								<div className="form-row container">
									<DatePicker
										wrapperClassName="datePicker"
										format="DD-MM-YYYY"
										style={{ width: 200 }}
										defaultValue={moment(startDate)}
										onChange={(date) => setStartDate(date)}
									/>
								</div>
								<div className="form-row">
									<Button
										type="primary"
										size="large"
										shape="round"
										onClick={handleSubmitClick}>
										Find Vaccine Slots
									</Button>
								</div>
							</Row>
						</TabPane>
						<TabPane tab="Track By Pincode" key={2}>
							<Row type="flex" justify="center" align="middle">
								<div className="form-row container">
									<InputNumber
										style={{ width: 200 }}
										placeholder="PIN Code"
										type="number"
										onChange={handlePinChange}
										value={pinCode}
									/>
								</div>
								<div className="form-row container">
									<DatePicker
										wrapperClassName="datePicker"
										format="DD-MM-YYYY"
										style={{ width: 200 }}
										defaultValue={moment(startDate)}
										onChange={(date) => setStartDate(date)}
									/>
								</div>
								<div className="form-row" style={{ marginBottom: 62 }}>
									<Button
										type="primary"
										size="large"
										shape="round"
										onClick={handleSubmitClick}>
										Find Vaccine Slots
									</Button>
								</div>
							</Row>
						</TabPane>
					</Tabs>
					<Sessions sessions={sessions} key={key} />
				</Col>
				<Col span={1}></Col>
			</Row>
		</div>
	);
}

export default StateDropDown;
