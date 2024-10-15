function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  function createEmployeeRecords(employeeData) {
    return employeeData.map(employee => createEmployeeRecord(employee));
  }
  function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    });
    return employeeRecord;
  }
  function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
    });
    return employeeRecord;
  }
  function hoursWorkedOnDate(employeeRecord, targetDate) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === targetDate);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === targetDate);
    
    return (timeOut.hour - timeIn.hour) / 100; // Dividing by 100 to convert minutes into hours
  }
  function wagesEarnedOnDate(employeeRecord, targetDate) {
    let hours = hoursWorkedOnDate(employeeRecord, targetDate);
    return hours * employeeRecord.payPerHour;
  }
  function allWagesFor(employeeRecord) {
    let allDates = employeeRecord.timeInEvents.map(event => event.date);
    let totalWages = allDates.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
  }
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  }
  