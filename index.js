// Your code here
function createEmployeeRecord(employee){
    const employeeRecord = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord;
}

function createEmployeeRecords(employee){
    return employee.map(function (record) { 
        return createEmployeeRecord(record)
    });
}

function createTimeInEvent(employeeRecord, dateStamp){
    const [date, hour] = dateStamp.split(` `);
    const inEvent = {
        type: "TimeIn",
        hour: parseFloat(hour),
        date: date,
    }
    employeeRecord.timeInEvents.push(inEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const [date, hour] = dateStamp.split(` `);
    const outEvent = {
        type: "TimeOut",
        hour: parseFloat(hour),
        date: date,
    }
    employeeRecord.timeOutEvents.push(outEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date){
    const inEvent = employeeRecord.timeInEvents.find(function (inEvent){
         return inEvent.date === date;
        });
    const outEvent = employeeRecord.timeOutEvents.find(function (outEvent){
        return outEvent.date === date;
    });
    return (outEvent.hour - inEvent.hour)/100;
}

function wagesEarnedOnDate(employeeRecord, date){
    return hoursWorkedOnDate(employeeRecord,date)*employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord){
    const range = employeeRecord.timeInEvents.map(function (employeeRecord) {
        return employeeRecord.date;
    })
    let total = 0;
    range.forEach(function (date){
        const pay = wagesEarnedOnDate(employeeRecord,date);
        return total = total + pay;
        
    })
    return total;
}

function calculatePayroll(arr){
    let total = 0;
    arr.forEach(function (employeeRecord){
        return total = total + allWagesFor(employeeRecord);
    })
    return total;
}