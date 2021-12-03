import React  from 'react';
import { Link } from 'react-router-dom';
import style from '../wordpress/style.scss';
import LoadingSpinner from '../../components/loadingSpinner';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';

const WordpressNews = ({urlNewsMod, fetchNewsCount}) => {
  const {
    data: postList,
    isLoading
  } = usePageLoadingQuery(urlNewsMod);

  let count=1;
  return (
    <div className={style.wordPressContainer}>

      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            {isLoading && <LoadingSpinner />}
            {
              postList && postList.map(post => {
                if (post.status !== 'publish') { return; }
                const link = `/news/${post.slug}`;
                if (count>fetchNewsCount){return;}
                count ++;
                return (
                  <div className={style.postContainer} key={post.id}>
                    <Link to={link}>
                      <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered}} />
                    </Link>
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered}} />
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordpressNews;
