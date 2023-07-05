import isEmpty from "validator/lib/isEmpty"
import isEmail from "validator/lib/isEmail"
import isStrongPassword from "validator/lib/isStrongPassword"
import isAlphanumeric from "validator/lib/isAlphanumeric"
import isAlpha from "validator/lib/isAlpha"
import isLength from "validator/lib/isLength"

const ruleRequired = (v: string) => !isEmpty(v) || "Обязательное поле"

const ruleCorrectEmail = (v: string) => isEmail(v) || "Некорректный Email"

const ruleStrongPassword = (v: string) => isStrongPassword(v, {
	minLength: 6,
	minSymbols: 0,
}) || "Слабый пароль"

const ruleAlphanumeric = (v: string) =>
	isAlphanumeric(v, "ru-RU")
	|| isAlpha(v, "en-US")
	|| "Только буквы и цифры"

const ruleMinMax = (min = 0, max = 20) =>
	(v) => isLength(v, { min, max}) || `Введите от ${min} до ${max} символов`

export {
	ruleRequired,
	ruleCorrectEmail,
	ruleStrongPassword,
	ruleAlphanumeric,
	ruleMinMax,
}
