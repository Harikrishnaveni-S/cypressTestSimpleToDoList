///<reference types ="cypress"/>
import task from '../pageObjects/task'

describe('to-do-dataPersistence', () => {

    const Task = new task()

    let TC0009;

    before(() => {
        cy.fixture('task.json').then(function (toDoJson) {
            this.toDoJson = toDoJson
            TC0009 = this.toDoJson.TC0009
        })
    })

    it('TC0009 Verify data persistence on page reload', () => {

        cy.visit(Cypress.env('url'))

        TC0009.tasks.forEach((task) => {
            cy.addTask(task)
        })
        Task.getAddedTask(TC0009.tasks[3]).click()
        cy.reload()

        cy.visit("http://127.0.0.1:5500/index.html")

        //Assertion
        TC0009.tasks.forEach((task) => {
            Task.getAddedTask(task).should('exist')
        })
        Task.getAddedTask(TC0009.tasks[3]).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')

        Task.getDeleteTask(TC0009.tasks[1]).click()
        cy.visit("http://127.0.0.1:5500/index.html")
        Task.getDeleteTask(TC0009.tasks[1]).should('not.exist')

        cy.screenshot({ capture: 'runner', overwrite: true })

    })
})