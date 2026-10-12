export const countryCodes = [
    '+994'
]

export function splitPhone(phoneNumber: string) {
    const code = countryCodes.find(code => phoneNumber.includes(code)) ?? countryCodes[0]
    return [code, phoneNumber.replace(code, '')]
}