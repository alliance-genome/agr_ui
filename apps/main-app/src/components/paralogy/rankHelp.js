
export default function RankHelp() {
    return (
    <div>
      <p>
        Rank is calculated via the highest percent similarity within 
        four quartiles of alignment length (determined by using four 25% 
        quartiles derived from the longest paralog alignment length).

        Paralogs with the longest alignment and greatest similarity 
        percentage are ranked highest and DIOPT algorithm matches are
        used as secondary ranking criteria in cases of equal similarity
        within alignment length quartiles. Multiple entries can share the same rank.
      </p>
    </div>);
  }
