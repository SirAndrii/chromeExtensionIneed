export default function highlightYears(text: string, num: number, color: string = 'red'): string {
    const regex = /\d+\+? years/gi;
    const match: RegExpMatchArray | null = text.match(regex)

    if (match) {
        const matchNum = [...new Set(match)].filter(item => parseInt(item) >= num)

        if (matchNum.length > 0) {
            matchNum.forEach(match => {
                text = text.replace(match, `@@@lt;span data-highlight="true" style="background: ${color}"@@@gt;${match}@@@lt;/span@@@gt;`)
            })
        }
    }

    return text;
}
