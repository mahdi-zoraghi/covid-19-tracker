import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import numeral from "numeral"

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label(tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0")
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback(value, index, values) {
            return numeral(value).format("0a")
          },
        },
      },
    ],
  },
}

function LineGraph({ casesType = "cases" }) {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then(response => response.json())
      .then(data => {
        const chartData = buildChartData(data, casesType)
        setData(chartData)
      })
      .catch(err => console.log(err))
  }, [casesType])

  const buildChartData = (data, casesType = "cases") => {
    const chartData = []
    let lastDataPoint

    for (let date in data[casesType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        }
        chartData.push(newDataPoint)
      }
      lastDataPoint = data[casesType][date]
    }
    return chartData
  }

  return (
    <div className="app__graph">
      <Line
        data={{
          datasets: [
            {
              data,
              backgroundColor: "rgba(204, 16, 52, 0.6)",
              borderColor: "#CC1034",
            },
          ],
        }}
        options={options}
      />
    </div>
  )
}

export default LineGraph
