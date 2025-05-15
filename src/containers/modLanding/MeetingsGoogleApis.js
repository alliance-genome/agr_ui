import React  from 'react';
import style from './style.module.scss';
import ExternalLink from '../../components/ExternalLink';
import LoadingSpinner from '../../components/loadingSpinner';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import PropTypes from "prop-types";

const sortGoogleapiPosts = (googleAPIRes) => {
  let upcomingMeetings = {};
  const dateNow = Date.now();
  if (googleAPIRes !== undefined) {
    if (googleAPIRes['items']) {
      googleAPIRes['items'].forEach(function(post) {
        if (post.start.date) {
          let postStartDate = new Date(post.start.date);
          postStartDate = postStartDate.getTime();
          if (postStartDate > dateNow) {
            let location = post.description;
            let link = '';
            if (post.description.match(/^(http\S+)\s(.*)/)) {
              link = post.description.match(/^(http\S+)\s(.*)/).slice(1)[0];
              location = post.description.match(/^(http\S+)\s(.*)/).slice(1)[1];
            }

            var monthOptions = { month: 'long'};
            const startDate = new Date(post.start.date+'T00:00:00.000-08:00');
            // SGD uses Pacific TimeZone, which is -8 but the end date in googleapis is exclusive, so have to shift it by a day
            const endDate = new Date(post.end.date+'T00:00:00.000+16:00');

            const endDateDay = endDate.getDate();
            const endDateMonth = new Intl.DateTimeFormat('en-US', monthOptions).format(endDate);
            const endDateYear = endDate.getFullYear();
            const endDateString = endDateMonth + ' ' + endDateDay + ', ' + endDateYear;

            const startDateDay = startDate.getDate();
            const startDateMonth = new Intl.DateTimeFormat('en-US', monthOptions).format(startDate);
            const startDateYear = startDate.getFullYear();
            let startDateString = startDateMonth + ' ' + startDateDay;
            (startDateYear !== endDateYear) && ( startDateString += ', ' + startDateYear );

            let text = startDateString + ' to ' + endDateString + '<br />' + location;
            upcomingMeetings[postStartDate] = {summary: post.summary, link: link, text: text}
          }
        }
      });
    }
  }
  return (upcomingMeetings);
}

const MeetingsGoogleApis = ({urlMeetingsMod, fetchMeetingsCount, linkToMeetingsPage}) => {
  const {
    data: postList,
    isLoading
  } = usePageLoadingQuery(urlMeetingsMod);

  let upcomingMeetings = {};

  return (
    <div className={style.wordPressContainer}>
      <div className='container'>
        <div className='row'>
          {isLoading && <LoadingSpinner />}
          {(() => {
            if (postList) {
              let wantedMeetings = [];
              upcomingMeetings = sortGoogleapiPosts(postList);
              let keys = Object.keys(upcomingMeetings);
              keys.sort();
              (keys.length < fetchMeetingsCount) && (fetchMeetingsCount = keys.length);
              for (let i = 0; i < fetchMeetingsCount; i++) {
                const post = upcomingMeetings[keys[i]];
                wantedMeetings.push(
                  <div className={style.postContainer} key={i} data-testid={'div_meetings_' + i}>
                    <h4 className={style.h4extra} data-testid={'header_meetings_' + i}>
                      <ExternalLink data-testid={'href_meetings_' + i} href={post.link}>{post.summary}</ExternalLink>
                    </h4>
                    <p dangerouslySetInnerHTML={{ __html: post.text}} data-testid={'text_meetings_' + i} />
                  </div>
                )
              }
              return ( <div>{wantedMeetings}</div> );
            }
          })()}
        </div>
        {linkToMeetingsPage && <div className={`row ${style.moreNews}`} data-testid={'more_meetings_div'}>
          <ExternalLink data-testid={'more_meetings_link'} href={linkToMeetingsPage}><i>more meetings&hellip;</i></ExternalLink>
        </div>}
      </div>
    </div>
  );
};

MeetingsGoogleApis.propTypes = {
  urlMeetingsMod: PropTypes.string.isRequired,
  fetchMeetingsCount: PropTypes.number.isRequired
}

export default MeetingsGoogleApis;
