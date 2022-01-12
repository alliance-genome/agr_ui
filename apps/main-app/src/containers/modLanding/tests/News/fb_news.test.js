import React from 'react';
import ReactDOMServer from 'react-dom/server';
import NewsFlybase from "../../NewsFlybase";
import thunk from 'redux-thunk';
import configureMockStore from "redux-mock-store";
import {MODContent} from '../../content';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

 const content = MODContent['flybase'];


 const initialState = {isLoading:false, payload: []}
 const middlewares = [thunk];
 const mockStoreConfigure = configureMockStore(middlewares);
 const store = mockStoreConfigure({ ...initialState });

 const originalDispatch = store.dispatch;
 store.dispatch = jest.fn(originalDispatch)

 // Mock the fetching of the data from http
 // See mock file FetchData.js in __mocks__ in lib directory.
 jest.mock('./../../../../src/lib/fetchData');

 describe('App', () => {
     beforeEach(() => {
       render(<Provider store={store}> <NewsFlybase
              urlNewsMod={content.flybaseNewsAPI}
              linkToNewsPage={content.linkToNewsPage}
              fetchNewsCount={content.fetchNewsCount}/></Provider>)
     });

     it('should render successfully', async () => {
       const news_div = await waitFor(() => screen.findByTestId("div_news_2"), { timeout: 8000 });
       expect(screen.getByTestId("div_news_2")).toHaveTextContent("Update on fly title 1");
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
         expect(head).toHaveTextContent("Update on fly title 1");
      }, 10000);

      it('news excerpt', async () => {
         const news_div = await waitFor(() => screen.findByTestId("div_news_2"), { timeout: 8000 });
         const news_text = screen.getByTestId("text_news_2");
         expect(news_text).toHaveTextContent("Excerpt 1");
         expect(screen.getByTestId("div_news_2")).toContainElement(news_text);
      }, 10000);

      // Flybase has no link to more news. If it ever does uncomment the below.
      it('more news link checks', async () => {
         const news_div = await waitFor(() => screen.findByTestId("div_news_2"), { timeout: 8000 });
         const more_div = screen.getByTestId("more_news_div");
         const more_link = screen.getByTestId("more_news_link");
         expect(more_div).toContainElement(more_link);
         expect(more_link).toHaveAttribute('href', 'https://flybase.org/commentaries');
      }, 10000);

     });
