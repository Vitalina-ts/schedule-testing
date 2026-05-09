function expectDepartment(dep) {
  expect(dep).toHaveProperty("id");
  expect(dep).toHaveProperty("name");
  expect(dep).toHaveProperty("disable");
}

function expectSchedule(sch) {
  expect(sch).toHaveProperty("id");
  expect(sch).toHaveProperty("periodId");
  expect(sch).toHaveProperty("lessonId");
  expect(sch).toHaveProperty("roomId");
  expect(sch).toHaveProperty("dayOfWeek");
  expect(sch).toHaveProperty("evenOdd");
}

module.exports = { expectDepartment, expectSchedule };
