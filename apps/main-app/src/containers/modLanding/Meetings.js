import React from 'react';
import style from './style.scss';
import PropTypes from "prop-types";
import GoogleapisMeetings from "./googleapisMeetings"

const Meetings = ({content}) => {
  return (
    <div className={`container ${style.containerExtra}`}>
      <div className={`${style.section} ${content.sectionStyle}`}>
        <h2 className={style.sectionTitle}>Meetings</h2>
        {(() => {
          if (content.googleapisMeetingsBaseURL) { 
            return (<GoogleapisMeetings urlMeetingsMod={content.googleapisMeetingsBaseURL} fetchMeetingsCount={content.fetchMeetingsCount}
                                        linkToMeetingsPage={content.linkToMeetingsPage} />); }
          if (content.meetingsURL) { 
            return (<h5 className={style.externalNews} ><a href={content.meetingsURL}>Click here for the latest meetings from {content.modShortName}</a></h5>); }
          return (<div>No Meetings</div>);
        })()}
      </div>
    </div>
  );
}

Meetings.propTypes = {
  content: PropTypes.object.isRequired
}

export default Meetings;
