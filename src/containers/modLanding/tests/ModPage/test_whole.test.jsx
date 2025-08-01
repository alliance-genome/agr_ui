import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Main from '../../Main.jsx';
import { MODContent } from '../../content.jsx';
import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { thunk } from 'redux-thunk';
import { legacy_configureStore as configureMockStore } from 'redux-mock-store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Router } from 'react-router-dom';
import style from '../../style.module.scss';
import flybaseLogo from '../../../../assets/images/alliance_logo_flybase.png';

const initialState = { isLoading: false, payload: [] };
const middlewares = [thunk];
const mockStoreConfigure = configureMockStore(middlewares);
const store = mockStoreConfigure({ ...initialState });

const originalDispatch = store.dispatch;
store.dispatch = jest.fn(originalDispatch);

// Mock the fetching of the data from http
// See mock file FetchData.js in __mocks__ in lib directory.
jest.mock('../../../../lib/fetchData');

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useNavigate: () => mockedUseNavigate,
  useParams: () => ({ id: 'testMod' }),
}));

jest.mock('../../content.jsx', () => ({
  MODContent: {
    testMod: {
      about: '<p>About testMod</p>',
      link: 'https://www.example.org',
      modShortName: 'TestMod',
      modFullName: 'Testing Mod',
      modVisitButtonText: 'TestMod',
      bannerStyle: '',
      titleBarStyle: '',
      sectionStyle: '',
      footerStyle: '',
      logoImgSrc: 'testMod.png',
      hasMeetings: true,
      meetingsURL: 'https://example.org/',
      hasNews: true,
      fetchNewsCount: 3,
      newsURL: 'https://example.org/',
      linkToNewsPage: 'https://example.org/',
      search: [['<i>T. Mod</i>', '/search?species=T Mod&category=gene']],
      resources: [
        ['TestMod Resource 1', 'https://example.org/'],
        ['TestMod Resource 2', 'https://example.org/'],
        ['TestMod Resource 3', 'https://example.org/'],
      ],
      footer: [
        ['', 'TestMod Support', 'https://example.org/'],
        ['', '', ''],
        ['youtube', ' TestMod YouTube', 'https://example.org/'],
      ],
    },
  },
}));

describe('TestMod Title', () => {
  it('Should render mod landing page', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    );

    const top_div = screen.getByTestId('modlanding_div');
    const aboutnewsmeet = screen.getByTestId('modlanding_middle');
    const searchresources = screen.getByTestId('modlanding_right');
    const footer = screen.getByTestId('modlanding_footer');
    const footer_link = screen.getByTestId('footer_link');

    // Basically check each container is rendered
    expect(top_div).toContainElement(aboutnewsmeet);
    expect(top_div).toContainElement(searchresources);
    expect(top_div).toContainElement(footer);
    expect(footer).toContainElement(footer_link);
  }, 10000);
});
