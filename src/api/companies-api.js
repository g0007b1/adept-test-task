import {instance} from "./api";

export const companiesApi = {
    async getCompanies(amount) {
        try {
            const response = await instance.get(`companies?_limit=${amount}`)
            return response.data
        } catch (error) {
            return error
        }
    },
    async addCompany() {
        try {
            const response = await instance.post(`companies`, {
                "name": "-",
                "employeesAmount": 0,
                "address": "-"
            })
            return response.data
        } catch (error) {
            return error
        }
    },
    async setEmployeesAmount(amount, companyId) {
        try {
            await instance.patch(`companies/${companyId}`, {employeesAmount: amount})
        } catch (error) {
            return error
        }
    },
    async patchCompanyCell(companyId, cell, value) {
        try {
            const res = await instance.patch(`companies/${companyId}`, {[cell]: value})
        } catch (error) {
            return error
        }
    },
    async deleteCompany(companyId) {
        try {
            await instance.delete(`companies/${companyId}`)
            const res = await instance.get(`employees?company=${companyId}`)
            res.data.forEach(emp => instance.delete(`employees/${emp.id}`))
        } catch (error) {
            return error
        }
    }
}