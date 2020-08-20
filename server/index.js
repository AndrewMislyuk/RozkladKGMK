const mysql = require("mysql2/promise");

const config = require("./config");

const dataModule = require("./dateModule");

// ----------------------- Async Main Function -----------------------

module.exports = async function main() {
  let arr = [];

  let str = "";

  const connection = await mysql.createConnection(config);

  const [rows1, field1] = await connection.execute(
    "SELECT * FROM dm_timetables WHERE status='Активний'"
  );

  if (rows1 == "") {
    connection.end();

    return arr;
  } else {
    const [rows2, field2] = await connection.execute(
      `SELECT dc_timetable_group_plan.id_group, dm_groups.name FROM dc_timetable_group_plan INNER JOIN dm_groups ON dc_timetable_group_plan.id_group  = dm_groups.id WHERE id_timetable=${rows1[0]["id"]} ORDER BY dm_groups.name`
    );

    let counts = 1;

    for (i in rows2) {
      const myMap = new Map();

      const [rows3, field3] = await connection.execute(
        `SELECT * FROM dm_couples WHERE id_timetable=${
          rows1[0]["id"]
        } AND id_group=${
          rows2[i]["id_group"]
        } AND day=${dataModule.daynumber()} ORDER BY day,number`
      );

      for (j in rows3) {
        myMap.set(rows3[j]["number"] % 5, rows3[j]["lesson"]);
      }

      str = "<div class='wow fadeIn block'>";

      str +=
        `<h2 class='block__title' id='${counts}'>` + rows2[i]["name"] + "</h2>";

      counts++;

      str += "<hr class='block__hr'>";

      if (myMap.has(0))
        str += `<h3 class="block__subtitle"><span class="main__number">0:</span> ${myMap.get(
          0
        )}</h3>`;
      else
        str += `<h3 class="block__subtitle"><span class="main__number">0:</span> Немає</h3>`;

      if (myMap.has(1))
        str += `<h3 class="block__subtitle"><span class="main__number">1:</span> ${myMap.get(
          1
        )}</h3>`;
      else
        str += `<h3 class="block__subtitle"><span class="main__number">1:</span> Немає</h3>`;

      if (myMap.has(2))
        str += `<h3 class="block__subtitle"><span class="main__number">2:</span> ${myMap.get(
          2
        )}</h3>`;
      else
        str += `<h3 class="block__subtitle"><span class="main__number">2:</span> Немає</h3>`;

      if (myMap.has(3))
        str += `<h3 class="block__subtitle"><span class="main__number">3:</span> ${myMap.get(
          3
        )}</h3>`;
      else
        str += `<h3 class="block__subtitle"><span class="main__number">3:</span> Немає</h3>`;

      if (myMap.has(4))
        str += `<h3 class="block__subtitle"><span class="main__number">4:</span> ${myMap.get(
          4
        )}</h3>`;
      else
        str += `<h3 class="block__subtitle"><span class="main__number">4:</span> Немає</h3>`;

      str += "</div>";

      arr.push(str);
    }

    connection.end();

    return arr;
  }
};
