import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import styled from "styled-components";

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      fill: false,
      data: [60, 62, 54, 57, 70, 53, 66, 78, 79, 65, 62, 70],
      backgroundColor: "#3773f5",
      borderColor: "#3773f5",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#3773f5",
      pointBackgroundColor: "#3773f5",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#3773f5",
      pointHoverBorderColor: "#3773f5",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const BalanceChart = () => {
  return (
    <Wrapper>
      <Line data={data} options={options} width={400} height={150} />
    </Wrapper>
  );
};

export default BalanceChart;

const Wrapper = styled.div``;
