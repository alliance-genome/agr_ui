import React from 'react';
import style from './style.scss';

const Search = ({links, sectionStyle}) => {
  return (
    <div>
      <div className={`container ${style.containerExtra}`}>
        <div data-testid={'resources_topdiv'} className={`${style.section} ${sectionStyle}`}>
        <h2 data-testid={'resources_header'} className={style.sectionTitle}>Search Alliance</h2>
          <div data-testid={'resources_link_div'} className={style.resourceDiv} >
          { links && links.map((link, index) => {
                      return (
                        <div key={index}>
                          <p>
                            <a href={link[1]} data-testid={'href_resources_' + index} >
                            <span dangerouslySetInnerHTML={{__html: link[0]}} 
                                  data-testid={'resources_label_' + index}/>
                          </a></p>
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
