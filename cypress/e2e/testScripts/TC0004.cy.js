///<reference types ="cypress"/>
import task from '../pageObjects/task'

describe('to-do-addTask', () => {

    const Task = new task()

    let TC0004;

    before(() => {
        cy.fixture('task.json').then(function (toDoJson) {
            this.toDoJson = toDoJson
            TC0004 = this.toDoJson.TC0004
        })
    })

    it('TC0004 Verify input field got cleared after adding a task', () => {

        cy.visit(Cypress.env('url'))

        Task.getToDoListForm().should('be.visible')
        Task.getToDoListFormTitle().should('have.text', TC0004.title)
        Task.getTaskInput().type(TC0004.taskValue)
        Task.getTaskAddButton().click()

        //Assertion
        Task.getTaskInput().should('be.empty')
        cy.screenshot({ capture: 'runner', overwrite: true })

    })
})