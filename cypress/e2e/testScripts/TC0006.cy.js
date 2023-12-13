///<reference types ="cypress"/>
import task from '../pageObjects/task'

describe('to-do-deleteTask', () => {

    const Task = new task()

    let TC0006;

    before(() => {
        cy.fixture('task.json').then(function (toDoJson) {
            this.toDoJson = toDoJson
            TC0006 = this.toDoJson.TC0006
        })
    })

    it('TC0006 Verify user can able to delete a pending task', () => {

        cy.visit(Cypress.env('url'))

        Task.getToDoListForm().should('be.visible')
        Task.getToDoListFormTitle().should('have.text', TC0006.title)
        Task.getTaskInput().type(TC0006.taskValue)
        Task.getTaskAddButton().click()
        Task.getDeleteTask(TC0006.taskValue).click()

        //Assertion
        Task.getAddedTask(TC0006.taskValue).should('not.exist')
        cy.screenshot({ capture: 'runner', overwrite: true })

    })
})