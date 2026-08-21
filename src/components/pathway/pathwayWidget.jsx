/* eslint-disable */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import HorizontalScroll from '../horizontalScroll.jsx';

import fetchData from '../../lib/fetchData';

import NoData from '../noData.jsx';

import * as cutils from '@geneontology/curie-util-es5';
import ExternalLink from '../ExternalLink.jsx';

const GO_CONTEXT_LD = 'https://raw.githubusercontent.com/prefixcommons/biocontext/master/registry/go_context.jsonld';
const REACTOME_PATHWAY_BROWSER = 'https://reactome.org/PathwayBrowser/#/';
const REACTOME_INFERRED_EVENTS_DOC = 'https://reactome.org/documentation/inferred-events';
const REACTOME_REACTION_BROWSER = 'https://reactome.org/content/detail/';
const REACTOME_API_REACTIONS = 'https://reactome.org/ContentService/exporter/reaction/';

const getReactomeDbName = (dbName) => {
  if (dbName == 'WB') return 'Wormbase';
  if (dbName == 'FB') return 'Flybase';
  return dbName || 'UniProt';
};

const getReactomePathways = (dbName, dbId) => {
  const name = getReactomeDbName(dbName);
  return fetchData('https://reactome.org/ContentService/data/mapping/' + name + '/' + dbId + '/pathways');
};

const getReactomeReactions = (dbName, dbId) => {
  const name = getReactomeDbName(dbName);
  return fetchData('https://reactome.org/ContentService/data/mapping/' + name + '/' + dbId + '/reactions');
};

