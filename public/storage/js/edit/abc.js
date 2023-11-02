// VARIABLES AND FUNCTIONS
let empty_jpg = `{{ asset('storage/icons/empty.jpg') }}`

function check_task()
{

    let parent
    let count = 0

    for (let i = 0; i < document.querySelectorAll('.abc').length; i++) {

        parent = document.querySelectorAll('.abc')[i]
        // MAIN DIVS
        let text = parent.querySelector('.add_text')
        let answers = parent.querySelector('.abc_div')
        let choose = parent.querySelector('.abc_choose')
        let image = parent.querySelector('.abc_image')
        // https://clubrunner.blob.core.windows.net/00000008038/Images/Action-required.png

        // HINTS
        let text_hint = text.parentElement.children[1]
        let answers_hint = answers.parentElement.children[1]
        let choose_hint = choose.parentElement.children[1]
        let image_hint = image.querySelector('p')

        // START CHECKING IF THERE ISSET DEFAULT ELEMENTS
        if(answers.children.length > 2 && text.children[0].innerText !== 'Додати запитання')
        {

            text_hint.classList.remove('text-muted')
            text_hint.classList.add('text-danger')
            text_hint.classList.add('text-decoration-underline')

            // CHECK IF TEXT`S BEEN CHANGED
            if(text.children[0].innerText == 'Нажміть щоб відредагувати')
            {

                text_hint.innerText = 'Змініть запитання'

            } else
            {

                text_hint.innerText = ''

                // CHECK IF TEXT`S LENGTH IS NOT NULL
                if(text.children[0].innerText.length < 6)
                {

                    text_hint.innerText = 'Запитання не може бути таким коротким'

                } else
                {

                    text_hint.innerText = ''

                    // CHECK IF THERE IS A RIGHT ANSWER
                    let is = false
                    for (let i = 0; i < answers.children.length; i++) {

                        if(answers.children[i].classList.contains('right_one'))
                        {
                            is = true
                        }

                    }

                    if(!is)
                    {

                        choose_hint.classList.remove('text-muted')
                        choose_hint.classList.add('text-danger')
                        choose_hint.classList.add('text-decoration-underline')
                        choose_hint.innerHTML = 'Ви повинні вибрати правильну відповідь'

                    } else
                    {

                        choose_hint.classList.remove('text-danger')
                        choose_hint.classList.remove('text-decoration-underline')
                        choose_hint.classList.add('text-muted')
                        choose_hint.innerHTML = ''

                        if(image.children.length !== 1)
                        {

                            if(image.children[2].style.backgroundImage == 'url("https://english/storage/icons/empty.jpg")')
                            {

                                image_hint.innerText = 'Ви повинні вписати працюючий URL-адрес картинки'

                            } else
                            {

                                if(document.querySelector('.name_hint').innerText == `Нажміть щоб змінити назву завдання`)
                                {

                                    count = count + 1

                                }

                            }

                        } else
                        {

                            if(document.querySelector('.name_hint').innerText == `Нажміть щоб змінити назву завдання`)
                            {

                                count = count + 1

                            }

                        }


                    }

                }

            }

        }

    }

    if(count == document.querySelectorAll('.abc').length)
    {

        document.querySelector('.task_update').removeAttribute('hidden')

    } else
    {

        document.querySelector('.task_update').setAttribute('hidden', '')

    }

}

function abc_image_edit_f()
{

    let img = this.parentElement.querySelector('.img')
    let test_img = this.parentElement.querySelector('img')
    let hint = this.parentElement.querySelector('p')
    let dis = this

    if(this.value.length >= 10)
    {

        if(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(this.value))
        {

            test_img.src = dis.value
            test_img.onload = function () {

                dis.setAttribute('status', 1)
                img.style.cssText = `width: 450px; height: 250px; background-image: url('${dis.value}'); background-position: center center; background-size: cover; background-repeat: no-repeat;`
                check_task()
                hint.innerText = ''

            }
            test_img.onerror = function () {

                img.style.cssText = `width: 450px; height: 250px; background-image: url('${empty_jpg}'); background-position: center center; background-size: cover; background-repeat: no-repeat;`
                dis.value = ''
                dis.setAttribute('placeholder', 'Вставте поправний URL-адрес')
                dis.setAttribute('status', 2)
                check_task()

            }

        }

    }

}

