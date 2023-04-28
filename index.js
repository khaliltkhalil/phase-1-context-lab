/* Your Code Here */

function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(records) {
  return records.map(createEmployeeRecord);
}

function createTimeInEvent(timeInStamp) {
  const timeInEvent = {
    type: "TimeIn",
    date: timeInStamp.substring(0, 10),
    hour: Number(timeInStamp.substring(11, 15)),
  };
  this.timeInEvents.push(timeInEvent);
  return this;
}

function createTimeOutEvent(timeOutStamp) {
  const timeOutEvent = {
    type: "TimeOut",
    date: timeOutStamp.substring(0, 10),
    hour: Number(timeOutStamp.substring(11, 15)),
  };
  this.timeOutEvents.push(timeOutEvent);
  return this;
}

function hoursWorkedOnDate(date) {
  const timeIn =
    this.timeInEvents.find((timeInEvent) => timeInEvent.date === date).hour /
    100;
  const timeOut =
    this.timeOutEvents.find((timeOutEvent) => timeOutEvent.date === date).hour /
    100;
  return timeOut - timeIn;
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(
    (total, employeeRecord) => allWagesFor.call(employeeRecord) + total,
    0
  );
}
