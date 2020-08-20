const mysql = require("mysql2/promise");

const config = require("./config");

const dataModule = require("./dateModule");


// ----------------------- Async Main Function -----------------------

function weekDay(day) {

  let days = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"];

  return days[day];

}

module.exports = {



  load: async function load() {

    let arr = [];

    let str = ``;

    const connection = await mysql.createConnection(config);

    const [rows1, field1] = await connection.execute(

      `SELECT * FROM dm_teachers`

    );

    for (i in rows1) {

      str = `<option value="${rows1[i]["surname"]} ${rows1[i]["name"]} ${rows1[i]["patronymic"]}">${rows1[i]["surname"]} ${rows1[i]["name"]} ${rows1[i]["patronymic"]}</option>`;

      arr.push(str);

    }

    connection.end();

    return arr;

  },

  rozklad: async function rozklad(vikladach) {

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

      str = `<div class="student__main wow fadeIn">

        <div class="student__block__title">${vikladach}</div>

        <hr class="student__block__hr">

        <div class="student__content">`;

      for (i = 0; i < 5; i++) {

        const myMap = new Map();

        const [rows2, field2] = await connection.execute(

          `SELECT dm_couples.*, dm_groups.name FROM dm_couples INNER JOIN dm_groups 

          ON dm_groups.id = dm_couples.id_group WHERE (teacher_first='${vikladach}' OR teacher_second='${vikladach}'

          OR teacher_first_ZN='${vikladach}' OR teacher_second_ZN='${vikladach}') AND day='${i}' ORDER BY number`

        );

        if (weekDay(i) == dataModule.getWeekDay()) {
          str += `<div class="student__block student--active">

            <div class="student__block__day">${weekDay(i)}</div>`;
        } else {
          str += `<div class="student__block">

            <div class="student__block__day">${weekDay(i)}</div>`;
        }

        for (j in rows2) {

          myMap.set(

            rows2[j]["number"] % 5,

            `${rows2[j]["lessons"]}, ${rows2[j]["name"]}`

          );

        }

        if (myMap.has(0))

          str += `<h3 class="student__block__text"><span class="student__block__number">0:</span> ${myMap.get(

            0

          )}</h3>`;

        else

          str += `<h3 class="student__block__text"><span class="student__block__number">0:</span> Немає</h3>`;

        if (myMap.has(1))

          str += `<h3 class="student__block__text"><span class="student__block__number">1:</span> ${myMap.get(

            1

          )}</h3>`;

        else

          str += `<h3 class="student__block__text"><span class="student__block__number">1:</span> Немає</h3>`;

        if (myMap.has(2))

          str += `<h3 class="student__block__text"><span class="student__block__number">2:</span> ${myMap.get(

            2

          )}</h3>`;

        else

          str += `<h3 class="student__block__text"><span class="student__block__number">2:</span> Немає</h3>`;

        if (myMap.has(3))

          str += `<h3 class="student__block__text"><span class="student__block__number">3:</span> ${myMap.get(

            3

          )}</h3>`;

        else

          str += `<h3 class="student__block__text"><span class="student__block__number">3:</span> Немає</h3>`;

        if (myMap.has(4))

          str += `<h3 class="student__block__text"><span class="student__block__number">4:</span> ${myMap.get(

            4

          )}</h3>`;

        else

          str += `<h3 class="student__block__text"><span class="student__block__number">4:</span> Немає</h3>`;

        str += `</div>`;

      }

      str += `</div>

      </div>

    </div>`;

      arr.push(str);

      connection.end();

      return arr;

    }

  },

  print: async function print(vikladach) {

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

        `SELECT dm_couples.*, dm_groups.name FROM dm_couples INNER JOIN dm_groups 

          ON dm_groups.id = dm_couples.id_group WHERE (teacher_first='${vikladach}' OR teacher_second='${vikladach}'

          OR teacher_first_ZN='${vikladach}' OR teacher_second_ZN='${vikladach}') ORDER BY number`

      );

      let a = create(rows2);

      str = `<table border="1" width="98%" style="margin:0 auto;border-collapse: collapse;font-size:14px;">

    <tr>

        <th style="padding: 5px;border: 1px solid black;width:30%;">День/Викладач</th>

        <th style="padding: 5px;border: 1px solid black;width:70%;">${vikladach}</th>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">Понеділок 0</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("0 | 0") ? a.get("0 | 0").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">1</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("0 | 1") ? a.get("0 | 1").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">2</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("0 | 2") ? a.get("0 | 2").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">3</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("0 | 3") ? a.get("0 | 3").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">4</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("0 | 4") ? a.get("0 | 4").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">Вівторок 0</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("1 | 5") ? a.get("1 | 5").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">1</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("1 | 6") ? a.get("1 | 6").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">2</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("1 | 7") ? a.get("1 | 7").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">3</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("1 | 8") ? a.get("1 | 8").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">4</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("1 | 9") ? a.get("1 | 9").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">Середа 0</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("2 | 10") ? a.get("2 | 10").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">1</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("2 | 11") ? a.get("2 | 11").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">2</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("2 | 12") ? a.get("2 | 12").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">3</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("2 | 13") ? a.get("2 | 13").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">4</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("2 | 14") ? a.get("2 | 14").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">Четвер 0</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("3 | 15") ? a.get("3 | 15").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">1</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("3 | 16") ? a.get("3 | 16").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">2</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("3 | 17") ? a.get("3 | 17").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">3</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("3 | 18") ? a.get("3 | 18").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">4</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("3 | 19") ? a.get("3 | 19").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">П'ятниця 0</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("4 | 20") ? a.get("4 | 20").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">1</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("4 | 21") ? a.get("4 | 21").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">2</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("4 | 22") ? a.get("4 | 22").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">3</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("4 | 23") ? a.get("4 | 23").slice(0, 120) : ""}

        </td>

    </tr>

    <tr>

        <td style="padding: 5px;border: 1px solid black;width:30%;text-align:right;">4</td>

        <td style="padding: 5px;border: 1px solid black;width:70%;">

        ${a.has("4 | 24") ? a.get("4 | 24").slice(0, 120) : ""}

        </td>

    </tr>

</table>`;

      arr.push(str);

      connection.end();

      return arr;

    }

  },

};

function create(value) {

  var sayings = new Map();

  j = 0;

  value.forEach((element) => {

    let str = `${element["day"]} | ${element["number"]}`;

    let str2 = `${element["lessons"]}, ${element["name"]}`;

    sayings.set(str, str2);

  });

  return sayings;

}

