const userInput = document.querySelector('input')
const btn = document.querySelector('button')
const error = document.querySelector('#error')

const errorMsgs = [
    'Input field is empty!',
    'An error occured while solving your equation. Cause of error: invalid symbol(s) inputed -',
    'An error occured while solving your equation. Cause of error: input is missing either a power denotion or a trailing 0.',
    'An error occured while solving your equation. Cause of error: invalid syntax.',
    'An error occured while solving your equation. Cause of error: multiple variables inputed.',
    'An error occured while solving your equation. Cause of error: no variable inputed.',
    'The equation has no real solutions.'
]

const answerMsg = 'The roots of the equation are:'
const answer = document.querySelector('#answer')
let variable
let quadraticState
let equationParts
let firstPart
let secondPart
let lastPart
let firstNegativeState
let secondOperator
let thirdOperator 
let coefficientA
let coefficientB
let coefficientC
let roots
let hasVariable
let leftHandSide
let rightHandSide
let twoTermSolution
let prohibitedRegEx = /[^a-zA-Z0-9+=-\s\.]+/ // matches every character that is NOT a member of the group in the square brackets
let coefficientRegex = /\d+.*d*[^a-z]/i
let squareRegex = /(?<=[a-z])2/ // matches the number 2 only if it is preceded by a letter (this is used to test for the power feature)
let numbersBeforeRegex = /\d*(?=[a-z])/i // matches all numbers that precede a letter
let numbersAfterRegex = /[a-z](?!\d)/i // matches all letters only if it is not followed by a number (makes sure the 'b' term has no number following it)
let variablesRegex = /[a-z]{1}/ig // matches all letters that appear in the input
let numbersRegex = /^\d+/ig

const checkQuadraticState = function () {

    firstPart = equationParts[0]
    lastPart = equationParts[equationParts.length - 1]

    if ((squareRegex.test(firstPart) === true) && (lastPart === '0')) { // if the first part of the equation has the number '2' as its last character and the last term of the equation is '0'
        quadraticState = true
    }

    if ((squareRegex.test(firstPart) === false) || (lastPart !== '0')) {// if the first part of the equation DOES NOT have the number '2' as its last character or the last term of the equation is NOT '0'
        quadraticState = false
    }

    return quadraticState
}

const checkVariableInB = function () {
    secondPart = equationParts[2]
    let variablesRegex = /(?<=\d)[a-z]/ // matches all letters that follow a digit - will always return a singular item

    if (variablesRegex.test(secondPart) === true) { // if there is a variable in the second term
        hasVariable = true
    }

    if (variablesRegex.test(secondPart) === false) { // if there is NO variable in the second term
        hasVariable = false
    }

    // console.log(hasVariable)

    return hasVariable
}

const resolveCoefficientA = function () {
    firstPart = equationParts[0]
        
    firstNegativeState = firstPart.indexOf('-')

    if (firstPart.length === 2) { // if the length of the first part is two, let the coefficient = 1
        coefficientA = 1
    }

/*     if (firstPart.length === 3) {

        if (firstNegativeState === 0) {
            coefficientA = -1
        }

        if (firstNegativeState === -1) {
            coefficientA = 1
        }
    } */

    if (firstPart.length > 2) {

        if (firstNegativeState === 0) {
            // if the length of the  first part is more than two and it HAS a negative sign
            coefficientA = -parseFloat(firstPart.match(coefficientRegex))
        }

        if (firstNegativeState === -1) {
            // if the length of the  first part is more than two and it DOES NOT have a negative sign

            coefficientA = parseFloat(firstPart.match(coefficientRegex))
        }
    }

    // console.log(coefficientA)

    return coefficientA
}

const resolveCoefficientB = function (partIndex, operatorIndex) {
    secondPart = equationParts[partIndex]
    secondOperator = equationParts[operatorIndex]
    let secondTermValue = parseInt(secondPart.match(numbersBeforeRegex))


    if (numbersAfterRegex.test(secondPart) === true) {

        if (secondPart.length === 1) {

            if (secondOperator === '-') {
                coefficientB = -1
            }

            if (secondOperator === '+') {
                coefficientB = 1
            }

            if ((secondOperator !== '-') && (secondOperator !== '+')) {

                showError(3)

            }
        }

        if (secondPart.length > 1) {

            if (secondOperator === '-') {
                coefficientB = -secondTermValue
            }

            if (secondOperator === '+') {
                coefficientB = secondTermValue
            }

            if ((secondOperator !== '-') && (secondOperator !== '+')) {

                showError(3)

            }

        }

        return coefficientB
    }

    if (numbersAfterRegex.test(secondPart) === false) {

        showError(3)

    }
}

