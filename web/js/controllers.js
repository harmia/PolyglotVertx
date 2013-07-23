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
vertxApp.controller('DepartmentCtrl', function ($scope, $filter, WebUtils, DepartmentService) {

        $scope.addDepartment = function (departmentJson) {
            if (departmentJson) {
                departmentJson.id = WebUtils.getNextDepartmentId($scope.departments)
                DepartmentService.addDepartment(departmentJson, function (result) {
                    if (result.success) {
                        $scope.departments.push(result.department)
                        $scope.alert.success = $filter('i18n')('departments.add.success', [result.department.name])
                    } else {
                        $scope.alert.error = $filter('i18n')('departments.add.error', [result.department.name])
                    }
                    $scope.$apply()
                })
            }
        }

        $scope.deleteDepartment = function (department) {
            if (department) {
                if (department.employees.length > 0) {
                    $scope.alert.error = $filter('i18n')('departments.delete.error', [department.name])
                    $scope.alert.info = $filter('i18n')('departments.delete.info')
                } else {
                    DepartmentService.deleteDepartment(department, function (result) {
                        if (result.success) {
                            var index = $scope.departments.indexOf(result.department)
                            $scope.departments.splice(index, 1)
                            $scope.alert.success = $filter('i18n')('departments.delete.success', [result.department.name])
                        } else {
                            $scope.alert.error = $filter('i18n')('departments.delete.error', [result.department.name])
                        }
                        $scope.$apply()
                    })
                }
            }
        }
    }
)

vertxApp.controller('EmployeeCtrl', function ($scope, $filter, WebUtils, EmployeeService, MunicipalityService) {

        $scope.addEmployee = function (employeeJson) {
            if (employeeJson) {
                employeeJson.id = WebUtils.getNextEmployeeId($scope.departments)
                EmployeeService.addEmployee(employeeJson, function (result) {
                    if (result.success) {
                        employeeJson.department.employees.push(result.employee)
                        $scope.alert.success = $filter('i18n')('employees.add.success', [result.employee.lastName, result.employee.firstName])
                    } else {
                        $scope.alert.error = $filter('i18n')('employees.add.error', [result.employee.lastName, result.employee.firstName])
                    }
                    $scope.$apply()
                })
            }
        }

        $scope.deleteEmployee = function (department, employee) {
            if (employee) {
                EmployeeService.deleteEmployee(department, employee, function (result) {
                    if (result.success) {
                        department.employees.splice(department.employees.indexOf(employee), 1)
                        $scope.alert.success = $filter('i18n')('employees.delete.success', [result.employee.lastName, result.employee.firstName])
                    } else {
                        $scope.alert.error = $filter('i18n')('employees.delete.error', [result.employee.lastName, result.employee.firstName])
                    }
                    $scope.$apply()
                })
            }
        }

        $scope.changeDepartment = function (oldDepartment, employee, newDepartment) {
            if (oldDepartment && employee && newDepartment && oldDepartment._id != newDepartment._id) {
                EmployeeService.changeDepartment(oldDepartment, employee, newDepartment, function (result) {
                    if (result.success) {
                        $scope.alert.success = $filter('i18n')('employees.change.success', [result.employee.lastName, result.department.name])
                    } else {
                        $scope.alert.error = $filter('i18n')('employees.change.error', [result.employee.lastName, result.department.name])
                    }
                    $scope.$apply()
                })
            }
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
            return MunicipalityService.checkMunicipalities(searchObject, response)
        }
    }
)


vertxApp.controller('MainCtrl', function ($scope, $filter, WebUtils, DepartmentService) {
        WebUtils.clearAlert($scope)

        $scope.departments = DepartmentService.listDepartments()

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
