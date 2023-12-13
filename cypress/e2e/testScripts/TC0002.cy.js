///<reference types ="cypress"/>
import task from '../pageObjects/task'

describe('to-do-addTask', () => {

    const Task = new task()

    let TC0002;

    before(() => {
        cy.fixture('task.json').then(function (toDoJson) {
            this.toDoJson = toDoJson
            TC0002 = this.toDoJson.TC0002
        })
    })

    it('TC0002 Verify alert is shown when user try to add empty task', () => {

        cy.visit(Cypress.env('url'))

        Task.getToDoListForm().should('be.visible')
        Task.getToDoListFormTitle().should('have.text', TC0002.title)
        Task.getTaskInput().focus()
        Task.getTaskAddButton().click()

        //Assertion
        cy.on('window:alert', (txt) => {
            expect(txt).to.equal(TC0002.alertMessage)
        })
        cy.screenshot({ capture: 'runner', overwrite: true })

    })
})