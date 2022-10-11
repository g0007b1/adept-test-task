import {instance} from "./api";

export const employeeApi = {
    async getEmployees(company) {
        console.log(company)
        try {
            const response = await instance.get(`employees?company=${company}`)
            return response.data
        } catch (error) {
            return error
        }
    },
    async addEmployee(companyId) {
        try {
            const response = await instance.post('employees', {
                "secondName": "-",
                "name": "-",
                "jobTitle": "-",
                "company": companyId,
            })
            return response.data
        } catch (error) {
            return error
        }
    },
    async patchEmployeeCell(employeeId, cell, value) {
        try {
            const res = await instance.patch(`employees/${employeeId}`, {[cell]: value})
        } catch (error) {
            return error
        }
    },
    async deleteEmployee(employeeId) {
        try {
            await instance.delete(`employees/${employeeId}`)
        } catch (error) {
            return error
        }
    }
}