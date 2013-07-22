/**
 * Created with IntelliJ IDEA.
 * User: harmia
 * Date: 22.7.2013
 * Time: 14:43
 * Copyright (C) 2013 Juhana "harmia" Harmanen
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
vertxApp.controller('MainCtrl', function ($scope, $filter, EventBus) {
        $scope.clearAlert = function () {
            $scope.alert = {
                error: '',
                success: '',
                info: '',
                alert: ''
            }
        }

        EventBus.onopen = function () {
            $scope.listDepartments()
        }

        $scope.addDepartment = function (departmentJson) {
            if (departmentJson) {
                departmentJson.id = calculateDepartmentId($scope.departments)
                var department = new Department(departmentJson)
                EventBus.send('vertx.mongopersistor', {action: 'save', collection: 'departments', document: department},
                    function (reply) {
                        if (reply.status === 'ok') {
                            $scope.alert.success = $filter('i18n')('departments.add.success', [department.name])
                            $scope.departments.push(department)
                            $scope.department = null
                        } else {
                            $scope.alert.error = $filter('i18n')('departments.add.error', [department.name])
                        }
                        $scope.$apply()
                    }
                )
            }
        }

        $scope.deleteDepartment = function (department) {
            if (department) {
                if (department.employees.length > 0) {
                    $scope.alert.error = $filter('i18n')('departments.delete.error', [department.name])
                    $scope.alert.info = $filter('i18n')('departments.delete.info')
                    $scope.$apply()
                } else {
                    EventBus.send('vertx.mongopersistor', {action: 'delete', collection: 'departments', document: department, matcher: {_id: department._id}},
                        function (reply) {
                            if (reply.status === 'ok') {
                                $scope.alert.success = $filter('i18n')('departments.delete.success', [department.name])
                                var index = $scope.departments.indexOf(department)
                                $scope.departments.splice(index, 1)
                            } else {
                                $scope.alert.error = $filter('i18n')('departments.delete.error', [department.name])
                            }
                            $scope.$apply()
                        }
                    )
                }
            }
        }

        $scope.addEmployee = function (employeeJson) {
            if (employeeJson) {
                employeeJson.id = calculateEmployeeId($scope.countEmployees())
                var index = $scope.departments.indexOf(employeeJson.department)
                var department = $scope.departments[index]
                var employee = new Employee(employeeJson)

                EventBus.send('vertx.mongopersistor', {action: 'update', collection: 'departments', criteria: {_id: department._id}, objNew: {$push: {employees: employee}}},
                    function (reply) {
                        if (reply.status === 'ok') {
                            $scope.alert.success = $filter('i18n')('employees.add.success', [employee.lastName, employee.firstName])
                            $scope.departments[index].employees.push(new Employee(employee))
                            $scope.employee = null
                        } else {
                            $scope.alert.error = $filter('i18n')('employees.add.error', [employee.lastName, employee.firstName])
                        }
                        $scope.$apply()
                    }
                )
            }
        }

        $scope.deleteEmployee = function (department, employee) {
            if (employee) {
                EventBus.send('vertx.mongopersistor', {action: 'update', collection: 'departments', criteria: {_id: department._id}, objNew: {$pull: {employees: {id: employee.id}}}},
                    function (reply) {
                        if (reply.status === 'ok') {
                            $scope.alert.success = $filter('i18n')('employees.delete.success', [employee.lastName, employee.firstName])
                            var employeeIndex = department.employees.indexOf(employee)
                            department.employees.splice(employeeIndex, 1)
                            $scope.employee = null
                        } else {
                            $scope.alert.error = $filter('i18n')('employees.delete.error', [employee.lastName, employee.firstName])
                        }
                        $scope.$apply()
                    }
                )
            }
        }

        $scope.changeEmployeeDepartment = function (oldDepartment, employee, newDepartment) {
            if (oldDepartment && employee && newDepartment && oldDepartment._id != newDepartment._id) {
                EventBus.send('vertx.mongopersistor', {action: 'update', collection: 'departments', criteria: {_id: oldDepartment._id}, objNew: {$pull: {employees: {id: employee.id}}}},
                    function (reply) {
                        if (reply.status === 'ok') {
                            var employeeIndex = oldDepartment.employees.indexOf(employee)
                            oldDepartment.employees.splice(employeeIndex, 1)
                            EventBus.send('vertx.mongopersistor', {action: 'update', collection: 'departments', criteria: {_id: newDepartment._id}, objNew: {$push: {employees: employee}}},
                                function (reply) {
                                    if (reply.status === 'ok') {
                                        $scope.alert.success = $filter('i18n')('employees.change.success', [employee.lastName, newDepartment.name])
                                        var index = $scope.departments.indexOf(newDepartment)
                                        $scope.departments[index].employees.push(new Employee(employee))
                                        $scope.employee = null
                                    } else {
                                        $scope.alert.error = $filter('i18n')('employees.change.error', [employee.lastName, newDepartment.name])
                                    }
                                    $scope.$apply()
                                }
                            )
                        } else {
                            $scope.alert.error = $filter('i18n')('employees.change.error', [employee.lastName, newDepartment.name])
                        }
                        $scope.$apply()
                    }
                )
            }
        }

        $scope.listDepartments = function () {
            $scope.departments = []
            EventBus.send('vertx.mongopersistor', {action: 'find', collection: 'departments', matcher: {}},
                function (reply) {
                    if (reply.status === 'ok') {
                        reply.results.forEach(function (result) {
                            $scope.departments.push(new Department(result))
                        })
                    } else {
                        console.error('Failed to retrieve departments: ' + reply.message)
                    }
                    $scope.$apply()
                }
            )
        }

        $scope.checkFirstNames = function (searchObject, response) {
            $.getJSON("/data/names.json").success(function (data) {
                response($.map($.grep(data, function (item) {
                    return item.name.toUpperCase().startsWith(searchObject.term.toUpperCase())
                }), function (item) {
                    return {
                        label: item.name,
                        value: item.name
                    }
                })
                )
            })
        }

        $scope.checkMunicipalities = function (searchObject, response) {
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

        $scope.countEmployees = function () {
            var count = 0
            if ($scope.departments) {
                $scope.departments.forEach(function (department) {
                    count += department.employees.length
                })
            }
            return count
        }
    }
)

function calculateDepartmentId(departments) {
    var id = departments.length + 1
    departments.forEach(function (department) {
        if (department.id >= id) {
            id = department.id + 1
        }
    })
    return id
}

function calculateEmployeeId(amountOfEmployees) {
    return amountOfEmployees + 1
}

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