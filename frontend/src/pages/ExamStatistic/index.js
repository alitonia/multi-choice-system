import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import styles from "./style.module.css";
import Footer from "../../components/footer/Footer";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExamStatistic = () => {
    const jwtToken = "Bearer " + localStorage.getItem("access_token");

    const { id } = useParams();

    const [data, setData] = useState(null);

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
                setData(result);
            })
            .catch(error => console.log("error", error));
    }, []);



    const getChartData = (data) => {
        if (!data) {
            return;
        }

        const result = [];
        for (let i = 0; i < 10; i++) {
            const fromRange = i;
            const toRange = i + 1;
            const barElement = {
                name: `${fromRange}-${toRange}`,
                scoreCount: data.distribution[i]
            };
            result.push(barElement);
        }

        return result;
    }

    return (
        <div>
            <Header />
            <div>
                <BarChart
                    width={800}
                    height={600}
                    data={getChartData(data)}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis type="number" domain={[0, 'dataMax']} tickCount={1} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="scoreCount" name="Count" fill="#8884d8" />
                </BarChart>
            </div>
            <Footer />
        </div>)
};

export default ExamStatistic;
