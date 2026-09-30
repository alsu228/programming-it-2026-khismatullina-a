// массив проектов
let projects = []

// проверка проекта
const validateProject = (data) => {

    if (typeof data.title !== "string" || data.title.length < 3) {
        console.log("Ошибка: название должно быть минимум 3 символа")
        return false
    }

    data.price = Number(data.price)

    if (isNaN(data.price) || data.price < 0) {
        console.log("Ошибка: цена должна быть числом")
        return false
    }

    if (typeof data.skills === "string") {
        data.skills = data.skills.split(",").map(s => s.trim())
    }

    return true
}

// добавление проекта
function addProject(project) {
    projects.push(project)
}

// вывод проектов
function renderProjects() {
    console.table(projects)
}

if (validateProject(project1)) {
    addProject(project1)
}

renderProjects()