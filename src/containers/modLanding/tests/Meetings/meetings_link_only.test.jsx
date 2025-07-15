import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Meetings from '../../Meetings.jsx';
import { MODContent } from '../../content.jsx';
import { getByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const content = MODContent['wormbase'];

describe('wormbase static link to meetings', () => {
  beforeEach(() => {
    render(<Meetings content={content} />);
  });

  it('Should render a basic link ', () => {
    const div = screen.getByTestId('meetings_div');
    const header = screen.getByTestId('meetings_header');
    const header2 = screen.getByTestId('meetings_link_header');
    const link = screen.getByTestId('more_meetings_link');

    expect(div).toContainElement(header);
    expect(div).toContainElement(header2);
    expect(header2).toContainElement(link);
    expect(link).toHaveAttribute('href', content.meetingsURL);
    expect(link).toHaveTextContent(`Discover upcoming ${content.modShortName} related meetings`);
  });
});