const resolveCoefficientC = function (partIndex, operatorIndex) {
    let alphabetRegex = /[^0-9]+/i
    thirdPart = equationParts[partIndex]
    thirdOperator = equationParts[operatorIndex]

    if (alphabetRegex.test(thirdPart) === false) {

        if (thirdOperator === '-') {
            coefficientC = -parseFloat(thirdPart)
        }

        if (thirdOperator === '+') {
            coefficientC = parseFloat(thirdPart)
        }

        if ((thirdOperator !== '+') && (thirdOperator !== '-')) {

            showError(3)

        }

        return coefficientC
    }

    if (alphabetRegex.test(thirdPart) === true) {
        error.classList.remove('hidden')
        error.textContent = errorMsgs[3]
        return
    }
}

const calculateRoots = function (a, b, c) {
    let discriminant = ((b * b) - (4 * a * c))
    console.log(discriminant)

    if (discriminant < 0) {

        showError(6)

    }

    if (discriminant > 0) {
        let squareRootValue = Math.sqrt(discriminant)
        let rootOne = ((-b + squareRootValue) / (2 * a)).toFixed(3)
        let rootTwo = ((-b - squareRootValue) / (2 * a)).toFixed(3)
        roots = [rootOne, rootTwo]

        return roots

    }
}

const calculateRootsWithVariable = function (a, b) {

    if (b % a !== 0) {
        rootOne = 0
        let rootTwoCalculation = function (a, b) {
            leftHandSide = a
            rightHandSide = b * -1
            rootTwo = (rightHandSide / leftHandSide).toFixed(3)
            
            return rootTwo
        }

        rootTwoCalculation(a, b)

        roots = [rootOne, rootTwo]
    }

    if (b % a === 0) {
        rootOne = 0
        rootTwo = (b / a) * -1

        roots = [rootOne, rootTwo]
    }

    return roots
}

const calculateRootsWithoutVariable = function (a, c) {
    leftHandSide = a
    rightHandSide = c * -1
    let firstOperation = rightHandSide / leftHandSide
    console.log(rightHandSide)

    if (firstOperation < 0) {
        showError(6)
    }

    if (firstOperation > 0) {
        let secondOperation = Math.sqrt(firstOperation).toFixed(3)
        rootOne = -secondOperation
        rootTwo = secondOperation
        roots = [rootOne, rootTwo]
    }

    return roots

}

const showRoots = function (firstRoot, secondRoot) {
    error.classList.remove('show')

    answer.classList.add('show')
    answer.textContent = `${answerMsg} ${firstRoot} and ${secondRoot}.`
    return

}

const showError = function (errorIndex, additional='') {
    answer.classList.remove('show')

    error.classList.add('show')
    error.textContent = `${errorMsgs[errorIndex]} ${additional}`
    return

}

btn.addEventListener('click', ev => {
    ev.preventDefault()
    answer.classList.remove('show')
    error.classList.remove('show')

    if (userInput.value === '') {
        showError(0)
    }

    if (userInput.value.length >= 1) {
        let prohibitedInputs = userInput.value.match(prohibitedRegEx) || []

        if (prohibitedInputs.length > 0) {
            let inputedSymbols = ''

            prohibitedInputs.forEach(input => {
                inputedSymbols += input
            });

            showError(1, inputedSymbols)
        }

        if (prohibitedInputs.length === 0) {

            let variablesArray = userInput.value.match(variablesRegex)

            let uniqueLetters = [...new Set(variablesArray)]

            if (uniqueLetters.length > 1) {
                showError(4)
            }

            if (uniqueLetters.length < 1) {
                showError(5)
            }

            if (uniqueLetters.length === 1) {
                equationParts = userInput.value.split(' ')

                if (equationParts.length === 7) {
                    checkQuadraticState()

                    if (quadraticState === false) {
                        showError(2)
                    }

                    if (quadraticState === true) {
                        resolveCoefficientA()
                        resolveCoefficientB(2, 1)
                        resolveCoefficientC(4, 3)
                    }

                    let a,b,c
                    a = coefficientA
                    b = coefficientB
                    c = coefficientC

                    calculateRoots(a, b, c)

                    console.log(roots)

                    showRoots(roots[0], roots[1])

                }

                if (equationParts.length === 5) {
                    checkQuadraticState()

                    if (quadraticState === false) {
                        showError(2)
                    }

                    if (quadraticState === true) {
                        resolveCoefficientA()
                        checkVariableInB()

                        if (hasVariable === false) {
                            resolveCoefficientC(2, 1)

                            let a,c
                            a = coefficientA
                            c = coefficientC

                            calculateRootsWithoutVariable(a, c)

                            showRoots(roots[0], roots[1])

                        }

                        if (hasVariable === true) {

                            resolveCoefficientB(2, 1)

                            let a,b
                            a = coefficientA
                            b = coefficientB

                            console.log(b)

                            if ((typeof(a) === 'undefined') || (typeof(b) === 'undefined')) {
                                showError(3)
                            }

                            if ((typeof(a) !== 'undefined') && (typeof(b) !== 'undefined')) {
                                calculateRootsWithVariable(a, b)
                                showRoots(roots[0], roots[1])
                            }

                        }
                    }
                }

                if ((equationParts.length !== 7) && (equationParts.length !== 5)) {

                    showError(3)
                }
            }

        }
    }
})