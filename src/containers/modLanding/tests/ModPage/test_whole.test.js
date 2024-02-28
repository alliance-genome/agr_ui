import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Main from "../../Main";
import {MODContent} from '../../content';
import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import thunk from 'redux-thunk';
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux';

const initialState = {isLoading:false, payload: []}
const middlewares = [thunk];
const mockStoreConfigure = configureMockStore(middlewares);
const store = mockStoreConfigure({ ...initialState });

const originalDispatch = store.dispatch;
store.dispatch = jest.fn(originalDispatch)

// Mock the fetching of the data from http
// See mock file FetchData.js in __mocks__ in lib directory.
 jest.mock('../../../../lib/fetchData');

describe('WormBase Title', () => {
    //const members = ['wormbase', 'flybase', 'rgd', 'goc', 'sgd', 'zfin'];
    // rgd, goc and mgd have no news
    const members = ['wormbase', 'flybase', 'sgd', 'zfin'];
    members.forEach(element => {
        it('Should render mod landing page for ' + element, async () => {
            let content = MODContent[element];
            render(<Provider store={store}> <Main modId={element}/> </Provider>);

            const news_div = await waitFor(() => screen.findByTestId("div_news_2"), { timeout: 8000 });

            const top_div = screen.getByTestId("modlanding_div");
            const aboutnewsmeet = screen.getByTestId("modlanding_middle");
            const searchresources = screen.getByTestId("modlanding_right")
            const footer = screen.getByTestId("modlanding_footer");
            const footer_link = screen.getByTestId("footer_link");

            // Basically check each container is rendered
            expect(top_div).toContainElement(aboutnewsmeet);
            expect(top_div).toContainElement(searchresources);
            expect(top_div).toContainElement(footer);
            expect(footer).toContainElement(footer_link);

        }, 10000);

        const oth_mem = ['rgd', 'goc', 'mgd'];
        it('Should render mod landing page for ' + element, () => {
            let content = MODContent[element];
            render(<Provider store={store}> <Main modId={element}/> </Provider>);

            const top_div = screen.getByTestId("modlanding_div");
            const aboutnewsmeet = screen.getByTestId("modlanding_middle");
            const searchresources = screen.getByTestId("modlanding_right")
            const footer = screen.getByTestId("modlanding_footer");
            const footer_link = screen.getByTestId("footer_link");

            // Basically check each container is rendered
            expect(top_div).toContainElement(aboutnewsmeet);
            expect(top_div).toContainElement(searchresources);
            expect(top_div).toContainElement(footer);
            expect(footer).toContainElement(footer_link);

        });        

    });
});
