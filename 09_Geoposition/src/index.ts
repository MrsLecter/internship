import express, { Request, Response } from "express";

import {
  toReturnLocationByIp,
  toConvertIPtoNumber,
  getDataTable,
} from "./utils/handlers";

const { TABLE_PATH } = require("./utils/constants");

const app = express();

app.get("/", function (_, response) {
  response.send(
    "<h2>to find out your location by ip go to [<a href='/whereiam'>/whereiam </a>]</h2>",
  );
});

app.get("/whereiam", (request: Request, response: Response) => {
  const userIp = "" + request.headers["x-forwarded-for"];
  const dataTable = getDataTable(TABLE_PATH);
  const decimalFormIp = toConvertIPtoNumber(userIp);
  const [ipFrom, ipTo, country] = toReturnLocationByIp(
    decimalFormIp,
    dataTable,
  );
  response.json({
    yourIp: userIp,
    yourIpInNumber: decimalFormIp,
    userCountry: country,
    countryIpRange: { from: ipFrom, to: ipTo },
  });
});

app.listen(3000);

console.log(
  "Server running on http://127.0.0.1:3000/. Run ngrok: ngrok http 3000 ",
);