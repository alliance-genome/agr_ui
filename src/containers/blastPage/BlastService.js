import React from "react";
import useBlastServers from "../../hooks/useBlastServers";

function listPublicServers(blastEnv) {
  const mods = Object.entries(blastEnv);
  let blastServerList = [];

  mods.map(([mod, modServers]) => {
    const servers = Object.entries(modServers);
    servers.map(([server, serverData]) => {
      if (serverData.public) {
        const serverItem = { name: server, ...serverData };
        blastServerList.push(serverItem);
      }
    });
  });

  return blastServerList;
};

const BlastService = () => {
  const { data, isLoading, error } = useBlastServers();

  if (error) return console.log("ERROR: BlastServerList: ", error);
  if (isLoading) return null;  // maybe change to <loadingPage /> ... or something like that ...

  const blastEnv = data.environments;
  const blastServers = listPublicServers(blastEnv);

  // const title = page.title.rendered;
  return (
    <div>
      <h3>
        Welcome to the BLAST Service for the Alliance of Genome Resources!
      </h3>
      <p>
        This BLAST service allows researchers to search genomic sequences using
        the Basic Local Alignment Search Tool (BLAST). By entering a sequence or
        query, users can find regions of similarity to various genomes within
        the Alliance. This service supports separate environments for each of
        the Model Organism Databases (MODs) as well as a unified environment for
        the Alliance. Results provide detailed alignments and annotations to aid
        in your research. Explore the various BLAST environments through the
        links below to find the one that best suits your research needs:
      </p>
      <ul>
        {
          blastServers.map((server) => (
            <li key={server.dataProvider + server.name}>
              <a href={"/blast/" + server.dataProvider + "/" + server.name}>{server.dataProvider + " - " + server.name}</a>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default BlastService;
