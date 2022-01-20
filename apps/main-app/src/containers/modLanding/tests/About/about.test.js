import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';

import About from "../../About";

describe("About Section", () => {
    beforeEach(() => {
        render(<About 
            htmlContent="Hello"
            modVisitButtonText="Button Text"
            linkToMod="www.google.com"
            sectionStyle="aboutStyle"
            titleBarStyle="" />)
    });

    it("should have 3 children in inside container", () => {
        const inner = screen.getByTestId("about-inner-container");
        expect(inner.children.length).toEqual(3);
    });

    it("should provide a mod link with the mod name and URL", () => {
        const linkp = screen.getByTestId("link-to-mod-parent")

        expect(linkp.firstChild).toHaveAttribute("href", "www.google.com");
        expect(linkp.firstChild).toHaveTextContent("Visit Button Text");
    });

    it("should have html content specified by htmlContent", () => {
        const content = screen.getByTestId("html-content");
        expect(content).toHaveTextContent("Hello");
    })

})