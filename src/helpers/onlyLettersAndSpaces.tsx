export const onlyLettersAndSpaces = (str: string) => {
    return /^[A-Za-z\s]*$/.test(str);
}