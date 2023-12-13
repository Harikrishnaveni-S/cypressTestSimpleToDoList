///<reference types="cypress"/>
import task from "../pageObjects/task";

describe('to-do-addTask', () => {

    const Task = new task();

    let TC0001;

    before(() => {

        cy.fixture('task.json').then(function (ToDoJson) {
            this.ToDoJson = ToDoJson
            TC0001 = this.ToDoJson.TC0001
        })
    })

    it('TC0001 Verify user can able to add a task', () => {

        cy.visit(Cypress.env('url'))

        Task.getToDoListForm().should('be.visible')
        Task.getToDoListFormTitle().should('have.text', TC0001.title)
        Task.getTaskInput().type(TC0001.taskValue)
        Task.getTaskAddButton().click()

        //Assertion
        Task.getAddedTask(TC0001.taskValue).should('exist')
        cy.screenshot({ capture: 'runner', overwrite: true })

    })


})