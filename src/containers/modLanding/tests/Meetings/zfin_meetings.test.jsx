import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MeetingsZfin from '../../MeetingsZfin.jsx';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { MODContent } from '../../content.jsx';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const content = MODContent['zfin'];

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
          <MeetingsZfin
            urlMeetingsMod={content.zfinMeetingsAPI}
            fetchMeetingsCount={content.fetchMeetingsCount}
            linkToMeetingsPage={content.linkToMeetingsPage}
            sectionStyle={content.sectionStyle}
          />
        </Provider>
      </QueryClientProvider>
    );
  });

  it('should render successfully', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('div_meetings_2'), { timeout: 8000 });
    expect(screen.getByTestId('div_meetings_2')).toHaveTextContent('Update on zebrafish title 1');
  }, 10000);

  it('should contain a link', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('div_meetings_2'), { timeout: 8000 });
    const href = screen.getByTestId('href_meetings_2');
    expect(screen.getByTestId('div_meetings_2')).toContainElement(href);
  }, 10000);

  it('should contain specific link data', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('href_meetings_2'), { timeout: 8000 });
    const href = screen.getByTestId('href_meetings_2');
    expect(href).toHaveAttribute('href', 'https:/blah1');
  }, 10000);

  it('meetings href should have a header as the link', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('div_meetings_2'), { timeout: 8000 });
    const href = screen.getByTestId('href_meetings_2');
    const head = screen.getByTestId('header_meetings_2');
    expect(href).toContainElement(head);
  }, 10000);

  it('meetings href should have a header and be equal to', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('div_meetings_2'), { timeout: 8000 });
    const head = screen.getByTestId('header_meetings_2');
    expect(head).toHaveTextContent('Update on zebrafish title 1');
  }, 10000);

  // Zfin does not have a meetings excerpt.  If it ever does uncomment the below.
  // it('meetings excerpt', async () => {
  //    const meetings_div = await waitFor(() => screen.findByTestId("div_meetings_2"), { timeout: 8000 });
  //    const meetings_text = screen.getByTestId("text_meetings_2");
  //    expect(meetings_text).toHaveTextContent("Excerpt 1");
  //    expect(screen.getByTestId("div_meetings_2")).toContainElement(meetings_text);
  // }, 10000);

  it('more meetings link checks', async () => {
    const meetings_div = await waitFor(() => screen.findByTestId('div_meetings_2'), { timeout: 8000 });
    const more_div = screen.getByTestId('more_meetings_div');
    const more_link = screen.getByTestId('more_meetings_link');
    expect(more_div).toContainElement(more_link);
    expect(more_link).toHaveAttribute('href', 'https://zfin.atlassian.net/wiki/spaces/meetings/overview');
  }, 10000);
});
