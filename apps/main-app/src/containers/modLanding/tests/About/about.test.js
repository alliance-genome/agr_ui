import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';

import About from "../../About";

describe("About Section", () => {
    beforeEach(() => {
        render(<About 
            htmlContent="Hello"
            sectionStyle="aboutStyle"
            titleBarStyle="" />)
    });

    it("should have 2 children in inside container", () => {
        const inner = screen.getByTestId("about-inner-container");
        expect(inner.children.length).toEqual(2);
    });

    it("should have html content specified by htmlContent", () => {
        const content = screen.getByTestId("html-content");
        expect(content).toHaveTextContent("Hello");
    })
})
