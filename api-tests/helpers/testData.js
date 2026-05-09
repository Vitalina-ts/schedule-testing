module.exports = {
  newDepartment() {
    return {
      name: "Test Department",
      disable: false
    };
  },

  updatedDepartment() {
    return {
      name: "Updated Name",
      disable: true
    };
  },

  newSchedule() {
    return {
      periodId: 1,
      lessonId: 1,
      roomId: 1,
      dayOfWeek: "MONDAY",
      evenOdd: "EVEN"
    };
  }
};