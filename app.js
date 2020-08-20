const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const index = require("./server/index");

const zamina = require("./server/zamina");

const student = require("./server/student");

const prepod = require("./server/prepod");

const dataModule = require("./server/dateModule");

const jsonParser = express.json();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "hbs");

// ---------------- Index -----------------------

app.get("/", function (req, res) {
  (async function () {
    let result = await index();

    if (result.length == 0) {
      res.status(404);

      res.render("404.hbs");
    } else {
      result = result.join(" ");

      res.render("index.hbs", {
        lessons: result,
        day: dataModule.getWeekDay(),
      });
    }
  })();
});

// ---------------- Student -----------------------

let kurs;

app.post("/group", jsonParser, function (req, res) {
  const idGroup = req.body.idGroup;

  (async function () {
    let result = await student.group(idGroup);

    res.json(result);
  })();
});

app.post("/viddilenya", jsonParser, function (req, res) {
  const idViddilenya = req.body.idVid;

  (async function () {
    let result = await student.viddilenya(idViddilenya);

    res.json(result);
  })();
});

app.post("/student", function (req, res) {
  kurs = req.body.kurs;

  (async function () {
    let load = await student.load();

    let result = await student.rozklad(kurs);

    if (result.length == 0) {
      res.status(404);

      res.render("404.hbs");
    } else {
      result = result.join(" ");

      res.render("student.hbs", {
        load: load,

        viddilenya: req.body.viddilenya,

        group: req.body.group,

        kur: req.body.kurs,

        kurs: result,
      });
    }
  })();
});

app.get("/student", function (req, res) {
  (async function () {
    let load = await student.load();

    res.render("student.hbs", {
      load: load,
    });
  })();
});

app.post("/printStudent", jsonParser, function (req, res) {
  (async function () {
    let result = await student.print(kurs);

    if (result.length == 0) {
      res.status(404);

      res.render("404.hbs");
    } else {
      try {
        res.json(result);
      } catch (e) {
        console.log("Error", e);
      }
    }
  })();
});

// ---------------- Vukladach -----------------------

let vikladach;

app.post("/vukladach", function (req, res) {
  vikladach = req.body.vikladach;

  (async function () {
    let load = await prepod.load();

    let result = await prepod.rozklad(vikladach);

    if (result.length == 0) {
      res.status(404);

      res.render("404.hbs");
    } else {
      result = result.join(" ");

      res.render("prepod.hbs", {
        load: load,

        vikladach: vikladach,

        para: result,
      });
    }
  })();
});

app.get("/vukladach", function (req, res) {
  (async function () {
    let load = await prepod.load();

    res.render("prepod.hbs", {
      load: load,
    });
  })();
});

app.post("/printPrepod", jsonParser, function (req, res) {
  (async function () {
    let result = await prepod.print(vikladach);

    if (result.length == 0) {
      res.status(404);

      res.render("404.hbs");
    } else {
      try {
        res.json(result);
      } catch (e) {
        console.log("Error", e);
      }
    }
  })();
});

// ---------------- Zaminu -----------------------

let zaminaRezult;

let zaminaDate;

app.post("/zaminu", function (req, res) {
  zaminaDate = req.body.date;

  (async function () {
    zaminaRezult = await zamina.main(dataModule.getDate(zaminaDate));

    if (zaminaRezult.length == 0) {
      res.status(404);

      res.render("404.hbs");
    } else {
      zaminaRezult = zaminaRezult.join(" ");

      res.render("zamina.hbs", {
        zamina: zaminaRezult,
        date: dataModule.getDateInput(zaminaDate),
      });
    }
  })();
});

app.get("/zaminu", function (req, res) {
  (async function () {
    zaminaDate = new Date();

    let zaminaRezult = await zamina.main(dataModule.getDate(zaminaDate));

    if (zaminaRezult.length == 0) {
      res.status(404);

      res.render("404.hbs");
    } else {
      zaminaRezult = zaminaRezult.join(" ");

      res.render("zamina.hbs", {
        zamina: zaminaRezult,

        date: dataModule.getDateInput(zaminaDate),
      });
    }
  })();
});

app.post("/printZamina", jsonParser, function (req, res) {
  (async function () {
    let zaminaRezult = await zamina.print(dataModule.getDate(zaminaDate));

    if (zaminaRezult.length == 0) {
      res.status(404);

      res.render("404.hbs");
    } else {
      try {
        res.json(zaminaRezult);
      } catch (e) {
        console.log("Error", e);
      }
    }
  })();
});

// --------------- Error -----------------------

app.get("/*", function (req, res) {
  res.status(404);

  res.render("404.hbs");
});

app.listen(3000);
