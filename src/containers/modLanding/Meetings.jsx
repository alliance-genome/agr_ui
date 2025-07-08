import React from 'react';
import style from './style.module.scss';
import PropTypes from 'prop-types';
import MeetingsZfin from './MeetingsZfin.jsx';
import MeetingsRgd from './MeetingsRgd.jsx';
import GoogleapisMeetings from './googleapisMeetings.jsx';
import ExternalLink from '../../components/ExternalLink.jsx';

const Meetings = ({ content }) => {
  return (
    <div className={`container ${style.containerExtra}`}>
      <div data-testid={'meetings_div'} className={`${style.section} ${content.sectionStyle}`}>
        <h2 data-testid={'meetings_header'} className={style.sectionTitle}>
          Meetings
        </h2>
        {(() => {
          if (content.googleapisMeetingsBaseURL) {
            return (
              <GoogleapisMeetings
                urlMeetingsMod={content.googleapisMeetingsBaseURL}
                fetchMeetingsCount={content.fetchMeetingsCount}
                linkToMeetingsPage={content.linkToMeetingsPage}
              />
            );
          } else if (content.zfinMeetingsAPI) {
            return (
              <MeetingsZfin
                urlMeetingsMod={content.zfinMeetingsAPI}
                fetchMeetingsCount={content.fetchMeetingsCount}
                linkToMeetingsPage={content.linkToMeetingsPage}
              />
            );
          } else if (content.rgdMeetingsAPI) {
            // rgd modeled their api news+meetings format after flybase news, so very similar
            return (
              <MeetingsRgd
                urlMeetingsMod={content.rgdMeetingsAPI}
                fetchMeetingsCount={content.fetchMeetingsCount}
                linkToMeetingsPage={content.linkToMeetingsPage}
              />
            );
          } else if (content.meetingsURL) {
            return (
              <h5 data-testid={'meetings_link_header'} className={style.externalNews}>
                <ExternalLink data-testid={'more_meetings_link'} href={content.meetingsURL}>
                  Discover upcoming {content.modShortName} related meetings
                </ExternalLink>
              </h5>
            );
          }
          return <div>No Meetings</div>;
        })()}
      </div>
    </div>
  );
};

Meetings.propTypes = {
  content: PropTypes.object.isRequired,
};

export default Meetings;
