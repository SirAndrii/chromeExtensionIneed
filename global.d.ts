//escape() was introduced in ESC2019 to backslash special symbols in RegExpressions
interface RegExpConstructor {
    escape(text: string): string;
}