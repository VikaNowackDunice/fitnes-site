const prisma = require("../prisma");
const express = require("express");
const router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", (req, res) => res.redirect("/index.html"));

router.get("/index.html", async function (req, res, next) {
  const [timetables, sports] = await Promise.all([
    prisma.timetables.findMany({ include: { sport: true } }),
    prisma.sports.findMany({
      take: 6,
    }),
  ]);

  const formattedTimetables = timetables.reduce((acc, time) => {
    time.time_start =
      time.time_start.getHours() +
      ":" +
      String(time.time_start.getMinutes()).padStart(2, "0");
    time.time_end =
      time.time_end.getHours() +
      ":" +
      String(time.time_end.getMinutes()).padStart(2, "0");

    if (!acc[time.time_start]) {
      acc[time.time_start] = {};
    }
    acc[time.time_start][time.week_day] = time;
    return acc;
  }, {});

  const sortedTimetables = Object.entries(formattedTimetables).sort(
    ([a], [b]) => a.localeCompare(b)
  );
  const formattedSports = sports.map((i) => i.name);

  res.render("index", {
    user: req.user,
    timetables: sortedTimetables,
    sports: formattedSports,
  });
});

router.get("/contact.html", function (req, res, next) {
  res.render("contact", { title: "Express" });
});

router.get("/main.html", function (req, res, next) {
  res.render("main", { title: "Express" });
});

router.get("/schedule.html", async function (req, res, next) {
  const [timetables, sports] = await Promise.all([
    prisma.timetables.findMany({ include: { sport: true } }),
    prisma.sports.findMany({
      take: 6,
    }),
  ]);

  const formattedTimetables = timetables.reduce((acc, time) => {
    if (!acc[time.time_start]) {
      acc[time.time_start] = {};
    }
    acc[time.time_start][time.week_day] = time;
    return acc;
  }, {});
  const sortedTimetables = Object.entries(formattedTimetables).sort(
    ([a], [b]) => a.localeCompare(b)
  );

  const formattedSports = sports.map((i) => i.name);

  res.render("schedule", {
    timetables: sortedTimetables,
    sports: formattedSports,
  });
});

router.get("/add-trainer.html", async function (req, res, next) {
  res.render("add-trainer");
});

router.get("/payment.html", async function (req, res, next) {
  res.render("payment");
});

router.post("/payment", async function (req, res, next) {
  await prisma.users.create({
    data: {
      ...req.body,
      age: +req.body.age || null,
      role: "payment",
    },
  });

  res.redirect("/index.html");
});
router.post("/add-trainer", async function (req, res, next) {
  await prisma.users.create({
    data: {
      ...req.body,
      age: +req.body.age || null,
      role: "trainer",
    },
  });
  res.redirect("/index.html");
});

router.post(
  "/sign-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/test", async (req, res) => {
  console.time("все пользователи");
  const sports = await prisma.sports.findMany();
  console.timeEnd("все пользователи");
  res.json(sports);
});

router.get("/test2", async (req, res) => {
  console.time("6 пользователей");
  const sports = await prisma.sports.findMany({
    take: 6,
  });
  console.timeEnd("6 пользователей");
  res.json(sports);
});

router.get("/test2", async (req, res) => {
  console.time("6 пользователей");
  const sports = await prisma.sports.findMany({
    take: 6,
  });
  console.timeEnd("6 пользователей");
  res.json(sports);
});
module.exports = router;
