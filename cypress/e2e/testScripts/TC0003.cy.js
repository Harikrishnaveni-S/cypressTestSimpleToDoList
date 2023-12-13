///<reference types ="cypress"/>
import task from '../pageObjects/task'

describe('to-do-addTask', () => {

    const Task = new task()

    let TC0003;

    before(() => {
        cy.fixture('task.json').then(function (toDoJson) {
            this.toDoJson = toDoJson
            TC0003 = this.toDoJson.TC0003
        })
    })

    it('TC0003 Verify that the task list remains unchanged', () => {

        cy.visit(Cypress.env('url'))

        Task.getToDoListForm().should('be.visible')
        Task.getToDoListFormTitle().should('have.text', TC0003.title)
        Task.getTaskInput().type(TC0003.taskValue)
        Task.getTaskAddButton().click()
        Task.getlistItems().its('length').then((itemCount) => {
            let initialTaskCount = itemCount
            Task.getTaskInput().focus()
            Task.getTaskAddButton().click()

            //Assertion
            Task.getlistItems().should('have.length', initialTaskCount)
            cy.screenshot({ capture: 'runner', overwrite: true })
        })



    })
})