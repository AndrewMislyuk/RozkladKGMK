const mysql = require("mysql2/promise");
const config = require("./config");
// ----------------------- Async Main Function -----------------------
function weekDay(day) {
  let days = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"];
  return days[day];
}
module.exports = async function print() {
  let arr = [];
  let str = ``;
  const connection = await mysql.createConnection(config);
  const [rows1, field1] = await connection.execute(
    "SELECT * FROM dm_timetables WHERE status='Активний'"
  );
  if (rows1 == "") {
    connection.end();
    return arr;
  } else {
    const [rows2, field2] = await connection.execute(
      `SELECT COUNT(id) AS count FROM dc_timetable_group_plan WHERE id_timetable = ${rows1[0]["id"]}`
    );
    const [rows3, field3] = await connection.execute(
      `SELECT dc_timetable_group_plan.id_group, dm_groups.name FROM dc_timetable_group_plan INNER JOIN dm_groups
      ON dm_groups.id = dc_timetable_group_plan.id_group WHERE id_timetable = ${rows1[0]["id"]} ORDER BY dm_groups.name`
    );
    let count = Math.ceil(rows2[0]["count"] / 3);
    let count_current_group = 0;
    str = "";
    for (i = 0; i < count; i++) {
      let group1 = rows3[count_current_group]["id_group"];
      let name1 = rows3[count_current_group]["name"];
      count_current_group++;
      const [rows4, field4] = await connection.execute(
        `SELECT * FROM dm_couples 
        WHERE id_timetable = ${rows1[0]["id"]} AND id_group = ${group1} ORDER BY day, number`
      );
      let a = create(rows4);
      let group2 = rows3[count_current_group]["id_group"];
      let name2 = rows3[count_current_group]["name"];
      const [rows5, field5] = await connection.execute(
        `SELECT * FROM dm_couples 
        WHERE id_timetable = ${rows1[0]["id"]} AND id_group = ${group2} ORDER BY day, number`
      );
      let b = create(rows5);
      count_current_group++;
      let group3 = rows3[count_current_group]["id_group"];
      let name3 = rows3[count_current_group]["name"];
      const [rows6, field6] = await connection.execute(
        `SELECT * FROM dm_couples 
        WHERE id_timetable = ${rows1[0]["id"]} AND id_group = ${group3} ORDER BY day, number`
      );
      let c = create(rows6);
      count_current_group++;
      str += `<table border="1" width="98%" style="margin:0 auto;border-collapse: collapse;font-size:14px;min-height:1200px;">
    <tr>
        <th style="padding: 5px;border: 1px solid black;width:10%;">Групи</th>
        <th style="padding: 5px;border: 1px solid black;width:30%;">${name1}</th>
        <th style="padding: 5px;border: 1px solid black;width:30%;">${name2}</th>
        <th style="padding: 5px;border: 1px solid black;width:30%;">${name3}</th>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">Понеділок 0</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px;">${
          a.has("0 | 0") ? a.get("0 | 0").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("0 | 0") ? b.get("0 | 0").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("0 | 0") ? c.get("0 | 0").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">1</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("0 | 1") ? a.get("0 | 1").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("0 | 1") ? b.get("0 | 1").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("0 | 1") ? c.get("0 | 1").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">2</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("0 | 2") ? a.get("0 | 2").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("0 | 2") ? b.get("0 | 2").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("0 | 2") ? c.get("0 | 2").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">3</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("0 | 3") ? a.get("0 | 3").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("0 | 3") ? b.get("0 | 3").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("0 | 3") ? c.get("0 | 3").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">4</td>
       <td style="padding: 5px;border: 1px solid black;font-size:9px">${
         a.has("0 | 4") ? a.get("0 | 4").slice(0, 120) : ""
       }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("0 | 4") ? b.get("0 | 4").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("0 | 4") ? c.get("0 | 4").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">Вівторок 0</td>
     <td style="padding: 5px;border: 1px solid black;font-size:9px">${
       a.has("1 | 5") ? a.get("1 | 5").slice(0, 120) : ""
     }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("1 | 5") ? b.get("1 | 5").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("1 | 5") ? c.get("1 | 5").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">1</td>
       <td style="padding: 5px;border: 1px solid black;font-size:9px">${
         a.has("1 | 6") ? a.get("1 | 6").slice(0, 120) : ""
       }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("1 | 6") ? b.get("1 | 6").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("1 | 6") ? c.get("1 | 6").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">2</td>
       <td style="padding: 5px;border: 1px solid black;font-size:9px">${
         a.has("1 | 7") ? a.get("1 | 7").slice(0, 120) : ""
       }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("1 | 7") ? b.get("1 | 7").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("1 | 7") ? c.get("1 | 7").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">3</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("1 | 8") ? a.get("1 | 8").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("1 | 8") ? b.get("1 | 8").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("1 | 8") ? c.get("1 | 8").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">4</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("1 | 9") ? a.get("1 | 9").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("1 | 9") ? b.get("1 | 9").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("1 | 9") ? c.get("1 | 9").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">Середа 0</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("2 | 10") ? a.get("2 | 10").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("2 | 10") ? b.get("2 | 10").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("2 | 10") ? c.get("2 | 10").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">1</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("2 | 11") ? a.get("2 | 11").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("2 | 11") ? b.get("2 | 11").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("2 | 11") ? c.get("2 | 11").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">2</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("2 | 12") ? a.get("2 | 12").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("2 | 12") ? b.get("2 | 12").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("2 | 12") ? c.get("2 | 12").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">3</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("2 | 13") ? a.get("2 | 13").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("2 | 13") ? b.get("2 | 13").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("2 | 13") ? c.get("2 | 13").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">4</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("2 | 14") ? a.get("2 | 14").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("2 | 14") ? b.get("2 | 14").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("2 | 14") ? c.get("2 | 14").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">Четвер 0</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("3 | 15") ? a.get("3 | 15").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("3 | 15") ? b.get("3 | 15").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("3 | 15") ? c.get("3 | 15").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">1</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("3 | 16") ? a.get("3 | 16").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("3 | 16") ? b.get("3 | 16").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("3 | 16") ? c.get("3 | 16").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">2</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("3 | 17") ? a.get("3 | 17").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("3 | 17") ? b.get("3 | 17").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("3 | 17") ? c.get("3 | 17").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">3</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("3 | 18") ? a.get("3 | 18").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("3 | 18") ? b.get("3 | 18").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("3 | 18") ? c.get("3 | 18").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">4</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("3 | 19") ? a.get("3 | 19").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("3 | 19") ? b.get("3 | 19").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("3 | 19") ? c.get("3 | 19").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">П'ятниця 0</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("4 | 20") ? a.get("4 | 20").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("4 | 20") ? b.get("4 | 20").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("4 | 20") ? c.get("4 | 20").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">1</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("4 | 21") ? a.get("4 | 21").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("4 | 21") ? b.get("4 | 21").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("4 | 21") ? c.get("4 | 21").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">2</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("4 | 22") ? a.get("4 | 22").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("4 | 22") ? b.get("4 | 22").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("4 | 22") ? c.get("4 | 22").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">3</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("4 | 23") ? a.get("4 | 23").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("4 | 23") ? b.get("4 | 23").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("4 | 23") ? c.get("4 | 23").slice(0, 120) : ""
        }</td>
    </tr>
    <tr>
        <td style="padding: 5px;border: 1px solid black;text-align:right;">4</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          a.has("4 | 24") ? a.get("4 | 24").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          b.has("4 | 24") ? b.get("4 | 24").slice(0, 120) : ""
        }</td>
        <td style="padding: 5px;border: 1px solid black;font-size:9px">${
          c.has("4 | 24") ? c.get("4 | 24").slice(0, 120) : ""
        }</td>
    </tr>
</table><div style="height:86px"></div>`;
    }
    arr.push(str);
    connection.end();
    return arr;
  }
};

function create(value) {
  var sayings = new Map();
  j = 0;
  value.forEach((element) => {
    let str = `${element["day"]} | ${element["number"]}`;
    sayings.set(str, element["lesson"]);
  });
  return sayings;
}
