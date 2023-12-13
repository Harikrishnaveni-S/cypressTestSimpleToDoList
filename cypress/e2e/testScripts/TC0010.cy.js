///<reference types ="cypress"/>
import task from '../pageObjects/task'

describe('to-do-reopenTask', () => {

    const Task = new task()

    let TC0010;

    before(() => {
        cy.fixture('task.json').then(function (toDoJson) {
            this.toDoJson = toDoJson
            TC0010 = this.toDoJson.TC0010
        })
    })

    it('TC0010 Verify user can able to reopen a completed task', () => {

        cy.visit(Cypress.env('url'))

        Task.getToDoListForm().should('be.visible')
        Task.getToDoListFormTitle().should('have.text', TC0010.title)
        Task.getTaskInput().type(TC0010.taskValue)
        Task.getTaskAddButton().click()
        Task.getAddedTask(TC0010.taskValue).click()
        Task.getAddedTask(TC0010.taskValue).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
        Task.getAddedTask(TC0010.taskValue).click()

        //Assertion
        Task.getAddedTask(TC0010.taskValue).should('not.have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')

        cy.screenshot({ capture: 'runner', overwrite: true })

    })
})