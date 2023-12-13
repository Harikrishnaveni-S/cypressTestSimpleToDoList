///<reference types ="cypress"/>
import task from '../pageObjects/task'

describe('to-do-completeTask', () => {

    const Task = new task()

    let TC0005;

    before(() => {
        cy.fixture('task.json').then(function (toDoJson) {
            this.toDoJson = toDoJson
            TC0005 = this.toDoJson.TC0005
        })
    })

    it('TC0005 Verify user can able to mark a task as complete by clicking on the task', () => {

        cy.visit(Cypress.env('url'))

        Task.getToDoListForm().should('be.visible')
        Task.getToDoListFormTitle().should('have.text', TC0005.title)
        Task.getTaskInput().type(TC0005.taskValue)
        Task.getTaskAddButton().click()
        Task.getAddedTask(TC0005.taskValue).should('not.have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
        Task.getAddedTask(TC0005.taskValue).click()

        //Assertion
        Task.getAddedTask(TC0005.taskValue).should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
        cy.screenshot({ capture: 'runner', overwrite: true })

    })
})