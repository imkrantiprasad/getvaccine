import React from "react";
import { Carousel } from "antd";

function News({ newsData }) {
	return (
		<>
			<div className="stats-section">
				<h1>Articles</h1>
			</div>
			<div className="news-wrapper">
				<Carousel autoplay effect="fade">
					{newsData.map((news, index) => (
						<div key={index} className="news">
							<div>
								<div className="img-item">
									<img src={news.urlToImage} alt="img" />
								</div>
								<div className="news-title">
									<a href={news.url} target="_blank" rel="noreferrer">
										{news.title}
									</a>
								</div>
							</div>
							{/* <br /> */}
							<p>{news.content || news.description}</p>
						</div>
					))}
				</Carousel>
			</div>
		</>
	);
}

export default News;
