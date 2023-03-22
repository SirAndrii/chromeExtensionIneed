import highlightYears from "../scripts/utils/highlightYears";
describe('highlightYears() tes', () => {
    it('should return the original text if no matches are found', () => {
        const textNoYears = "Bachelor’s degree in an IT field"
        const highlightedText = highlightYears(textNoYears, 5, 'red');

        expect(highlightedText).toBe(textNoYears);
    });

    it('should highlight line with one matche of years is 5', () => {
        const textOneYear = 'there is only 5 years of experience'
        const expectedText = 'there is only @@@lt;span data-highlight="true" style="background: red"@@@gt;5 years@@@lt;/span@@@gt; of experience'
        const highlightedText = highlightYears(textOneYear, 3, 'red');

        expect(highlightedText).toBe(expectedText);
    });

    it('should highlight multi matches with 5 or more years of experience', () => {
        const text = 'I have 3 years of experience in web development, 8+ years of experience in SEO, and 5 years of experience in customer service.';
        const expectedText = `I have 3 years of experience in web development, @@@lt;span data-highlight="true" style="background: red"@@@gt;8+ years@@@lt;/span@@@gt; of experience in SEO, and @@@lt;span data-highlight="true" style="background: red"@@@gt;5 years@@@lt;/span@@@gt; of experience in customer service.`;
        const highlightedText = highlightYears(text, 5,'red');
        expect(highlightedText).toBe(expectedText);
    });

    it('should not highlight line with matche less then num', () => {
        const textOneYear = 'there is only 5 years of experience'
        const highlightedText = highlightYears(textOneYear, 7,'red');

        expect(highlightedText).toBe(textOneYear);
    });

    it.skip('should handle edge case with double digits', () => {
        const edgeText = '10-25 years of experience in web development, 8+ years of experience in SEO, and 5 years'
        const expectedText = '10-@@@lt;span data-highlight="true" style="background: red"@@@gt;25 years@@@lt;/span@@@gt; of experience in web development, @@@lt;span data-highlight="true" style="background: red"@@@gt;8+ years@@@lt;/span@@@gt; of experience in SEO, and 5 years';
        const highlightedText = highlightYears(edgeText, 5,'red');

        expect(highlightedText).toBe(expectedText);
    });

});