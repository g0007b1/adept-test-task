import {employeeActionsTypes} from "./types";
import {employeeApi} from "../../../api/employee-api";
import {companiesApi} from "../../../api/companies-api";
import {companiesActions} from "../companies/actions";

export const employeeActions = {
    setEmployee: (employees) => ({type: employeeActionsTypes.SET_EMPLOYEE, employees}),
    clearEmployees: () => ({type: employeeActionsTypes.CLEAR_EMPLOYEES}),
    getEmployee: (company) => {
        return async (dispatch) => {
            const employees = await employeeApi.getEmployees(company)
            dispatch(employeeActions.setEmployee(employees))
        }
    },
    addEmployee: (companyId, employeesAmount, amount) => {
        return async (dispatch) => {
            await employeeApi.addEmployee(companyId)
            await companiesApi.setEmployeesAmount(employeesAmount + 1, companyId)
            dispatch(employeeActions.getEmployee(companyId))
            dispatch(companiesActions.getCompanies(amount))
        }
    },
    patchEmployeeCell: (employeeId, cell, value, companyId) => {
        console.log(employeeId, cell, value, companyId)
        return async (dispatch) => {
            await employeeApi.patchEmployeeCell(employeeId, cell, value)
            dispatch(employeeActions.getEmployee(companyId))
        }
    },
    addCheckedEmployee: (id) => ({type: employeeActionsTypes.ADD_CHECKED_EMPLOYEE, id}),
    removeCheckedEmployee: (id) => ({type: employeeActionsTypes.REMOVE_CHECKED_EMPLOYEE, id}),
    setIsAllEmployeesChecked: (IsAllEmployeesChecked) => ({
        type: employeeActionsTypes.SET_IS_ALL_CHECKED,
        IsAllEmployeesChecked
    }),
    deleteEmployee: (employeeIdS, companyId, employeesAmount, length, amount) => {
        return async (dispatch) => {
            employeeIdS.forEach(id => {
                console.log('Удаляю ' + id)
                employeeApi.deleteEmployee(id)
                dispatch(employeeActions.removeCheckedEmployee(id))
            })
            await companiesApi.setEmployeesAmount(employeesAmount - length, companyId)
            dispatch(companiesActions.getCompanies(amount))
            dispatch(employeeActions.clearEmployees())
            dispatch(employeeActions.getEmployee(companyId))
        }
    }
}