function add_image_f()
{

    this.children[0].remove()
    this.style.backgroundImage = ''
    this.style.border = ''

    let add_image_input = document.createElement('input')
    add_image_input.classList.add('form-control')
    add_image_input.classList.add('text-center')
    add_image_input.style.cssText = 'font-size: 20px; padding: 10px 20px;'
    add_image_input.setAttribute('placeholder', 'Вставте URL-адрес картинки')

    this.appendChild(add_image_input)

    let add_image_hint = document.createElement('p')
    add_image_hint.classList.add('small')
    add_image_hint.classList.add('text-danger')
    add_image_hint.classList.add('p-0')
    add_image_hint.classList.add('m-0')
    add_image_hint.setAttribute('hidden', '')

    this.appendChild(add_image_hint)

    add_image_input.focus()

    let add_image_image = document.createElement('div')
    add_image_image.classList.add('img')
    add_image_image.style.cssText = `width: 450px; height: 250px; background-image: url("${empty_jpg}"); background-position: center; background-size: cover; background-repeat: no-repeat;`

    this.appendChild(add_image_image)

    let add_image_test = document.createElement('img')
    add_image_test.style.cssText = 'display: none;'

    this.appendChild(add_image_test)

    this.removeEventListener('click', add_image_f)

    add_image_input.addEventListener('keyup', abc_image_edit_f)

    check_task()

}

// CREATING NEW EDITABLE AND DELETABLE ABC ANSWER ON CLICK
function add_answer_f()
{

    // LIMIT TO 6 ANSWERS
    if(this.parentElement.children.length == 6)
    {

        this.setAttribute('hidden', '')

    }

    // ADDING OUR NEW DIV
    let new_div = document.createElement('div')
    new_div.style.cssText = 'color: black; border: 1px solid black; border-radius: 5px; width: 32%; height: 50px; overflow: auto;'
    new_div.setAttribute('contenteditable', 'true')
    new_div.classList.add('abc_answer')
    let p_inside_div = document.createElement('p')
    p_inside_div.style.cssText = `font-size: 20px; padding-top: 10px; height: 30px;`
    new_div.appendChild(p_inside_div)
    this.parentElement.insertBefore(new_div, this)

    check_existance(this.parentElement, 'add')

    if(this.parentElement.children.length < 3)
    {

        this.parentElement.parentElement.children[1].classList.remove('text-muted')
        this.parentElement.parentElement.children[1].classList.add('text-danger')
        this.parentElement.parentElement.children[1].classList.add('text-decoration-underline')
        this.parentElement.parentElement.children[1].innerHTML = 'В завданні повинно бути принаймі 2 відповіді'

    }

    check_task()

    // ADDING FUNCTIONS FOR ALL ADDED ANSWERS
    abc_answers = document.querySelectorAll('.abc_answer')
    abc_answers.forEach(answer => {

        answer.addEventListener('mousedown', start_deleting)
        answer.addEventListener('mouseup', stop_deleting)
        answer.addEventListener('keydown', function (e) {
            if (e.keyCode == 8 || e.keyCode == 46)
            {
                if (answer.children.length === 1) { // last inner element
                    if (answer.children[0].innerText < 1) { // last element is empty
                        e.preventDefault()
                    }
                }
            }
        })

    });

}

// DELETING ELEMENT

// OUR TIMER
let timer
let starting_value
let deletings
let deleting1
let deleting2
let deleting3
let deleting4
let deleting5

