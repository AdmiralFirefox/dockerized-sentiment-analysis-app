import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

interface ChartInfoProps {
  resultData: number[];
}

const ChartInfo = ({ resultData }: ChartInfoProps) => {
  const data = {
    labels: ["Negative", "Neutral", "Positive"],
    datasets: [
      {
        data: resultData,
        backgroundColor: ["#bf212f", "#f9a73e", "#27b376"],
        borderColor: ["#bf212f", "#f9a73e", "#27b376"],
        hoverBackgroundColor: [
          "hsl(355, 71%, 50%)",
          "hsl(34, 94%, 65%)",
          "hsl(154, 64%, 55%)",
        ],
        hoverBorderColor: [
          "hsl(355, 71%, 50%)",
          "hsl(34, 94%, 65%)",
          "hsl(154, 64%, 55%)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default ChartInfo;
