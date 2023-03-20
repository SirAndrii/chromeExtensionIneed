import highlightYears from "../scripts/utils/highlightYears";
describe('highlightYears() tes', () => {
    it('should return the original text if no matches are found', () => {
        const textNoYears = "Bachelor’s degree in an IT field"
        const highlightedText = highlightYears(textNoYears, 5);

        expect(highlightedText).toBe(textNoYears);
    });

    it('should highlight line with one matche of years is 5', () => {
        const textOneYear = 'there is only 5 years of experience'
        const highlightedText = highlightYears(textOneYear, 3);
        const regex = /<span[^>]*>5 years<\/span>/;

        expect(highlightedText).toMatch(regex);
    });

    it('should highlight multi matches with 5 or more years of experience', () => {
        const text = 'I have 3 years of experience in web development, 8+ years of experience in SEO, and 5 years of experience in customer service.';
        const expectedText = `I have 3 years of experience in web development, <span style="background: red">8+ years</span> of experience in SEO, and <span style="background: red">5 years</span> of experience in customer service.`;
        const highlightedText = highlightYears(text, 5);
        expect(highlightedText).toBe(expectedText);
    });

    it('should not highlight line with matche less then num', () => {
        const textOneYear = 'there is only 5 years of experience'
        const highlightedText = highlightYears(textOneYear, 7);
        const regex = /<span[^>]*>5 years<\/span>/;

        expect(highlightedText).not.toMatch(regex);
    });

    it('should handle edge case with double digits', () => {
        const edgeText = '10-25 years of experience in web development, 8+ years of experience in SEO, and 5 years'
        const expectedText = '10-<span style="background: red">25 years</span> of experience in web development, <span style="background: red">8+ years</span> of experience in SEO, and 5 years';
        const highlightedText = highlightYears(edgeText, 5);

        expect(highlightedText).toBe(expectedText);
    });

});