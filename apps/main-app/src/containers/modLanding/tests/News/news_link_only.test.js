import React from 'react';
import ReactDOMServer from 'react-dom/server';
import News from "../../News";
import {MODContent} from '../../content';
import { getByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

const content = MODContent['goc'];

describe('goc static link to news', () => {
    beforeEach(() => {
        render(<News
               content={content}/>)
    });

    it('Should render a basic link ', () => {

        const div = screen.getByTestId("news_div");
        const header = screen.getByTestId("news_header");
        const header2 = screen.getByTestId("news_link_header");
        const link = screen.getByTestId("more_news_link");

        expect(div).toContainElement(header);
        expect(div).toContainElement(header2);
        expect(header2).toContainElement(link);
        expect(link).toHaveAttribute('href', content.newsURL);
        expect(link).toHaveTextContent('Click here for the latest news from ' + content.modShortName);

    });
});
