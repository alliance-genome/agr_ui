import React  from 'react';
import style from './style.module.scss';
import LoadingSpinner from '../../components/loadingSpinner';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import PropTypes from "prop-types";

const parseRgdPosts = (rgdAPIRes) => {
  if (rgdAPIRes !== undefined) {
    if (rgdAPIRes['resultset']['result'][0]['meetings']) {
      return rgdAPIRes['resultset']['result'][0]['meetings'].map(post => {
        return {title: post.title, text: post.excerpt, link: post.link}
      });
    }
  }
}

// rgd modeled their api news+meetings format after flybase news, so very similar
// uses different parseRgdPosts ['meetings'] vs ['news'], 'meetings' in test keys,
// different field in content.jsx
// NewsFlybase could probably be re-parameterized to pass 'news' / 'meetings' to reuse
// that code for this, but not sure how to pass that into the map for parseRgdPosts
const MeetingsRgd = ({urlMeetingsMod, fetchMeetingsCount, linkToMeetingsPage}) => {
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
              postList && parseRgdPosts(postList).map(post => {
                if (count > fetchMeetingsCount) { return null; }
                count++;
                let key = "meetings_" + count;
                post.text = post.text.replace(/\[&hellip;\]/, '<a href="' + post.link + '">[&hellip;]<\\a>');
                return (
                  <div className={style.postContainer} key={key} data-testid={'div_meetings_' + count}>
                    <a href={post.link} data-testid={'href_meetings_' + count}>
                      <h4 className={style.h4extra} dangerouslySetInnerHTML={{ __html: post.title}}  data-testid={'header_meetings_' + count}/>
                    </a>
                    <p dangerouslySetInnerHTML={{ __html: post.text}} data-testid={'text_meetings_' + count} />
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

MeetingsRgd.propTypes = {
  urlMeetingsMod: PropTypes.string.isRequired,
  fetchMeetingsCount: PropTypes.number.isRequired
}

export default MeetingsRgd;
