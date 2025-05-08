import React from "react";
import style from "./style.module.scss";
import HeadMetaTags from "../../components/headMetaTags";
import BlastService from "./BlastService";

const BlastPage = () => {
  return (
    <div>
      <HeadMetaTags title="BLAST Service" />
      <div>
      <div className={style.aboutMenuContainer}>
        <div className="container-fluid">
          <div className={style.secondaryNavEmptyRow}></div>
          <div className={`row ${style.secondaryNav}`}>
            <div className="container">
              <h1>BLAST Service</h1>
            </div>
          </div>
        </div>

      </div>
      </div>
      <div className="container">
        <div className="col-xs-12 col-sm-12 mission">
          <BlastService />
        </div>
      </div>
    </div>
  );
};

export default BlastPage;