function start_deleting()
{

    this.style.animation = 'delete 2s 1'

    starting_value = this.children[0].innerText

    this.children[0].style.color = 'black'

    deletings = window.setTimeout(() => {

        deleting1 = window.setTimeout(() => {this.children[0].innerHTML = `Deleting.`}, 0);
        deleting2 = window.setTimeout(() => {this.children[0].innerHTML = `Deleting..`}, 400);
        deleting3 = window.setTimeout(() => {this.children[0].innerHTML = `Deleting...`}, 800);
        deleting4 = window.setTimeout(() => {this.children[0].innerHTML = `Deleting.`}, 1200);
        deleting5 = window.setTimeout(() => {this.children[0].innerHTML = `Deleting..`}, 1300);

    }, 400)

    timer = window.setTimeout(() => {

        if(this.parentElement.children.length == 7)
        {

            this.parentElement.children[6].removeAttribute('hidden')

        }

        // TEMPORARY DADDY
        let tda = this.parentElement.parentElement.parentElement

        // CHECK EXISTANCE AFTER DELETING
        check_existance(this.parentElement, 'del')

        if(this.parentElement.children.length < 4)
        {

            this.parentElement.parentElement.children[1].classList.remove('text-muted')
            this.parentElement.parentElement.children[1].classList.add('text-danger')
            this.parentElement.parentElement.children[1].classList.add('text-decoration-underline')
            this.parentElement.parentElement.children[1].innerHTML = 'В завданні повинно бути принаймі 2 відповіді'

        }

        this.remove()

        check_task()

    }, 2000);

}

function stop_deleting()
{

    this.style.animation = ''

    if(timer)
    {

        window.clearTimeout(timer)

    }
    if(deletings || deleting1 || deleting2 || deleting3 || deleting4 || deleting5)
    {
        window.clearTimeout(deletings)
        window.clearTimeout(deleting1)
        window.clearTimeout(deleting2)
        window.clearTimeout(deleting3)
        window.clearTimeout(deleting4)
        window.clearTimeout(deleting5)

        this.children[0].style.color = 'black'

        if(this.children[0].innerHTML !== starting_value)
        {

            this.children[0].innerHTML = starting_value

            if(starting_value.length > 0)
            {

                let range = document.createRange()
                let sel = window.getSelection()
                range.setStart(this.children[0], 1)
                range.collapse(true)

                sel.removeAllRanges()
                sel.addRange(range)

            }

        }

    }

}

// ABC CHOOSE

function abc_choose_f()
{
    // SHOWING HINT
    let abc_choose = this
    let abc_choose_hint = this.parentElement.children[1]
    abc_choose_hint.innerHTML = 'нажміть на правильну відповідь'

    // CHECKING IF TEXT IS DANGER
    if(abc_choose_hint.classList.contains('text-danger'))
    {

        abc_choose_hint.classList.remove('text-danger')
        abc_choose_hint.classList.remove('text-decoration-underline')
        abc_choose_hint.classList.add('text-muted')

    }

    // GIVING ALL ANSWERS BORDER AND CLICK EVENT LISTENER
    let abc_task = this.parentElement.parentElement
    let abc_task_answers = abc_task.querySelector('.abc_div').children

    for (let i = 0; i < abc_task_answers.length; i++) {

        if(abc_task_answers[i].classList.contains('abc_answer'))
        {

            abc_task_answers[i].style.border = '1px solid green'
            abc_task_answers[i].style.cursor = 'pointer'
            abc_task_answers[i].removeAttribute('contenteditable')

            abc_task_answers[i].addEventListener('click', make_right)

        }

    }
}

// MAKE AN ANSWER RIGHT ONE
function make_right()
{

    answers = this.parentElement.children

    for (let a = 0; a < answers.length; a++) {

        if(answers[a].classList.contains('abc_answer'))
        {

            answers[a].style.border = '1px solid black'
            answers[a].style.cursor = ''
            answers[a].setAttribute('contenteditable', 'true')

        }

        if(answers[a].classList.contains('right_one'))
        {

            answers[a].classList.remove('right_one')

        }

        answers[a].removeEventListener('click', make_right)

    }

        this.classList.add('right_one')
        this.style.border = '1px solid green'

        // CHANGING CHOOSE BUTTON`S TEXT
        this.parentElement.parentElement.parentElement.querySelector('.abc_choose').parentElement.children[1].innerHTML = ''

        if(this.parentElement.parentElement.parentElement.querySelector('.abc_choose').children[0].innerText !== 'Змінити правильну відподь')
        {

            this.parentElement.parentElement.parentElement.querySelector('.abc_choose').children[0].innerText = 'Змінити правильну відподь'

        }

        check_task()

}

