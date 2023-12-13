///<reference types ="cypress"/>
import task from '../pageObjects/task'

describe('to-do-dataPersistence', () => {

    const Task = new task()

    let TC0008;

    before(() => {
        cy.fixture('task.json').then(function (toDoJson) {
            this.toDoJson = toDoJson
            TC0008 = this.toDoJson.TC0008
        })
    })

    it('TC0008 Verify data persistence on page reload', () => {

        cy.visit(Cypress.env('url'))

        TC0008.tasks.forEach((task) => {
            cy.addTask(task)
        })
        Task.getAddedTask(TC0008.tasks[3]).click()
        cy.reload()

        //Assertion
        TC0008.tasks.forEach((task) => {
            Task.getAddedTask(task).should('exist')
        })
        Task.getAddedTask(TC0008.tasks[3]).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
        Task.getDeleteTask(TC0008.tasks[1]).click()
        cy.reload()
        Task.getDeleteTask(TC0008.tasks[1]).should('not.exist')

        cy.screenshot({ capture: 'runner', overwrite: true })

    })
})