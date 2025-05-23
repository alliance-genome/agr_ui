import React from 'react';
import style from './style.module.scss';
import ExternalLink from '../../components/ExternalLink';

const Resources = ({links, sectionStyle}) => {
  return (
    <div>
      <div className={`container ${style.containerExtra}`}>
        <div data-testid={'resources_topdiv'} className={`${style.section} ${sectionStyle}`}>
        <h2 data-testid={'resources_header'} className={style.sectionTitle}>Resources</h2>
          <div data-testid={'resources_link_div'} className={style.resourceDiv} >
            {links && links.map((link, index) => {
              return (
                <p key={index}>
                  <ExternalLink data-testid={'ext_resource_link_' + index} href={link[1]}>
                    <span dangerouslySetInnerHTML={{ __html: link[0]}} />
                  </ExternalLink>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
