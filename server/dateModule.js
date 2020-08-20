module.exports = {
  // ----------------------- Get Day function -----------------------

  daynumber: () => {
    let dataNow = new Date();

    if (dataNow.getDay() == 0) {
      return 6;
    } else {
      return dataNow.getDay() - 1;
    }
  },

  // ----------------------- WeekDay function -----------------------

  getWeekDay: () => {
    let days = [
      "Неділя",

      "Понеділок",

      "Вівторок",

      "Середа",

      "Четвер",

      "П'ятниця",

      "Субота",
    ];

    return days[new Date().getDay()];
  },

  // ----------------------- FormatDate function -----------------------

  getDate: (date) => {
    date = new Date(date);

    dt = date.getDate();

    if (dt < 10) dt = "0" + dt;

    mn = date.getMonth() + 1;

    if (mn < 10) mn = "0" + mn;

    yy = date.getFullYear();

    return dt + "." + mn + "." + yy;
  },

  // ----------------------- InputDate function -----------------------

  getDateInput: (date) => {
    date = new Date(date);

    dt = date.getDate();

    if (dt < 10) dt = "0" + dt;

    mn = date.getMonth() + 1;

    if (mn < 10) mn = "0" + mn;

    yy = date.getFullYear();

    return yy + "-" + mn + "-" + dt;
  },
};
