import React from 'react';
import style from './style.module.scss';
import ExternalLink from '../../components/ExternalLink';


const ResourcesSection = () => {
  const resourceLinks = [
    {title: "Alzhemiers.gov", url: 'https://www.alzheimers.gov/'},
    {title: "Alzhemier's Association", url: 'https://www.alz.org/'},
    {title: "Alzheimer's Disease Clinical Trials", url: 'https://www.clinicaltrials.gov/search?cond=Alzheimer%20Disease'},
    {title: "Alzhemier's Foundation of America", url: 'https://alzfdn.org/'},
    {title: "National Institute on Aging", url: 'https://www.nia.nih.gov/'},
    {title: "OMIM", url: 'https://omim.org/entry/104300'},
  ];

  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <div className='row'>
          <div className='col-lg-12'>
            <h2>Community Resoures</h2>
              <div>
                {resourceLinks.map((resourceLink) => {
                  return (
                    <div>
                      <ExternalLink href={resourceLink.url}>{resourceLink.title}</ExternalLink>
                    </div>
                  )
                })}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