const PathwayWidget = ({ geneId, geneSpecies, xrefs }) => {
  const [reactomeDiagramUnavailable, setReactomeDiagramUnavailable] = useState(false);
  const [reactomePathways, setReactomePathways] = useState({
    loaded: false,
    error: false,
    selected: undefined,
    pathways: undefined,
  });
  const [reactomeReactions, setReactomeReactions] = useState({
    loaded: false,
    error: false,
    selected: undefined,
    src: undefined,
    reactions: undefined,
  });
  const [selectedTab, setSelectedTab] = useState('ReactomePathway');
  const [curieUtils, setCurieUtils] = useState(undefined);
  const [gocams, setGocams] = useState({ loaded: false, list: undefined, selected: undefined });

  const isMountedRef = useRef(false);
  const reactomePathwayDiagramRef = useRef(null);

  const isHumanGene = () => geneSpecies.taxonId.includes('9606');

  const getUniProtIDFromXrefs = () => {
    const uniprotIds = [];
    const otherXrefs = (xrefs && xrefs.other) || [];
    otherXrefs.forEach((xref) => {
      const curieId = xref.referencedCurie || xref.displayName || '';
      if (curieId.includes('UniProtKB:')) uniprotIds.push(curieId);
    });
    return uniprotIds;
  };

  const loadReactomeDiagram = (pathwayId) => {
    if (!reactomePathwayDiagramRef.current) {
      // Reset unavailable state so the holder div is re-rendered before we retry
      setReactomeDiagramUnavailable(false);
      (async () => {
        // Yield to React's render cycle so the holder div is in the DOM after a state reset
        await new Promise((resolve) => setTimeout(resolve, 0));
        // ensure the Reactome library has been loaded
        let attempts = 0;
        const maxAttempts = 15; // give up after ~15 seconds
        while (typeof Reactome === 'undefined' || !Reactome) {
          if (!isMountedRef.current) return;
          if (attempts >= maxAttempts) {
            if (isMountedRef.current) setReactomeDiagramUnavailable(true);
            return;
          }
          attempts++;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        if (!isMountedRef.current) return;
        reactomePathwayDiagramRef.current = Reactome.Diagram.create({
          placeHolder: 'reactomePathwayHolder',
          width: 1130,
          height: 600,
        });
        reactomePathwayDiagramRef.current.loadDiagram(pathwayId);
      })();
    } else {
      reactomePathwayDiagramRef.current.loadDiagram(pathwayId);
    }
  };

  const selectMODPathway = () => {
    setSelectedTab('MODPathways');
    // Handle the autofocus method on the gocam widget after DOM is ready
    setTimeout(() => {
      const elt = document.getElementById('gocam-1');
      if (elt) {
        elt.setAutoFocus(false);
        elt.addEventListener('click', () => elt.setAutoFocus(true));
        elt.addEventListener('mouseenter', () => {
          setTimeout(() => elt.setAutoFocus(true), 3000);
        });
        elt.addEventListener('mouseleave', () => elt.setAutoFocus(false));
      }
    }, 5000);
  };

  // ----- mount: kick off all three loads -----
  useEffect(() => {
    isMountedRef.current = true;

    const dbname = geneId.split(':')[0];
    const dbid = geneId.split(':')[1];

    // Pathways
    getReactomePathways(dbname, dbid)
      .then((pathwaysData) => {
        const selected = pathwaysData.length > 0 ? pathwaysData[0].stId : undefined;
        setReactomePathways({ loaded: true, error: false, selected, pathways: pathwaysData });
        if (selected) loadReactomeDiagram(selected);
      })
      .catch(() => {
        console.log("Couldn't retrieve reactome pathways for ", geneId);
        setReactomePathways({ loaded: true, error: true, selected: undefined, pathways: undefined });
      });

    // Reactions
    getReactomeReactions(dbname, dbid)
      .then((reactionsData) => {
        if (reactionsData.length > 0) {
          setReactomeReactions({
            loaded: true,
            error: false,
            selected: reactionsData[0].stId,
            src: REACTOME_API_REACTIONS + reactionsData[0].stId + '.svg',
            reactions: reactionsData,
          });
        } else {
          setReactomeReactions({
            loaded: true,
            error: false,
            selected: undefined,
            src: undefined,
            reactions: reactionsData,
          });
        }
      })
      .catch(() => {
        console.log("Couldn't retrieve reactome reactions for ", geneId);
        setReactomeReactions({
          loaded: true,
          error: true,
          selected: undefined,
          src: undefined,
          reactions: undefined,
        });
      });

    // GO-CAMs
    fetch(GO_CONTEXT_LD)
      .then((data) => data.json())
      .then((data) => {
        const map = cutils.parseContext(data);
        const cu = new cutils.CurieUtil(map);
        setCurieUtils(cu);

        let currentGeneId = geneId;
        if (geneId.includes('HGNC:')) {
          const uniprotIds = getUniProtIDFromXrefs();
          if (uniprotIds.length > 0) currentGeneId = uniprotIds[0];
        }

        const gocamsUrl = 'https://api.geneontology.org/api/gp/' + currentGeneId + '/models?causalmf=2';
        fetch(gocamsUrl)
          .then((r) => r.json())
          .then((data) => {
            const list = data.map((elt) => elt.gocam);
            setGocams({ loaded: true, list: data, selected: list[0] });
          })
          .catch((error) => {
            console.error(error);
            setGocams({ list: undefined, selected: undefined, loaded: true });
          });
      });

    return () => {
      isMountedRef.current = false;
    };
    // mount-only — geneId is expected to be stable for the widget's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----- after all three lists load, pick the first non-empty tab -----
  useEffect(() => {
    if (!(reactomePathways.loaded && reactomeReactions.loaded && gocams.loaded)) return;

    if (reactomePathways.pathways && reactomePathways.pathways.length > 0) {
      setSelectedTab('ReactomePathway');
    } else if (reactomeReactions.reactions && reactomeReactions.reactions.length > 0) {
      setSelectedTab('ReactomeReactions');
    } else if (gocams.list && gocams.list.length > 0) {
      selectMODPathway();
    } else {
      setSelectedTab('ReactomePathway');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactomePathways.loaded, reactomeReactions.loaded, gocams.loaded]);

  const pathwayChanged = (event) => {
    const selected = event.target.value;
    setReactomePathways((prev) => ({ ...prev, selected }));
    loadReactomeDiagram(selected);
  };

  const reactionChanged = (event) => {
    const selected = event.target.value;
    setReactomeReactions((prev) => ({ ...prev, selected, src: REACTOME_API_REACTIONS + selected + '.svg' }));
  };

  const gocamChanged = (event) => {
    const selected = event.target.value;
    setGocams((prev) => ({ ...prev, selected }));
  };

  const renderPathwayNavigation = () => (
    <nav>
      <div className="nav nav-tabs">
        <button
          className={selectedTab == 'ReactomePathway' ? 'nav-link active' : 'nav-link'}
          aria-selected="true"
          onClick={() => setSelectedTab('ReactomePathway')}
        >
          Reactome Pathway ({reactomePathways.pathways ? reactomePathways.pathways.length : '0'})
        </button>
        <button
          className={selectedTab == 'ReactomeReactions' ? 'nav-link active' : 'nav-link'}
          aria-selected="true"
          onClick={() => setSelectedTab('ReactomeReactions')}
        >
          Reactome Reactions ({reactomeReactions.reactions ? reactomeReactions.reactions.length : '0'})
        </button>
        <button
          className={selectedTab == 'MODPathways' ? 'nav-link active' : 'nav-link'}
          aria-selected="true"
          onClick={() => selectMODPathway()}
        >
          GO-CAMs ({gocams.list ? gocams.list.length : '0'})
        </button>
      </div>
    </nav>
  );

  const renderReactomePathway = () => {
    const rpstyles = selectedTab && selectedTab == 'ReactomePathway' ? {} : { display: 'none' };
    return (
      <HorizontalScroll className="text-nowrap">
        <div id="reactomePathway" style={rpstyles}>
          {reactomePathways.loaded &&
          !reactomePathways.error &&
          reactomePathways.pathways &&
          reactomePathways.pathways.length > 0 ? (
            <div style={{ padding: '1rem 0.2rem' }}>
              <span style={{ paddingRight: '1rem' }}>Available pathways: </span>
              <select
                id="pathwaySelect"
                value={reactomePathways.selected}
                onChange={pathwayChanged}
                style={{ minWidth: '1130px' }}
              >
                {reactomePathways.pathways.map((elt, index) => (
                  <option key={`available-pathway-options-${elt.stId}-${index}`} value={elt.stId}>
                    {elt.displayName}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <NoData />
          )}

          {reactomeDiagramUnavailable ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              <p>The Reactome pathway diagram is currently unavailable.</p>
              {reactomePathways.selected && (
                <p>
                  You can view this pathway directly on{' '}
                  <ExternalLink href={REACTOME_PATHWAY_BROWSER + reactomePathways.selected}>Reactome</ExternalLink>.
                </p>
              )}
            </div>
          ) : (
            <div id="reactomePathwayHolder" style={{ maxWidth: '1280px' }}></div>
          )}

          {reactomePathways.loaded &&
          !reactomePathways.error &&
          reactomePathways.pathways &&
          reactomePathways.pathways.length > 0 ? (
            <div>
              <ExternalLink href={REACTOME_PATHWAY_BROWSER + reactomePathways.selected}>
                Open in Reactome Pathway
              </ExternalLink>
              {!isHumanGene() ? (
                <ExternalLink
                  href={REACTOME_INFERRED_EVENTS_DOC}
                  style={{
                    display: 'inline-block',
                    textAlign: 'right',
                    width: '80%',
                    fontStyle: 'italic',
                    fontSize: '1.1rem',
                    fontWeight: '800',
                  }}
                >
                  Computationally inferred by Orthology
                </ExternalLink>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </HorizontalScroll>
    );
  };

  const renderReactomeReaction = () => {
    const rrstyles = selectedTab && selectedTab == 'ReactomeReactions' ? {} : { display: 'none' };
    return (
      <HorizontalScroll className="text-nowrap">
        <div id="reactomeReaction" style={rrstyles}>
          {reactomeReactions.loaded &&
          !reactomeReactions.error &&
          reactomeReactions.reactions &&
          reactomeReactions.reactions.length > 0 ? (
            <div style={{ padding: '1rem 0.2rem' }}>
              <span style={{ paddingRight: '1rem' }}>Available reactions: </span>
              <select
                id="reactionSelect"
                value={reactomeReactions.selected}
                onChange={reactionChanged}
                style={{ minWidth: '1130px' }}
              >
                {reactomeReactions.reactions.map((elt, idx) => (
                  <option key={`${elt.stId}-${idx}`} value={elt.stId}>
                    {elt.displayName}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <NoData />
          )}

          <img id="reactomeReactionHolder" src={reactomeReactions.src} style={{ maxWidth: '1305px' }} />

          {reactomeReactions.loaded && reactomeReactions.reactions && reactomeReactions.reactions.length > 0 ? (
            <div>
              <ExternalLink href={REACTOME_REACTION_BROWSER + reactomeReactions.selected}>
                Open in Reactome Reaction
              </ExternalLink>
              {!isHumanGene() ? (
                <span style={{ display: 'inline-block', textAlign: 'right', width: '80%', fontStyle: 'italic' }}>
                  Computationally inferred by Orthology
                </span>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </HorizontalScroll>
    );
  };

  const renderMODPathway = () => {
    const gocstyles = selectedTab && selectedTab == 'MODPathways' ? {} : { display: 'none' };
    return (
      <HorizontalScroll className="text-nowrap">
        <div id="modPathway" style={gocstyles}>
          {gocams.loaded && gocams.list && gocams.list.length > 0 ? (
            <div style={{ padding: '1rem 0.2rem' }}>
              <span style={{ paddingRight: '1rem' }}>Available GO-CAMs: </span>
              <select
                id="modPathwaySelect"
                value={gocams.selected}
                onChange={gocamChanged}
                style={{ minWidth: '1130px' }}
              >
                {gocams.list.map((elt, idx) => (
                  <option key={`${elt.gocam}-${idx}`} value={elt.gocam}>
                    {elt.title}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ''
          )}
          {gocams.loaded && gocams.list && gocams.list.length > 0 && selectedTab && selectedTab == 'MODPathways' ? (
            <div>
              <go-gocam-viewer
                id="gocam-1"
                gocam-id={curieUtils.getCurie(gocams.selected)}
                show-legend="true"
                style={{ maxWidth: '1280px' }}
              ></go-gocam-viewer>
            </div>
          ) : (
            <div>
              <NoData />
              <br />
              <br />
              <p>
                Read more about the{' '}
                <ExternalLink href="http://geneontology.org/docs/gocam-overview/">GO-CAM Data Model</ExternalLink>.
              </p>
            </div>
          )}
          {gocams.loaded && gocams.list && gocams.list.length > 0 ? (
            <ExternalLink href={gocams.selected}>View GO-CAM at Gene Ontology</ExternalLink>
          ) : (
            ''
          )}
        </div>
      </HorizontalScroll>
    );
  };

  return (
    <div>
      {renderPathwayNavigation()}
      {renderReactomePathway()}
      {renderReactomeReaction()}
      {renderMODPathway()}
    </div>
  );
};

PathwayWidget.propTypes = {
  geneId: PropTypes.string.isRequired,
  geneSpecies: PropTypes.object,
  geneSymbol: PropTypes.string,
  xrefs: PropTypes.object,
};

export default PathwayWidget;
