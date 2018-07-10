/* eslint-disable react/no-set-state */

import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
} from 'reactstrap';

import style from './style.scss';

const items = [
  {
    background: 'https://i0.wp.com/alliancegenome.files.wordpress.com/2016/11/banner1.jpg',
    logo: 'https://i1.wp.com/alliancegenome.files.wordpress.com/2016/11/banner_1_flyin_logo.png',
    captionHeader: 'The Gene Ontology Consortium and Six Model Organism Databases have joined together to form the Alliance of Genome Resources',
    captionText: 'MORE INFORMATION ',
    link: '/about-us',
    className: 'slide1',
  },
  {
    background: 'https://i1.wp.com/alliancegenome.files.wordpress.com/2016/11/banner2.jpg',
    logo: 'https://i1.wp.com/alliancegenome.files.wordpress.com/2016/11/banner_1_flyin_logo.png',
    captionHeader: 'Have questions about the Alliance of Genome Resources?',
    captionText: 'CONTACT US ',
    link: '/contact-us',
    className: 'slide2',
  },
  {
    background: 'https://i2.wp.com/alliancegenome.files.wordpress.com/2016/11/banner3.jpg',
    logo: 'https://i1.wp.com/alliancegenome.files.wordpress.com/2016/11/banner_1_flyin_logo.png',
    captionHeader: 'The Alliance Orthology Working Group is developing a gold standard set of orthologs to support comparative genomics across multiple model organisms.\n',
    captionText: 'CLICK HERE FOR MORE INFO ',
    link: '/orthology',
    className: 'slide3',
  },
];

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.onHandleNext =  this.handleNext = this.handleNext.bind(this);
    this.onHandlePrevious = this.handlePrevious = this.handlePrevious.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.handleOnExiting = this.handleOnExiting.bind(this);
    this.handleOnExited = this.handleOnExited.bind(this);
  }

  handleOnExiting() {
    this.animating = true;
  }

  handleOnExited() {
    this.animating = false;
  }

  handleNext() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  handlePrevious() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item, idx) => {
      return (
        <CarouselItem
          key={idx}
          onExited={this.handleOnExited}
          onExiting={this.handleOnExiting}
        >
          <div className={style[item.className]} >
            <div className='container'>
              <div className='row py-3'>
                <div className='col-xs-12 col-12 col-sm-6'>
                  <img className='img-fluid logoImg' src={item.logo} />
                </div>
                <div className='col-xs-12 col-12 col-sm-6 align-self-center'>
                  <div className={style.carouselCaption} >
                    <div className={style.captionHeader} >{item.captionHeader}</div>
                    <div className='text-xs-center text-center'>
                      <a className={`btn btn-light btn-secondary ${style.captionButton}`} href={item.link}>
                        {item.captionText}
                          <i className='fa fa-chevron-right' />
                        <br />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </CarouselItem>
      );
    });

    return (
      <div>

        <Carousel
          activeIndex={activeIndex}
          next={this.onHandleNext}
          previous={this.onHandlePrevious}
        >

          {slides}

          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.handlePrevious} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.handleNext} />

        </Carousel>

        <div style={{padding: '3rem'}} >
          <div className="container">
            <div style={{width: '100%', textAlign: 'center'}}>
              <h2><span style={{color: '#2598c5'}}>MISSION STATEMENT</span></h2>
            </div>
            <p >The primary mission of the Alliance of Genome Resources (the Alliance) is to develop
              and maintain sustainable genome information resources that facilitate the use of diverse model organisms
              in understanding the genetic and genomic basis of human biology, health and disease. This understanding is
              fundamental for advancing genome biology research and for translating human genome data into clinical
              utility.</p>
          </div>
        </div>

        <div style={{background: '#F6F6F6', color: '#333', padding: '1rem'}}>

          <div className='container'>
            <div className='row'>

              <div className='col-xs-12 col-12 col-sm-4 '>
                <h3><span >ALLIANCE FOUNDING MEMBER SITES</span></h3>
                <p>The founding members of the Alliance of Genome Resources are: FlyBase, Mouse Genome Database (MGD),
                  the Gene Ontology Consortium (GOC), Saccharomyces Genome Database (SGD), Rat Genome Database (RGD),
                  WormBase, and the Zebrafish Information Network (ZFIN).</p>
              </div>

              <div className='col-xs-12 col-12 col-sm-8'>

                <div className='row' style={{marginBottom: '1rem'}}>

                  <div className='col-xs-3 col-3'>
                    <a href='http://www.wormbase.org/'>
                      <img alt='WormBase' className='img-fluid' src='https://alliancegenome.files.wordpress.com/2016/11/logo_wormbase.png' title='WormBase' />
                    </a>
                  </div>

                  <div className='col-xs-3 col-3'>
                    <a href='https://zfin.org/'>
                      <img alt='Zfin' className='img-fluid' src='https://alliancegenome.files.wordpress.com/2016/11/logo_zfin.png' title='ZFIN' />
                    </a>
                  </div>

                  <div className='col-xs-3 col-3'>
                    <a href='http://www.geneontology.org'>
                      <img alt='Gene Ontology' className='img-fluid' src='https://alliancegenome.files.wordpress.com/2016/11/logo_goc.png' title='Gene Ontology' />
                    </a>
                  </div>

                  <div className='col-xs-3 col-3'>
                    <a href='http://www.informatics.jax.org/'>
                      <img alt='MGD' className='img-fluid' src='https://alliancegenome.files.wordpress.com/2016/11/logo_rgd.png' title='MGD' />
                    </a>
                  </div>

                </div>

                <div className='row'>

                  <div className='col-xs-3 col-3'>
                    <a href='http://flybase.org/'>
                      <img alt='FlyBase' className='img-fluid' src='https://alliancegenome.files.wordpress.com/2016/11/logo_flybase.png' title='FlyBase' />
                    </a>
                  </div>

                  <div className='col-xs-3 col-3'>
                    <a href='http://rgd.mcw.edu/'>
                      <img alt='RGD' className='img-fluid' src='https://alliancegenome.files.wordpress.com/2016/11/logo_mgd.png' title='RGD' />
                    </a>
                  </div>

                  <div className='col-xs-3 col-3'>
                    <a href='http://www.yeastgenome.org/'>
                      <img alt='SGD' className='img-fluid' src='https://alliancegenome.files.wordpress.com/2016/11/logo_sgd.png' title='SGD' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
