let projects = []


// проверка проекта
const validateProject = (data) => {

    if (typeof data.title !== "string" || data.title.length < 3) {
        alert("Название минимум 3 символа")
        return false
    }

    data.price = Number(data.price)

    if (isNaN(data.price) || data.price < 0) {
        alert("Цена должна быть числом")
        return false
    }

    data.description = data.description.split(",").map(s => s.trim())

    return true
}


// добавление проекта
function addProject(project) {
    projects.push(project)
}


// вывод проектов на страницу
function renderProjects() {

    const container = document.getElementById("projects-list")

    container.innerHTML = ""

    projects.forEach(project => {

        const card = document.createElement("div")

        card.style.border = "1px solid #ccc"
        card.style.padding = "10px"
        card.style.margin = "10px 0"

        card.innerHTML = `
            <h3><strong>Название проекта:</strong>${project.title}</h3>
            <p><strong>Технологии:</strong>${project.skills}</p>
            <p><strong>Описание:</strong> ${project.description.join(", ")}</p>
            <p><strong>Цена:</strong> ${project.price} ₽</p>
            `

        container.appendChild(card)
    })
}


// обработка формы
const form = document.getElementById("add-project-form")

form.addEventListener("submit", function(event) {

    event.preventDefault()

    const title = document.getElementById("title").value
    const skills = document.getElementById("skills").value
    const description = document.getElementById("description").value
    const price = document.getElementById("price").value

    const project = {
        title,
        skills,
        description,
        price
    }

    if (validateProject(project)) {
        addProject(project)
        renderProjects()
        form.reset()
    }

})