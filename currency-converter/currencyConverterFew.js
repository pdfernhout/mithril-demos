/* global m */
import "../vendor/mithril.js"
const h = m

const minPrecision = 0
const maxPrecision = 9

const conversionRatesToDollars = {
	dollars: 1.0,
	pounds: 0.69,
	euros: 0.9
}

const model = {
	amount: "100.00",
	currency: "dollars",
	precision: "2",
	currencyError: false,
	precisionError: false
}

function setPrecision(event) {
	let precision = event.target.value
	model.precision = "" + precision
	if (getPrecision() !== parseInt(model.precision)) {
		model.precisionError = true
	} else {
		model.precisionError = false
	}
}

function getPrecision() {
	const precision = parseInt(model.precision)
	if (isNaN(precision)) return 0
	if (precision < minPrecision) return minPrecision
	else if (precision > maxPrecision) return maxPrecision
	return precision
}
	
function setCurrencyValue(currency, event) {
	const newValue =  event.target.value
	model.currency = currency
	model.amount = newValue
	model.currencyError = isNaN(parseFloat(newValue))
}

const inputDollars = setCurrencyValue.bind(null, "dollars")
const inputEuros = setCurrencyValue.bind(null, "euros")
const inputPounds = setCurrencyValue.bind(null, "pounds")

function getCurrencyValue(currency) {
	if (model.currency === currency) { return model.amount; }
	
	// convert currency
	const amount = parseFloat(model.amount)
	const dollarAmount = amount * conversionRatesToDollars[model.currency]
	const result = dollarAmount / conversionRatesToDollars[currency]
	if (isNaN(result)) {
		return "???"
	}
	return "" + result.toFixed(getPrecision())
}

function errorClasses(errors) {
	const result = []
	if (errors.currencyError) result.push("currencyError")
	if (errors.precisionError) result.push("precisionError")
	return result.join(" ")
}

const CurrencyConverterFew = {
	view: () => h("div", { id: "currency-converter", class: errorClasses({ currencyError: model.currencyError, precisionError: model.precisionError }) }, [
		h("div", [
			"Precision: ",
			h("input", { value: "" + model.precision, oninput: setPrecision, type: "number" })
		]),
		h("hr"),
		h("div", [
			h("span.label", "US Dollars"),
			h("input", { value: getCurrencyValue("dollars"), oninput: inputDollars } )
		]),
		h("div", [
			h("span.label", "Euros"),
			h("input", { value: getCurrencyValue("euros"), oninput: inputEuros } )
		]),
		h("div", [
			h("span.label", "Pounds"),
			h("input", { value: getCurrencyValue("pounds"), oninput: inputPounds } )
		])
	])
}

m.mount(document.body, CurrencyConverterFew)
