import React  from 'react';
import style from './style.scss';
import LoadingSpinner from '../../components/loadingSpinner';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import PropTypes from "prop-types";

// Keeping this for sample until tests are written
// const sample = {
//    "kind": "calendar#event",
//    "etag": "\"2981788704262000\"",
//    "id": "cc9pdrl3fguf0p8kd8lfse01o0",
//    "status": "confirmed",
//    "htmlLink": "https://www.google.com/calendar/event?eid=Y2M5cGRybDNmZ3VmMHA4a2Q4bGZzZTAxbzAgbWh2MDU4bms5MzZzdDNqZDNxamVybmFqZGtAZw",
//    "created": "2017-03-15T20:39:33.000Z",
//    "updated": "2017-03-30T17:19:12.131Z",
//    "summary": "24th Annual Southeastern Regional Yeast Meeting (SERYM 2017)",
//    "description": "http://serym2017.ua.edu/",
//    "location": "The University of Alabama, Tuscaloosa, AL 35487, USA",
//    "creator": {
//     "email": "yeastgenome@gmail.com",
//     "displayName": "Saccharomyces Genome Database"
//    },
//    "organizer": {
//     "email": "mhv058nk936st3jd3qjernajdk@group.calendar.google.com",
//     "displayName": "SGD Public Events",
//     "self": true
//    },
//    "start": {
//     "date": "2017-03-31"
//    },
//    "end": {
//     "date": "2017-04-01"
//    },
//    "transparency": "transparent",
//    "iCalUID": "cc9pdrl3fguf0p8kd8lfse01o0@google.com",
//    "sequence": 0,
//    "eventType": "default"
//   };

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

const GoogleapisMeetings = ({urlMeetingsMod, fetchMeetingsCount, linkToMeetingsPage}) => {
  const {
    data: postList,
    isLoading
  } = usePageLoadingQuery(urlMeetingsMod);

  let upcomingMeetings = {};

  let count = 1;
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
              for (let i = 0; i < fetchMeetingsCount; i++) {
                const post = upcomingMeetings[keys[i]];
                wantedMeetings.push(
                  <div className={style.postContainer} key={i} data-testid={'div_meetings_' + i}>
                    <a href={post.link} data-testid={'href_meetings_' + count}>
                      <h4 className={style.h4extra} dangerouslySetInnerHTML={{ __html: post.summary}}  data-testid={'header_meetings_' + i}/>
                    </a>
                    <p dangerouslySetInnerHTML={{ __html: post.text}} data-testid={'text_meetings_' + i} />
                  </div>
                )
              }
              return ( <div>{wantedMeetings}</div> );
            }
          })()}
        </div>
        { linkToMeetingsPage && <div className={`row ${style.moreNews}`} data-testid={'more_meetings_div'}>
                              <a href={linkToMeetingsPage} data-testid={'more_meetings_link'} ><i>more meetings&hellip;</i></a></div> }
      </div>
    </div>
  );
};

GoogleapisMeetings.propTypes = {
  urlMeetingsMod: PropTypes.string.isRequired,
  fetchMeetingsCount: PropTypes.number.isRequired
}

export default GoogleapisMeetings;
