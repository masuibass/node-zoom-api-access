const fs = require("fs");
const { parse } = require("json2csv");

// JSONファイルを読み込み
const json = require("./output.json");

// データを整形
const users = json.users;
const mappedData = users.map((user) => ({
  id: user.id,
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
}));

// CSVにパースしてファイルに書き込み
const csv = parse(mappedData);
fs.writeFileSync("./output.csv", csv);