// CHECK IF THERE IS THE ELEMENTS WHICH WE CAN CHOOSE
function check_existance(parent, type)
{
    if(type == 'add')
    {

        if(parent.children.length >= 3)
        {

            parent.parentElement.parentElement.querySelector('.abc_choose').removeAttribute('hidden')

        } else
        {

            parent.parentElement.parentElement.querySelector('.abc_choose').setAttribute('hidden', '')

        }

        if(parent.children.length >= 2)
        {

            if(parent.parentElement.children[1].classList.contains('text-danger'))
            {

                parent.parentElement.children[1].classList.remove('text-danger')
                parent.parentElement.children[1].classList.remove('text-decoration-underline')
                parent.parentElement.children[1].classList.add('text-muted')

            }

            parent.parentElement.children[1].innerHTML = 'Щоб видалити одну з відповідей - наведіться на неї і зажміть мишку'

        } else
        {

            parent.parentElement.children[1].innerHTML = ''

        }

    } else
    {

        if(parent.children.length >= 4)
        {

            parent.parentElement.parentElement.querySelector('.abc_choose').removeAttribute('hidden')

        } else
        {

            parent.parentElement.parentElement.querySelector('.abc_choose').setAttribute('hidden', '')

        }

        if(parent.children.length >= 3)
        {

            if(parent.parentElement.children[1].classList.contains('text-danger'))
            {

                parent.parentElement.children[1].classList.remove('text-danger')
                parent.parentElement.children[1].classList.remove('text-decoration-underline')
                parent.parentElement.children[1].classList.add('text-muted')

            }

            parent.parentElement.children[1].innerHTML = 'Щоб видалити одну з відповідей - наведіться на неї і зажміть мишку'

        } else
        {

            parent.parentElement.children[1].innerHTML = ''

        }

    }

}

// SAVING CHANGES
let task_update = document.querySelector('.task_update')

task_update.addEventListener('click', function () {

    // CREATING TASK BODY
    let abcs = document.querySelectorAll('.abc')
    let body = ''

    abcs.forEach(adiv => {

        // START OF MAIN DIV
        body += `<div class="abc_task">`

        // ADDING QUESTION
        let txt = adiv.querySelector('.add_text').innerText
        body += `<h3 class="text-center">${txt}</h3>`

        if(adiv.querySelector('.abc_image').children.length !== 1)
        {

            let immg = adiv.querySelector('.abc_image').querySelector('input').value
            body += `<div style="width: 550px; height: 320px; margin: 15px auto; background-image: url('${immg}'); background-position: center; background-size: cover; background-repeat: no-repeat;"></div>`

        }

        // ADDING ANSWERS
        body += `<div class="abc_answers">`
        let answers = adiv.querySelectorAll('.abc_answer')
        let abcdef = ['A', 'B', 'C', 'D', 'E', 'F']

        for (let i = 0; i < answers.length; i++) {

            if(answers[i].classList.contains('right_one'))
            {

                body += `
                    <div class="abc_ans right">

                        <div style="text-align: center; display: table; width: 60px; border-right: 1px solid black;">
                            <h2>${abcdef[i]}</h2>
                        </div>

                        <div style="display: table;">
                            <h4>${answers[i].innerText}</h4>
                        </div>

                    </div>
                `

            } else
            {

                body += `
                    <div class="abc_ans">

                        <div style="text-align: center; display: table; width: 60px; border-right: 1px solid black;">
                            <h2>${abcdef[i]}</h2>
                        </div>

                        <div style="display: table;">
                            <h4>${answers[i].innerText}</h4>
                        </div>

                    </div>
                `

            }

        }

        // FINISHING ANSWERS
        body += `</div>`

        // FINISHING TASK
        body += `</div>`

        let task_body = document.querySelector('.task_body')
        task_body.value = body
        submitik = document.createElement('button')
        submitik.setAttribute('type', 'submit')
        document.querySelector('.hidden').appendChild(submitik)
        submitik.click()

    });

})

