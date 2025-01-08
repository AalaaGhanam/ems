const config = {
    baseURL: process.env.REACT_APP_BE_BASE_URL,
    apis: {
        userLogin: 'auth/login',
        countByDepartment: 'employees/count-by-department',
        totalEmployees: 'employees/total',
        latestEmployees: 'employees/latest',
        departments: 'departments',
        employees: 'employees'
    },
    constants: {},
}

export default config
