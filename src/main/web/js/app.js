/**
 * Created with IntelliJ IDEA.
 * User: harmia
 * Date: 22.7.2013
 * Time: 14:03
 * Copyright (C) 2013 Juhana "harmia" Harmanen
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var vertxApp = angular.module('vertxModule', []).factory('EventBus',function () {
        var EventBus = new vertx.EventBus(window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/eventbus');
        EventBus.onopen = function () {
        }

        EventBus.onclose = function () {
            eb = null
        }
        return EventBus

    }
).factory('WebUtils',function () {
        var root = {}

        root.clearAlert = function (scope) {
            scope.alert = {
                error: '',
                success: '',
                info: '',
                alert: ''
            }
        }

        root.getNextDepartmentId = function (departments) {
            return departments[departments.length - 1] ? departments[departments.length - 1].id + 1 : 1
        }

        root.getNextEmployeeId = function (departments) {
            var nextId = 0
            departments.forEach(function (department) {
                    nextId = department.employees[department.employees.length - 1] ? department.employees[department.employees.length - 1].id + 1 : 1
                }
            )
            return nextId
        }

        return root
    }
).factory('DepartmentService',function (EventBus) {
        var root = {}

        root.listDepartments = function () {
            var departments = []
            EventBus.onopen = function () {
                EventBus.send('vertx.mongopersistor', {action: 'find', collection: 'departments', matcher: {}},
                    function (reply) {
                        if (reply.status === 'ok') {
                            reply.results.forEach(function (result) {
                                    departments.push(new Department(result))
                                }
                            )
                        } else {
                            console.error('Failed to retrieve departments: ' + reply.message)
                        }
                    }
                )
            }
            return departments
        }

        root.addDepartment = function (departmentJson, callback) {
            var result = {}
            result.department = new Department(departmentJson)
            EventBus.send('vertx.mongopersistor', {action: 'save', collection: 'departments', document: result.department},
                function (reply) {
                    if (reply.status === 'ok') {
                        result.department._id = reply._id
                        result.success = true
                    } else {
                        result.success = false
                    }
                    callback(result)
                }
            )
        }

        root.deleteDepartment = function (department, callback) {
            var result = {}
            EventBus.send('vertx.mongopersistor', {action: 'delete', collection: 'departments', document: department, matcher: {_id: department._id}},
                function (reply) {
                    console.log(reply)
                    if (reply.status === 'ok') {
                        result.department = department
                        result.success = true
                    } else {
                        result.success = false
                    }
                    callback(result)
                }
            )
        }

        return root
    }
).factory('EmployeeService',function (EventBus) {
        var root = {}

        root.addEmployee = function (employeeJson, callback) {
            var result = {}
            result.employee = new Employee(employeeJson)
            EventBus.send('vertx.mongopersistor', {action: 'update', collection: 'departments', criteria: {_id: employeeJson.department._id}, objNew: {$push: {employees: result.employee}}},
                function (reply) {
                    if (reply.status === 'ok') {
                        result.success = true
                    } else {
                        result.success = false
                    }
                    callback(result)
                }
            )
        }

        root.deleteEmployee = function (department, employee, callback) {
            var result = {}
            result.employee = employee
            EventBus.send('vertx.mongopersistor', {action: 'update', collection: 'departments', criteria: {_id: department._id}, objNew: {$pull: {employees: {id: employee.id}}}},
                function (reply) {
                    console.log(reply)
                    if (reply.status === 'ok') {
                        result.success = true
                    } else {
                        result.success = false
                    }
                    callback(result)
                }
            )
        }


        root.changeDepartment = function (oldDepartment, employee, newDepartment, callback) {
            var result = {}
            result.employee = employee
            result.department = newDepartment
            EventBus.send('vertx.mongopersistor', {action: 'update', collection: 'departments', criteria: {_id: oldDepartment._id}, objNew: {$pull: {employees: {id: employee.id}}}},
                function (reply) {
                    if (reply.status === 'ok') {
                        oldDepartment.employees.splice(oldDepartment.employees.indexOf(employee), 1)
                        EventBus.send('vertx.mongopersistor', {action: 'update', collection: 'departments', criteria: {_id: newDepartment._id}, objNew: {$push: {employees: employee}}},
                            function (reply) {
                                if (reply.status === 'ok') {
                                    newDepartment.employees.push(employee)
                                    result.success = true
                                } else {
                                    result.success = false
                                }
                                callback(result)
                            }
                        )
                    }
                }
            )
        }

        return root
    }
).factory('MunicipalityService', function (EventBus) {
        var root = {}

        root.checkMunicipalities = function (searchObject, response) {
            EventBus.send('vertx.mongopersistor', {action: 'find', collection: 'municipalities', matcher: {name: {$regex: searchObject.term.concat('.*')}}},
                function (reply) {
                    response($.map(reply.results, function (item) {
                        return {
                            label: item.name,
                            value: item.name
                        }
                    }))
                    return response
                }
            )
        }

        return root
    }
)


function Department(json) {
    this._id = json._id
    this.id = json.id
    this.name = json.name
    if (json.employees) {
        this.employees = json.employees
    } else {
        this.employees = []
    }
}


function Employee(json) {
    this.id = json.id
    this.firstName = json.firstName
    this.lastName = json.lastName
    this.email = json.email
    this.contractBeginDate = json.contractBeginDate
    this.municipalityName = json.municipalityName
}