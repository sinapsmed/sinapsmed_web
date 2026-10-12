export function formDataToObject(formData: FormData): {[key: string]: any} {
    const keysToExclude = ['$ACTION_REF_1', '$ACTION_1:0', '$ACTION_1:1', '$ACTION_KEY'];

    return Array.from(formData).reduce((obj, [key, value]) => (
        !keysToExclude.includes(key) ? { ...obj, [key]: value }: obj
    ), {})
}