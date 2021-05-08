const bodyStyles = getComputedStyle(document.documentElement)
const backgroundColor = bodyStyles.getPropertyValue('--background-color')
const textColorLight = bodyStyles.getPropertyValue('--text-color-light')
const textColorHeavy = bodyStyles.getPropertyValue('--text-color-heavy')
const errorColor = bodyStyles.getPropertyValue('--error-color')
const answerColor = bodyStyles.getPropertyValue('--answer-color')
const inputColor = bodyStyles.getPropertyValue('--input-color')
const inputColorClicked = bodyStyles.getPropertyValue('--input-color-clicked')
const btnColor = bodyStyles.getPropertyValue('--btn-color')

const themeBtns = document.querySelectorAll('[name="themes"')



console.log(themeBtns)