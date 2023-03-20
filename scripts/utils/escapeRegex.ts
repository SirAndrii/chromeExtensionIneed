function escapeRegExp(str: string ) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function backslashSpec(words:string[]) {
    return  words.map(word => escapeRegExp(word)).join('|')


}