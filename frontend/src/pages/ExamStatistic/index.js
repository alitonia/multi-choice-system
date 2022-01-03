/* eslint-disable react/prop-types */

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Sector } from "recharts";
import { BarChart, Bar } from "recharts";
import { PieChart, Pie } from "recharts";

import "./ExamStatistic.css";


const ExamStatistic = () => {
    const jwtToken = "Bearer " + localStorage.getItem("access_token");

    const { id } = useParams();

    const [scoreOverviewData, setScoreOverviewData] = useState(null);
    const [choiceDistributionData, setChoiceDistributionData] = useState(null);

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

        fetch(`http://${process.env.REACT_APP_BACKEND_URL}exam_analytic/question_detailed/${id}`, {
            method: "GET",
            headers: newHeader,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => {
                setChoiceDistributionData(result);
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
                <hr/>
                {choiceDistributionData?.map((questionItem, questionIndex) => (
                    <ChoiceDistributionSection
                        key={questionIndex}
                        questionIndex={questionIndex}
                        questionContent={questionItem.question_content}
                        answers={questionItem.answers}
                    />
                ))}
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
            <div className="chart-container chart-container-bar">
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



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent == 0 ? null : (
        <text x={x} y={y} fill="white" textAnchor="center" dominantBaseline="central">
            {`${String.fromCharCode(65 + index)} (${(percent * 100).toFixed(0)}%)`}
        </text>
    );
};

const renderLegend = ({
    payload
}) => {
    console.log(payload);

    return (
        <div className="answer-choice-table-container">
            <table cellSpacing={0} cellPadding={0}>
                {
                    payload.map((entry, index) => (
                        <tr key={`item-${index}`}>
                            <td>{String.fromCharCode(65 + index)}.</td>
                            <td>{entry.payload.content}</td>
                            <td>{entry.payload.choiceCount}</td>
                        </tr>
                    ))
                }
            </table>

        </div>
    );
};

const ChoiceDistributionSection = ({
    questionIndex,
    questionContent,
    answers
}) => {
    const chartData = useMemo(() => {
        return answers.map(answer => ({
            content: answer.content,
            choiceCount: answer.choice_count
        }));
    }, [answers]);

    return (
        <div className="exam-statistic-page-row">
            <div className="chart-container chart-container-pie">
                <h4>
                    {`${questionIndex + 1}. ${questionContent}`}
                </h4>
                <ResponsiveContainer height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="60%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius="80%"
                            fill="#8884d8"
                            nameKey="content"
                            dataKey="choiceCount"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend layout="vertical" verticalAlign="middle" align="left" content={renderLegend} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};


export default ExamStatistic;
