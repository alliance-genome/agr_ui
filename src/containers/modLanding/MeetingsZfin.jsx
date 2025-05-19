import React  from 'react';
import style from './style.module.scss';
import LoadingSpinner from '../../components/loadingSpinner.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import PropTypes from "prop-types";

const parseZfinPosts = (zfinAPIRes) => {
  if (zfinAPIRes !== undefined) {
    if (zfinAPIRes['results']) {
      return zfinAPIRes['results'].map(post => {
        return {title: post.title, link: post.url}
      });
    }
  }
}

const MeetingsZfin = ({urlMeetingsMod, fetchMeetingsCount, linkToMeetingsPage}) => {
  const {
    data: postList,
    isLoading
  } = usePageLoadingQuery(urlMeetingsMod);

  let count = 1;
  return (
    <div className={style.wordPressContainer}>
      <div className='container'>
        <div className='row'>
          <div>
            {isLoading && <LoadingSpinner />}
            {
              postList && parseZfinPosts(postList).map(post => {
                if (count > fetchMeetingsCount) { return null; }
                count++;
                let key = "meetings_" + count;
                if (post.text !== undefined) {
                  post.text = post.text.replace(/\[&hellip;\]/, '<a href="' + post.link + '">[&hellip;]<\\a>');
                }
                return (
                  <div className={style.postContainer} key={key} data-testid={'div_meetings_' + count}>
                    <a href={post.link} data-testid={'href_meetings_' + count}>
                      <h4 className={style.h4extra} dangerouslySetInnerHTML={{ __html: post.title}}  data-testid={'header_meetings_' + count}/>
                    </a>
                  </div>
                );
              })
            }
          </div>
        </div>
        { linkToMeetingsPage && <div className={`row ${style.moreNews}`} data-testid={'more_meetings_div'}>
                              <a href={linkToMeetingsPage} data-testid={'more_meetings_link'} ><i>more meetings&hellip;</i></a></div> }
      </div>
    </div>
  );
};

// Zfin Meetings API does not have text / excerpt content, if gets added, put this line after the <a> tag
//                     <p dangerouslySetInnerHTML={{ __html: post.text}} data-testid={'text_meetings_' + count} />
// and extract  text: post.excerpt,  into the parseZfinPosts.


MeetingsZfin.propTypes = {
  urlMeetingsMod: PropTypes.string.isRequired,
  fetchMeetingsCount: PropTypes.number.isRequired
}

export default MeetingsZfin;
