import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';

import VisitMod from "../../VisitMod";

describe("VisitMod Section", () => {
    beforeEach(() => {
        render(<VisitMod 
            modVisitButtonText="Button Text"
            linkToMod="www.google.com"
            sectionStyle="aboutStyle"
            titleBarStyle="" />)
    });

    it("should have 1 children in inside container", () => {
        const inner = screen.getByTestId("visit_mod-inner-container");
        expect(inner.children.length).toEqual(1);
    });

    it("should provide a mod link with the mod name and URL", () => {
        const linkp = screen.getByTestId("visit_mod_header")

        expect(linkp.firstChild).toHaveAttribute("href", "www.google.com");
        expect(linkp.firstChild).toHaveTextContent("Visit Button Text");
    });
})
