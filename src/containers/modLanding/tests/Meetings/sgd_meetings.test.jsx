import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import WordpressNews from "../../wordpressNews";
import GoogleapisMeetings from '../../googleapisMeetings.jsx';
import { thunk } from 'redux-thunk';

import { legacy_configureStore as configureMockStore } from 'redux-mock-store';
import { MODContent } from '../../content.jsx';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const content = MODContent['sgd'];

const initialState = { isLoading: false, payload: [] };
const middlewares = [thunk];
const mockStoreConfigure = configureMockStore(middlewares);
const store = mockStoreConfigure({ ...initialState });

const originalDispatch = store.dispatch;
store.dispatch = jest.fn(originalDispatch);

// Mock the fetching of the data from http
// See mock file FetchData.js in __mocks__ in lib directory.
jest.mock('../../../../lib/fetchData');

describe('App', () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <GoogleapisMeetings
            urlMeetingsMod={content.googleapisMeetingsBaseURL}
            fetchMeetingsCount={content.fetchMeetingsCount}
            linkToMeetingsPage={content.linkToMeetingsPage}
          />
        </Provider>
      </QueryClientProvider>
    );
  });

  it('should render successfully', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('div_meetings_0'), { timeout: 8000 });
    expect(screen.getByTestId('div_meetings_0')).toHaveTextContent('Update on sgd meeting 1');
  }, 10000);

  it('should contain a link', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('div_meetings_0'), { timeout: 8000 });
    const href = screen.getByTestId('href_meetings_0');
    expect(screen.getByTestId('div_meetings_0')).toContainElement(href);
  }, 10000);

  it('should contain specific link data', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('href_meetings_0'), { timeout: 8000 });
    const href = screen.getByTestId('href_meetings_0');
    expect(href).toHaveAttribute('href', 'https:/blah1');
  }, 10000);

  it('meetings href should have a header as the link', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('div_meetings_0'), { timeout: 8000 });
    const href = screen.getByTestId('href_meetings_0');
    const head = screen.getByTestId('header_meetings_0');
    expect(href).toContainElement(head);
  }, 10000);

  it('meetings href should have a header and be equal to', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('div_meetings_0'), { timeout: 8000 });
    const head = screen.getByTestId('header_meetings_0');
    expect(head).toHaveTextContent('1st test sgd meeting');
  }, 10000);

  it('meetings date range', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('div_meetings_0'), { timeout: 8000 });
    const meetings_text = screen.getByTestId('text_meetings_0');
    expect(meetings_text).toHaveTextContent('January 1 to January 2, 2170');
    expect(screen.getByTestId('div_meetings_0')).toContainElement(meetings_text);
  }, 10000);

  it('more meetings link checks', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('div_meetings_0'), { timeout: 8000 });
    const more_div = screen.getByTestId('more_meetings_div');
    const more_link = screen.getByTestId('more_meetings_link');
    expect(more_div).toContainElement(more_link);

    expect(more_link).toHaveAttribute('href', content.linkToMeetingsPage);
  }, 10000);
});
