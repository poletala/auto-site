const nameInput = document.querySelector('#name')
const phoneInput = document.querySelector('#phone')
const messageInput = document.querySelector('#message')
const theme = document.querySelector('#theme')
const form = document.querySelector('form')
const messageSentInfo = document.querySelector('.message-sent')
const inputElements = [nameInput, phoneInput, messageInput]
const nameRegex = /^[a-zA-Zа-яА]+$/;
const phoneRegex = /(^(?!\+.*\(.*\).*--.*$)(?!\+.*\(.*\).*-$)(([0-9]{0,12})?(\+[0-9]{11})?)$)|(^.*$)/; 

function validateForm() {
    const name = nameInput.value.trim()
    const phone = phoneInput.value.trim().replace(/[- )( +]/g,'')
    let errors = []
    inputElements.map(function(element) {

        const elementValue = element.value.trim()
        
        if (!elementValue) {
            element.classList.add('error-style')
            element.nextElementSibling.classList.remove('invalid')
            element.nextElementSibling.innerHTML = 'Поле не должно быть пустым'
            errors.push(element)
        }
        if (elementValue && element.name === 'name' && !nameRegex.test(name)) {
            element.classList.add('error-style')
            element.nextElementSibling.classList.remove('invalid')
            element.nextElementSibling.innerHTML = 'Имя может содержать только буквы'
            errors.push(element)
        }
        if (elementValue && element.name === 'phone' && (!phoneRegex.test(phone) || phone.length !== 11)) {
            element.classList.add('error-style')
            element.nextElementSibling.classList.remove('invalid')
            element.nextElementSibling.innerHTML = 'Неверный формат номера'
            errors.push(element)
        }
        return errors
    })

    if (errors.length) {
        return false
    } else {
        return true
    }
}

function onSubmit () {
    if (validateForm()) {
        let userMessage = {
            name: nameInput.value,
            phone: phoneInput.value,
            theme: theme.value,
            message: messageInput.value
        }
        console.log(userMessage)
        clearFields ()
        messageSentInfo.style.opacity = '1'
        setTimeout(function () {
            messageSentInfo.style.opacity = '0'
        }, 2000)
      
    } 
    
}

function deleteErrorsStyle(elem) {
    if (!elem.nextElementSibling.classList.contains('invalid')) {
        elem.nextElementSibling.classList.add('invalid')
        elem.nextElementSibling.innerHTML = ''
        elem.classList.remove('error-style')
    }
}

function clearFields () {
    nameInput.value = ''
    phoneInput.value = ''
    messageInput.value = ''
}

function handleFormSubmit(event) {
    event.preventDefault()
    onSubmit() 
  }
  
form.addEventListener('submit', handleFormSubmit)





