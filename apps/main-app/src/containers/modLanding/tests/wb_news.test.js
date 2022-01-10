import React from 'react';
import ReactDOMServer from 'react-dom/server';
import WordpressNews from "../wordpressNews";
import thunk from 'redux-thunk';
import configureMockStore from "redux-mock-store";
import {MODContent} from '../content';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

 //React.useLayoutEffect = React.useEffect 
 jest.mock('react', () => ({
     ...jest.requireActual('react'),
     useLayoutEffect: jest.requireActual('react').useEffect,
 }));
 const content = MODContent['wormbase'];


 const initialState = {isLoading:false, payload: []}
 const middlewares = [thunk];
 const mockStoreConfigure = configureMockStore(middlewares);
 const store = mockStoreConfigure({ ...initialState });

 const originalDispatch = store.dispatch;
 store.dispatch = jest.fn(originalDispatch)

 // Mock the fetching of the data from http
 // See mock file FetchData.js in __mocks__ in lib directory.
 jest.mock('./../../../../src/lib/FetchData');

 describe('App', () => {
     beforeEach(() => {
       render(<Provider store={store}> <WordpressNews           
              urlNewsMod={content.wordpressNewsBaseURL}
              fetchNewsCount={content.fetchNewsCount}
              linkToNewsPage={content.linkToNewsPage}
              sectionStyle={content.sectionStyle} /></Provider>)
     });

     it('should render successfully', async () => {
       const news_div = await waitFor(() => screen.findByTestId("div_news_2"), { timeout: 8000 });
       expect(screen.getByTestId("div_news_2")).toHaveTextContent("Update on worm title 1");
     }, 10000);

     it('should contain a link', async () => {
         const news_div = await waitFor(() => screen.findByTestId("div_news_2"), { timeout: 8000 });
         const href = screen.getByTestId("href_news_2");
         expect(screen.getByTestId("div_news_2")).toContainElement(href)
      }, 10000);

      it('should contain specific link data', async () => {
         const news_div = await waitFor(() => screen.findByTestId("href_news_2"), { timeout: 8000 });
         const href = screen.getByTestId("href_news_2");
         expect(href).toHaveAttribute('href', 'https:/blah1');
      }, 10000);

      it('news href should have a header as the link', async () => {
         const news_div = await waitFor(() => screen.findByTestId("div_news_2"), { timeout: 8000 });
         const href = screen.getByTestId("href_news_2");
         const head = screen.getByTestId("header_news_2");
         expect(href).toContainElement(head);
      }, 10000);

      it('news href should have a header and be equal to', async () => {
         const news_div = await waitFor(() => screen.findByTestId("div_news_2"), { timeout: 8000 });
         const head = screen.getByTestId("header_news_2");
         expect(head).toHaveTextContent("Update on worm title 1");
      }, 10000);

      it('news excerpt', async () => {
         const news_div = await waitFor(() => screen.findByTestId("div_news_2"), { timeout: 8000 });
         const news_text = screen.getByTestId("text_news_2");
         expect(news_text).toHaveTextContent("Excerpt 1");
         expect(screen.getByTestId("div_news_2")).toContainElement(news_text);
      }, 10000);

      it('more news link checks', async () => {
         const news_div = await waitFor(() => screen.findByTestId("div_news_2"), { timeout: 8000 });
         const more_div = screen.getByTestId("more_news_div");
         const more_link = screen.getByTestId("more_news_link");
         expect(more_div).toContainElement(more_link);
         expect(more_link).toHaveAttribute('href', 'https://blog.wormbase.org/');
      }, 10000);

     });