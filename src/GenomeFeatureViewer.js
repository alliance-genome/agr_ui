import DrawViewer from './DrawViewer';

/*
 Main entry for creating the genome viewer.
 Currently only draws isoforms at a global level
 @Param config: a set of configurations for the isoform track
    {
        chromosome:5,
        start:75574916,
        end:75656722,
        genome:"Mus musculus"
    }

  @Param svg_target: a DOM element id, where the viewer will be drawn.
*/
var GenerateGenomeView = function(config, svg_target)
{
  // TODO: 
  // Config should be a set of tracks and we should be drawing 
  // based on track type to the svg
  let externalLocationString = config.chromosome + ':' + config.start + '..' + config.end;
  var dataUrl = "https://agr-apollo.berkeleybop.io/apollo/track/" + encodeURI(config.genome) + "/All%20Genes/" + 
  encodeURI(externalLocationString) + ".json";
  fetch(dataUrl)
      .then((response) => {
          response.json()
      .then(data => {
          DrawViewer(data, svg_target);
      });
  })
  .catch((error) => {
    console.log(error);
  });
};

export default GenerateGenomeView;
