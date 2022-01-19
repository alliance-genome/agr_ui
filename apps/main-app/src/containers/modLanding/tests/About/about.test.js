import TestRenderer from 'react-test-renderer';

import About from "../../About";
import LinkToMOD from '../../LinkToMOD';

const renderer = TestRenderer.create(
    <About 
        htmlContent="Hello"
        modVisitButtonText="Button Text"
        linkToMod="www.google.com"
        sectionStyle="aboutStyle"
        titleBarStyle="" />)

const testInstance = renderer.root;

// testInstance.findByType(SubComponent).props.foo
console.log(testInstance.findByProps({className: "section aboutStyle"}).children.find(
    (x) => x.type == "div")
);

describe("About Section", () => {
    it("should provide a mod link with the mod name and URL", () => {
        expect(testInstance.findByType(LinkToMOD).props.linkAddress)
            .toEqual("www.google.com")
        expect(testInstance.findByType(LinkToMOD).props.modName)
            .toEqual("Button Text")
    });

    it("should have html content specified by htmlContent", () => {
        expect(testInstance.findByProps({className: "section aboutStyle"}).children.find(
            (child) => child.type == "div").props)
                .toEqual({"dangerouslySetInnerHTML": {__html: "Hello"}})
    })

})