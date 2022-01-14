import React  from 'react';
import style from './style.scss';
import LoadingSpinner from '../../components/loadingSpinner';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import PropTypes from "prop-types";

// There's a lot of junk to clean up after I discuss with Rob more exact details of how to handle the dates, the separation between dates and location, and linking to more meetings.
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

// start = Date.now()

// var someDate = new Date(dateString);
// someDate = someDate.getTime();

const sortGoogleapiPosts = (googleAPIRes) => {
  let upcomingMeetings = {};
  const dateNow = Date.now();
//   console.log('dateNow');
//   console.log(dateNow);

//   let count = 0;
//   console.log(googleAPIRes);
  if (googleAPIRes !== undefined) {
    if (googleAPIRes['items']) {
      googleAPIRes['items'].forEach(function(post) {
        if (post.start.date) {
          let postStartDate = new Date(post.start.date);
          postStartDate = postStartDate.getTime();
          if (postStartDate > dateNow) {
//             count++;
//             console.log(count);
//             console.log(post.id);
//             console.log(post.start.date);
//             console.log(postStartDate);
            let location = post.description;
            let link = '';
            if (post.description.match(/^(http\S+)\s(.*)/)) {
              link = post.description.match(/^(http\S+)\s(.*)/).slice(1)[0];
              location = post.description.match(/^(http\S+)\s(.*)/).slice(1)[1];
            }

//             const TOstartDate = new Date(post.start.date).toDateString();
//             const TOendDate = new Date(post.end.date).toDateString();
//             var monthOptions = { month: 'long'};
//             const startDate = new Date(post.start.date);
//             const endDate = new Date(post.end.date);
//             const startDateMonth = startDate.getDate();
//             const startDateDay = new Intl.DateTimeFormat('en-US', monthOptions).format(startDate);
//             let startDateYear = ', ' + startDate.getFullYear();
//             const endDateMonth = endDate.getDate();
//             const endDateDay = new Intl.DateTimeFormat('en-US', monthOptions).format(endDate);
//             const endDateYear = ', ' + endDate.getFullYear();
//             startDateYear = (startDateYear === endDateYear) ? '' : startDateYear;
//             const startDateString = startDateMonth + ' ' + startDateDay + startDateYear;
//             const endDateString = endDateMonth + ' ' + endDateDay + endDateYear;
//             let text = startDateString + ' to ' + endDateString + ' -<br/>' + location;

//             let text = TOstartDate + ' to ' + TOendDate + ' -<br/>' + location;
            let text = post.start.date + ' to ' + post.end.date + '<br/>' + location;
            upcomingMeetings[postStartDate] = {summary: post.summary, link: link, text: text}
//             upcomingMeetings[postStartDate] = {summary: post.summary, link: link, text: text, start: post.start.date, end: post.end.date, tst: TOstartDate, tend: TOendDate}
//             upcomingMeetings[postStartDate] = {summary: post.summary, link: link, text: text, location: location, start: post.start.date, end: post.end.date}
//             console.log(entry);
          }
        }
      });
    }
  }
  console.log(upcomingMeetings);
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
              console.log(upcomingMeetings);
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
//                     <p dangerouslySetInnerHTML={{ __html: post.text}} data-testid={'text_meetings_' + i} />
//                   <div key={i}>
//                     {upcomingMeetings[keys[i]].start}
//                   </div>
//           upcomingMeetings[postStartDate] = {summary: post.summary, link: link, location: location, start: post.start.date, end: post.end.date}
// Filter for events with start date in the future.  Display the "summary" linking to the URL in the "description".  Display the start date and end date.  Display the "description" text minus the URL, which has the location of the meeting.
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
