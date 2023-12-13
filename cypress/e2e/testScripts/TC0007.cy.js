///<reference types ="cypress"/>
import task from '../pageObjects/task'

describe('to-do-deleteTask', () => {

    const Task = new task()

    let TC0007;

    before(() => {
        cy.fixture('task.json').then(function (toDoJson) {
            this.toDoJson = toDoJson
            TC0007 = this.toDoJson.TC0007
        })
    })

    it('TC0007 Verify user can able to delete a completed task', () => {

        cy.visit(Cypress.env('url'))

        Task.getToDoListForm().should('be.visible')
        Task.getToDoListFormTitle().should('have.text', TC0007.title)
        Task.getTaskInput().type(TC0007.taskValue)
        Task.getTaskAddButton().click()
        Task.getAddedTask(TC0007.taskValue).click()
        Task.getAddedTask(TC0007.taskValue).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
        Task.getDeleteTask(TC0007.taskValue).click()

        //Assertion
        Task.getAddedTask(TC0007.taskValue).should('not.exist')
        cy.screenshot({ capture: 'runner', overwrite: true })

    })
})