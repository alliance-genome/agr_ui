import React from 'react';
import style from './style.module.scss';

const Search = ({links, sectionStyle}) => {
  return (
    <div>
      <div className={`container ${style.containerExtra}`}>
        <div data-testid={'search_topdiv'} className={`${style.section} ${sectionStyle}`}>
        <h2 data-testid={'search_header'} className={style.sectionTitle}>Search Alliance</h2>
          <div data-testid={'search_link_div'} className={style.searchiv} >
          { links && links.map((link, index) => {
                      return (
                        <div key={index}>
                          <h5>
                            <a href={link[1]} data-testid={'href_search_' + index} >
                            <span dangerouslySetInnerHTML={{__html: link[0]}} 
                                  data-testid={'search_label_' + index}/>
                          </a></h5>
                        </div>
                      );
                    })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
