import React from 'react';
import style from './style.module.scss';
import ExternalLink from '../../components/ExternalLink';

const PapersSection = () => {
  const publications = [
    {pmid: '39143479', title: "Gene therapy in Aβ-induced cell and mouse models of Alzheimer's disease through compensating defective mitochondrial complex I function"},
    {pmid: '38526283', title: "Activation of autophagy by Citri Reticulatae Semen extract ameliorates amyloid-beta-induced cell death and cognition deficits in Alzheimer's disease"},
    {pmid: '38950494', title: "Nesfatin-1 ameliorates pathological abnormalities in Drosophila hTau model of Alzheimer's disease"},
    {pmid: '38827230', title: "Aluminum chloride and D-galactose induced a zebrafish model of Alzheimer's disease with cognitive deficits and aging"},
    {pmid: '37515920', title: "Discovery of triazole-bridged aryl adamantane analogs as an intriguing class of multifunctional agents for treatment of Alzheimer's disease"},
    {pmid: '39009412', title: "c-KIT inhibitors reduce pathology and improve behavior in the Tg(SwDI) model of Alzheimer's disease"},
    {pmid: '37736695', title: "Melatonin regulates the circadian rhythm to ameliorate postoperative sleep disorder and neurobehavioral abnormalities in aged mice"},
  ];

  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <div className='row'>
          <div className='col-lg-12'>
            <h2>Recent Papers</h2>
              <div>
                {publications.map((publication) => {
                  return (
                    <div>
                      <ExternalLink href={'https://www.ncbi.nlm.nih.gov/pubmed/' + publication.pmid}>{publication.title}</ExternalLink>
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

export default PapersSection;
