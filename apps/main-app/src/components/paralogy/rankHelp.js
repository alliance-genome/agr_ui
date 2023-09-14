
export default function RankHelp() {
    return (
    <div>
      <p>
        Rank is calculated via the highest percent similarity within 
        four quartiles of alignment length (determined by using four 25% 
        quartiles derived from the longest paralog alignment length). 
      </p>
      <p>
        Paralogs with the longest alignment and greatest similarity 
        percentage are ranked highest. Identity is used as a secondary 
        criteria for paralogs with identical alignment and similarity. 
      </p>
      <p>
        DIOPT algorithm matches are used as a tertiary ranking criteria 
        in cases of equal similarity and identity within alignment 
        length quartiles. Multiple entries can share the same rank.
      </p>
    </div>);
  }