// EDITING TASK NAME
// EDITING TASK NAME
let name = document.querySelector('.name')
let name_hint = document.querySelector('.name_hint')
let task_name = document.querySelector('.task_name')
let editing = document.querySelector('.editing')

name.addEventListener('keyup', function () {

    if(name.innerText.length > 2)
    {

        task_name.value = name.innerText
        name_hint.classList.remove('text-danger')
        name_hint.classList.add('text-muted')
        name_hint.innerText = `Нажміть щоб змінити назву завдання`

    } else
    {

        name_hint.classList.remove('text-muted')
        name_hint.classList.add('text-danger')
        name_hint.innerText = `Назва завдання не може бути такою короткою`

    }

    check_task()

})

// EDITING TASK

let tasks = document.querySelectorAll('.abc_task')

tasks.forEach(parent => {

    let declared_task_question = parent.children[0]
    let declared_task_image = parent.children[1].style.backgroundImage
    let task_answers = parent.querySelector('.abc_answers').children

    // TASK DIV
    let task = document.createElement('div')
    task.classList.add('abc')
    task.classList.add('mt-5')
    task.classList.add('mx-auto')
    task.style.cssText = `padding-bottom: 50px; width: 80%; background-color: white;`

    editing.appendChild(task)

    // ADDING QUESTION WITH EDITING
    window.setTimeout(() => {

        // TASK QUESTION PARENT DIV
        let task_question_parent = document.createElement('div')
        task_question_parent.style.cssText = `padding-top: 20px;`

        task.appendChild(task_question_parent)

        // TASK QUESTION
        let task_question = document.createElement('div')
        task_question.classList.add('add_text')
        task_question.setAttribute('role', 'button')
        task_question.setAttribute('contenteditable', 'true')
        task_question.style.cssText = `max-width: 80%; display: table; margin: 0 auto; background-color: white; border: 1px solid black; border-radius: 10px; color: black;`

        task_question_parent.appendChild(task_question)

        // TASK QUESTIONS P
        let task_question_p = document.createElement('p')
        task_question_p.style.cssText = `padding: 10px 20px; display: table-cell; vertical-align: middle; user-select: none; position: relative; text-align: center; font-size: 20px;`
        task_question_p.innerText = declared_task_question.innerText

        task_question.appendChild(task_question_p)

        // TASK QUESTION HINT
        let task_question_hint = document.createElement('p')
        task_question_hint.classList.add('small')
        task_question_hint.classList.add('text-muted')
        task_question_hint.innerText = `змініть запитання`

        task_question_parent.appendChild(task_question_hint)

        // ADDING EVENTLISTENER TO INPUT CHECKING VALUE
        task_question.addEventListener('keyup', function () {

            check_task()

        })

        task_question.addEventListener('keydown', function (e) {
        if (e.keyCode == 8 || e.keyCode == 46)
        {
            if (task_question.children.length === 1) { // last inner element
                if (task_question.children[0].innerText < 1) { // last element is empty
                    e.preventDefault()
                }
            }
        }
        })

    }, 0);

    // ADDING IMAGE IF ISSET
    window.setTimeout(() => {

        if(parent.children.length == 3)
        {

            // PARENT IMAGE DIV
            let task_image_parent = document.createElement('div')
            task_image_parent.classList.add('abc_image')
            task_image_parent.setAttribute('role', 'button')
            task_image_parent.style.cssText = `display: table; margin: 30px auto 20px; border-radius: 10px; color: black;`

            task.appendChild(task_image_parent)

            // TASK IMAGE INPUT
            let task_image_input = document.createElement('input')
            task_image_input.classList.add('form-control')
            task_image_input.classList.add('text-center')
            task_image_input.style.cssText = `font-size: 20px; padding: 10px 20px;`
            task_image_input.setAttribute('placeholder', 'Вставте URL-адрес картинки')
            task_image_input.value = declared_task_image.slice(5, declared_task_image.length-2)

            task_image_parent.appendChild(task_image_input)

            // TASK IMAGE HINT
            let task_image_hint = document.createElement('p')
            task_image_hint.classList.add('small')
            task_image_hint.classList.add('text-danger')
            task_image_hint.classList.add('p-0')
            task_image_hint.classList.add('m-0')
            task_image_hint.setAttribute('hidden', '')

            task_image_parent.appendChild(task_image_hint)

            // TASK IMAGE PREVIEW
            let task_image = document.createElement('div')
            task_image.classList.add('img')
            task_image.style.backgroundImage = declared_task_image
            task_image.style.backgroundPosition = 'center'
            task_image.style.backgroundSize = 'cover'
            task_image.style.backgroundRepeat = 'no-repeat'
            task_image.style.width = '450px'
            task_image.style.height = '250px'

            task_image_parent.appendChild(task_image)

            // TASK IMAGE TEST
            let task_image_test = document.createElement('img')
            task_image_test.style.cssText = 'display: none;'

            task_image_parent.appendChild(task_image_test)

            task_image_input.addEventListener('keyup', abc_image_edit_f)

        } else
        {

            // IMAGE PARENT DIV
            let task_image_parent = document.createElement('div')
            task_image_parent.classList.add('abc_image')
            task_image_parent.setAttribute('role', 'button')
            task_image_parent.style.cssText = `display: table; margin: 30px auto 20px; background-image: url('https://english/storage/icons/bg.jpg'); background-position: center center; background-size: cover; background-repeat: no-repeat; border: 1px solid black; border-radius: 10px; color: black;`

            task.appendChild(task_image_parent)

            // IMAGE P
            let task_image_p = document.createElement('p')
            task_image_p.style.cssText = `padding: 10px 20px; display: table-cell; vertical-align: middle; user-select: none; position: relative; text-align: center; font-size: 20px;`
            task_image_p.innerText = `Додати картинку`

            task_image_parent.appendChild(task_image_p)

            task_image_parent.addEventListener('click', add_image_f)

        }

    }, 0)

    // ADDING H2 TO TASK
    window.setTimeout(() => {

        let task_h2 = document.createElement('h2')
        task_h2.style.cssText = `color: black;`
        task_h2.innerText = `Додайте варіанти відповіді`

        task.appendChild(task_h2)

    }, 0)

    // ADDING ANSWERS
    window.setTimeout(() => {

        // PARENT OF PARENT
        let task_answers_parent_parent = document.createElement('div')

        task.appendChild(task_answers_parent_parent)

        // PARENT DIV
        let task_answers_parent = document.createElement('div')
        task_answers_parent.classList.add('abc_div')
        task_answers_parent.style.cssText = `width: 80%; margin: 0 auto; position: relative; display: flex; justify-content: center; gap: 10px 5px; flex-wrap: wrap;`

        task_answers_parent_parent.appendChild(task_answers_parent)

        // ANSWERS

        for (let i = 0; i < task_answers.length; i++) {

            if(task_answers[i].classList.contains('right'))
            {

                // ADDING NEW ANSWER DIV
                let new_answer = document.createElement('div')
                new_answer.setAttribute('contenteditable', 'true')
                new_answer.classList.add('abc_answer')
                new_answer.classList.add('right_one')
                new_answer.style.cssText = `color: black; border: 1px solid green; border-radius: 5px; width: 32%; height: 50px; overflow: auto;`

                task_answers_parent.appendChild(new_answer)

                // ANSWERS TEXT
                let new_answer_p = document.createElement('p')
                new_answer_p.style.cssText = `font-size: 20px; padding-top: 10px; height: 30px;`
                new_answer_p.innerText = task_answers[i].children[1].innerText

                new_answer.appendChild(new_answer_p)

            } else
            {

                // ADDING NEW ANSWER DIV
                let new_answer = document.createElement('div')
                new_answer.setAttribute('contenteditable', 'true')
                new_answer.classList.add('abc_answer')
                new_answer.style.cssText = `color: black; border: 1px solid black; border-radius: 5px; width: 32%; height: 50px; overflow: auto;`

                task_answers_parent.appendChild(new_answer)

                // ANSWERS TEXT
                let new_answer_p = document.createElement('p')
                new_answer_p.style.cssText = `font-size: 20px; padding-top: 10px; height: 30px;`
                new_answer_p.innerText = task_answers[i].children[1].innerText

                new_answer.appendChild(new_answer_p)

            }

        }

        // ADD ANSWERS BUTTON
        let task_answers_add = document.createElement('div')
        task_answers_add.classList.add('add_button')
        task_answers_add.classList.add('dashed')
        task_answers_add.setAttribute('role', 'button')
        task_answers_add.style.cssText = `color: black; width: 32%; height: 50px; border-radius: 5px; user-select: none;`

        task_answers_parent.appendChild(task_answers_add)

        // ADD BUTTONS P
        let task_answers_add_p = document.createElement('p')
        task_answers_add_p.style.cssText = `font-size: 20px; padding: 0px; margin: 9px 0px 0px;`
        task_answers_add_p.innerText = `+`

        task_answers_add.appendChild(task_answers_add_p)

        task_answers_add.addEventListener('click', add_answer_f)

        // ADDING FUNCTIONS FOR ALL ADDED ANSWERS
        abc_answers = document.querySelectorAll('.abc_answer')
        abc_answers.forEach(answer => {

            answer.addEventListener('mousedown', start_deleting)
            answer.addEventListener('mouseup', stop_deleting)
            answer.addEventListener('keydown', function (e) {
                if (e.keyCode == 8 || e.keyCode == 46)
                {
                    if (answer.children.length === 1) { // last inner element
                        if (answer.children[0].innerText < 1) { // last element is empty
                            e.preventDefault()
                        }
                    }
                }
            })

        });

        // ANSWERS HINT
        let task_answers_hint = document.createElement('p')
        task_answers_hint.classList.add('small')
        task_answers_hint.classList.add('text-muted')
        task_answers_hint.innerText = `Щоб видалити одну з відповідей - наведіться на неї і зажміть мишку`

        task_answers_parent_parent.appendChild(task_answers_hint)

    }, 0)

    // TASK CHOOSE
    window.setTimeout(() => {

        let task_choose_parent = document.createElement('div')

        task.appendChild(task_choose_parent)

        // TASK CHOOSE BUTTON
        let task_choose = document.createElement('div')
        task_choose.classList.add('abc_choose')
        task_choose.setAttribute('role', 'button')
        task_choose.style.cssText = `background-color: rgba(0, 255, 106, 0.52); display: table; margin: 30px auto 0px; border: 1px solid black; border-radius: 10px;`

        task_choose_parent.appendChild(task_choose)

        // TASK CHOOSE BUTTON P
        let task_choose_p = document.createElement('p')
        task_choose_p.style.cssText = `color: black; padding: 8px 20px; display: table-cell; vertical-align: middle; user-select: none; position: relative; text-align: center; font-size: 17px;`
        task_choose_p.innerText = `Змінити правильну відповідь`

        task_choose.appendChild(task_choose_p)

        // TASK CHOOSE HINT
        let task_choose_hint = document.createElement('p')
        task_choose_hint.classList.add('small')
        task_choose_hint.classList.add('text-muted')

        task_choose_parent.appendChild(task_choose_hint)

        task_choose.addEventListener('click', abc_choose_f)

    })

});