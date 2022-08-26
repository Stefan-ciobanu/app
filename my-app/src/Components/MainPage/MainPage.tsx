import React, { useEffect, useState } from "react";
import axios from "axios";
import MyChart from "../Chart/MyChart";
import "../MainPage/mainPage.css";

export const MainPage = (): JSX.Element => {
  const dataType = ["USD", "AAPL", "KIMpL", "TANH", "VSAT"];

  const from = new Date();
  from.setDate(from.getDate() - 33);
  const defaultDate = from.toISOString().substring(0,10);
  
  const curr = new Date();
  curr.setDate(curr.getDate());
  const defaultCurrDate = curr.toISOString().substring(0,10);

  const [data, setData] = useState();
  const [dateFrom, setDateFrom] = useState(defaultDate);
  const [dateTo, setDateTo] = useState(defaultCurrDate);
  const [stocks, setStocks] = useState("USD");

  useEffect(() => {
    try {
      async function getData() {
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/ticker/${stocks}/range/1/day/${dateFrom}/${dateTo}?adjusted=true&sort=asc&limit=250&apiKey=XEJdGtYCig2lpb3tPcpawDFdLf0aSWr5`
        );

        setData(response.data);
        return response;
      }

      getData();
    } catch {
      console.error("error");
    }
  }, [stocks, dateFrom, dateTo]);

  console.log(data);
  return (
    <>
      <div className="chart">
      <p className="title">Stock Prices </p>
        <div className="date-picker">
          <label htmlFor="dateFrom">from</label>
          <input
            type="date"
            name="dateFrom"
            defaultValue={defaultDate}
            max={defaultCurrDate}
            onChange={(e) => setDateFrom(e.target.value)}
          ></input>
          <label htmlFor="dateTo">to</label>
          <input
            type="date"
            name="dateTo"
            defaultValue={defaultCurrDate}
            max={defaultCurrDate}
            onChange={(e) => setDateTo(e.target.value)}
          ></input>

          <label htmlFor="select">Stock</label>
          <select
            name="select"
            id="submit"
            onChange={(e) => setStocks(e.target.value)}
          >
            {dataType.map((stock) => (
              <option value={stock}>{stock}</option>
            ))}
          </select>
      </div>
    <div className="two">
          {data ? (
            <MyChart priceData={data} />
          ) : null}
    </div>
      </div>
    </>
  );
};
