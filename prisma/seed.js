const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");

const DAYS = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

const generateId = (() => {
  const cacheLastIds = {};
  return (key) => {
    cacheLastIds[key] = cacheLastIds[key] + 1 || 1;
    return cacheLastIds[key];
  };
})();

const timetableData = [
  {
    id: generateId("timetables"),
    week_day: DAYS.MONDAY,
    sportId: 1,
    time_start: new Date(2022, 1, 1, 12, 0),
    time_end: new Date(2022, 1, 1, 13, 30),
  },
  {
    id: generateId("timetables"),
    week_day: DAYS.WEDNESDAY,
    sportId: 1,
    time_start: new Date(2022, 1, 1, 12, 0),
    time_end: new Date(2022, 1, 1, 13, 30),
  },
  {
    id: generateId("timetables"),
    week_day: DAYS.FRIDAY,
    sportId: 1,
    time_start: new Date(2022, 1, 1, 12, 0),
    time_end: new Date(2022, 1, 1, 13, 30),
  },

  {
    id: generateId("timetables"),
    week_day: DAYS.TUESDAY,
    sportId: 2,
    time_start: new Date(2022, 1, 1, 18, 0),
    time_end: new Date(2022, 1, 1, 20, 0),
  },
  {
    id: generateId("timetables"),
    week_day: DAYS.THURSDAY,
    sportId: 2,
    time_start: new Date(2022, 1, 1, 18, 0),
    time_end: new Date(2022, 1, 1, 20, 0),
  },
  {
    id: generateId("timetables"),
    week_day: 6,
    sportId: 2,
    time_start: new Date(2022, 1, 1, 12, 0),
    time_end: new Date(2022, 1, 1, 13, 15),
  },

  {
    id: generateId("timetables"),
    week_day: DAYS.MONDAY,
    sportId: 3,
    time_start: new Date(2022, 1, 1, 17, 0),
    time_end: new Date(2022, 1, 1, 19, 0),
  },
  {
    id: generateId("timetables"),
    week_day: DAYS.WEDNESDAY,
    sportId: 3,
    time_start: new Date(2022, 1, 1, 17, 0),
    time_end: new Date(2022, 1, 1, 19, 0),
  },
  {
    id: generateId("timetables"),
    week_day: DAYS.SUNDAY,
    sportId: 3,
    time_start: new Date(2022, 1, 1, 10, 0),
    time_end: new Date(2022, 1, 1, 12, 0),
  },
  {
    id: generateId("timetables"),
    week_day: DAYS.MONDAY,
    sportId: 3,
    time_start: new Date(2022, 1, 1, 19, 0),
    time_end: new Date(2022, 1, 1, 21, 0),
  },
  {
    id: generateId("timetables"),
    week_day: DAYS.WEDNESDAY,
    sportId: 3,
    time_start: new Date(2022, 1, 1, 19, 0),
    time_end: new Date(2022, 1, 1, 21, 0),
  },
  {
    id: generateId("timetables"),
    week_day: DAYS.SUNDAY,
    sportId: 3,
    time_start: new Date(2022, 1, 1, 12, 0),
    time_end: new Date(2022, 1, 1, 14, 0),
  },
];

const sportData = [
  { id: generateId("sport"), name: "Фитнес" },
  { id: generateId("sport"), name: "Бодибилдинг" },
  { id: generateId("sport"), name: "Йога" },
];

const load = async () => {
  try {
    console.time("test");
    await prisma.sports.createMany({
      data: Array.from({ length: 1000_000 }).map((_, index) => ({
        name: `Sport-${crypto.randomUUID()}`,
      })),
      skipDuplicates: true,
    });

    // await prisma.timetables.createMany({
    //   data: timetableData,
    //   skipDuplicates: true,
    // });

    // for (const index of Array.from({ length: 500_000 }).map(
    //   (_, index) => index
    // )) {
    //   await prisma.users.create({
    //     data: [
    //       {
    //         first_name: `Имя ${index + 1}`,
    //         last_name: `Фамилия ${index + 1}`,
    //         login: `login${index + 1}@gmail.com`,
    //         password: "fst4es",
    //         phone: "89998887766",
    //         age: 21,
    //         user_timetables: {
    //           //   connect: [{ id: 1 }],
    //           //   create: {},
    //         },
    //       },
    //     ],
    //   });
    // }

    // await prisma.sports.deleteMany({
    //   where: {
    //     name: { contains: "Новый спорт" },
    //   },
    // });
    console.log("ура, данные теперь в БД!");
    console.timeEnd("test");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

async function removeUserById(id) {
  try {
    await prisma.payment.delete({
      where: {
        id
      }
    })
  } catch(e) {
    onError(e)
  }
}

load();
