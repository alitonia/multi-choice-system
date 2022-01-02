/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import "./ExamStatistic.css";


const ExamStatistic = () => {
    const jwtToken = "Bearer " + localStorage.getItem("access_token");

    const { id } = useParams();

    const [scoreOverviewData, setScoreOverviewData] = useState(null);

    useEffect(() => {
        let newHeader = new Headers();
        newHeader.append("Authorization", jwtToken);
        fetch(`http://${process.env.REACT_APP_BACKEND_URL}exam_analytic/score_overview_bin/${id}`, {
            method: "GET",
            headers: newHeader,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => {
                setScoreOverviewData(result);
            })
            .catch(error => console.log("error", error));
    }, []);


    return (
        <div className="exam-statistic-page-container">
            <Header />
            <div className="chart-root">
                {scoreOverviewData && (
                    <ScoreDistributionSection scoreOverview={scoreOverviewData} />
                )}
            </div>
            <Footer />
        </div>)
};

const ScoreDistributionSection = ({ scoreOverview }) => {
    const toChartData = (distributionData) => {
        if (!distributionData) {
            return;
        }

        const result = [];
        for (let i = 0; i < 10; i++) {
            const fromRange = i;
            const toRange = i + 1;
            const barElement = {
                name: `${fromRange}-${toRange}`,
                scoreCount: distributionData[i]
            };
            result.push(barElement);
        }

        return result;
    }


    const {
        distribution,
        avg_score,
        min_score,
        max_score
    } = scoreOverview;

    return (
        <div className="exam-statistic-page-row">
            <div className="chart-container">
                <ResponsiveContainer height="100%">
                    <BarChart
                        height={600}
                        data={toChartData(distribution)}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label="Count" type="number" domain={[0, 'dataMax']} tickCount={1} />
                        <Tooltip />
                        <Bar dataKey="scoreCount" name="Count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
                <h3 className="chart-title">
                    Score Distribution
                </h3>
            </div>
            <div>
                Average score: {avg_score.toFixed(2)} <br />
                Min score: {min_score} <br />
                Max score: {max_score}
            </div>
        </div>
    );
};

export default ExamStatistic;
