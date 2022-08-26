import React, { useEffect, useState } from "react";
import "../Chart/myChart.css";

import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  Legend,
} from "recharts";

interface Props {
  t: string;
  h: number;
  c: number;
  o: number;
  name: string;
  open: number;
  closed: number;
  high: number;
  datefrom: number;
  otherProp?: any;
}

function MyChart({
  priceData,
}: {
  priceData: any;
}): JSX.Element {

  const [price, setPrice] = useState<any | null>("");
  const [toggleAverage, setToggleAverage] = useState<any | null>(false);

  useEffect(() => {
    async function displayData(): Promise<void> {
      const stockPrice = priceData.results.map((stock: Props) => {
        
        const date = new Date(stock.t );
        const values = priceData.results.map((open: Props ) => {        
          return open.o; 
        })
        const valueSum  = values.reduce((prevValue: number, currValue: number) => prevValue + currValue, 0);
        const average =valueSum / values.length;
        
        const data = {
          name: `${priceData.ticker}`,
          open: stock.o,
          closed: stock.c,
          high: stock.h,
          datefrom: date.toLocaleDateString("en-US") ,
          average: average.toFixed(2),
        };
        return data;
      });
      
      setPrice(stockPrice);
    }
    displayData();

  }, [priceData.results, priceData.ticker]);
  
  return (
    <>
      <AreaChart
        width={1100}
        height={500}
        data={price}
        margin={{ top: 100, right: 0, bottom: 20, left: 0 }}
      >
        <defs>
          <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="rgb(96, 145, 93)" stopOpacity={1} />
            <stop offset="95%" stopColor="rgb(96, 145, 93)" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="chartColor2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="9%" stopColor="rgb(152, 8, 168)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="rgb(152, 8, 168)" stopOpacity={0.3} />
          </linearGradient>
          <linearGradient id="chartColor3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgb(152, 8, 168)" stopOpacity={0.9} />
            <stop
              offset="98%"
              stopColor="rgb(152, 8, 168)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          type="monotoneX"
          dataKey="high"
          stroke="#1df07f"
          fillOpacity={0.3}
          strokeWidth={2}
          fill=""
        />
        <Area
          type="monotoneX"
          dataKey="closed"
          stroke="#3039bf"
          fillOpacity={1}
          strokeWidth={2}
          fill=""
        />
        <Area
          type="monotoneX"
          dataKey="open"
          stroke="#cd05e3"
          fillOpacity={1}
          strokeWidth={3}
          fill="url(#chartColor2)"
        />
        {toggleAverage ? <Area 
          type="monotoneX"
          dataKey="average"
          fillOpacity={0}
          strokeWidth={2}
          fill=""
          stroke="#f5795d" /> : null }
        <CartesianGrid stroke="#334429" strokeDasharray="3 3" />
        <XAxis dataKey="datefrom"  padding={{ left: 10}} minTickGap={20} tick={{stroke: 'white', strokeWidth: 0.1}}/>
        <YAxis domain={["datafrom"]}  padding={{ bottom: 10 }} tick={{stroke: 'white', strokeWidth: 0.1}} />
        <Tooltip />
        <Legend></Legend>
      </AreaChart>
      <div className= "check-box-container">
      <label htmlFor="averageCheckbox">Average Price</label>
      <input  className="checkbox"type="checkbox" name="averageCheckbox" onChange={(e)=> setToggleAverage(e.target.checked)}></input>
      </div>
    </>
  );
}

export default MyChart;
