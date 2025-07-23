import { CONSEQUENCES_ENUM } from './ConsequenceService'
import {
  generateDelinsPoint,
  generateInsertionPoint,
  generateSnvPoints,
} from './VariantService'

function drawDeletion(color: string, label: string) {
  return `<svg width="15" top="3" viewBox="0 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><rect fill="${color}" stroke="none" height="10" width="10"></svg>${label}</polygons></svg>`
}

function drawDeletionForConsequence(consequencesName: string) {
  return consequencesName == 'unknown'
    ? drawDeletion('grey', consequencesName.replace(/_/g, ' '))
    : drawDeletion(
        CONSEQUENCES_ENUM[consequencesName as keyof typeof CONSEQUENCES_ENUM]
          .color,
        consequencesName.replace(/_/g, ' '),
      )
}

export function createLegendBox() {
  let returnString = `<table><tbody>`
  returnString += `<tr>`
  returnString += `<td align="center" valign="top"><u><b>Variant types</b></u></td>`
  returnString += `<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>`
  returnString += `</tr>`
  returnString += `<tr>`
  returnString += `<td valign="top" ><ul style="list-style-type:none;">`
  returnString += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${generateSnvPoints(0)}"></svg>point mutation</polygons></svg></li>`
  returnString += `<li>${drawDeletion('black', 'deletion')}</li>`
  returnString += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${generateInsertionPoint(0)}"></svg>insertion</polygons></svg></li>`
  returnString += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${generateDelinsPoint(0)}"></svg>delins/MNV </polygons></svg></li>`
  returnString += `</ul></td>`
  returnString += `<td valign="top" ><ul style="list-style-type:none;">`
  returnString += `<li>${drawDeletionForConsequence('transcript_ablation')}</li>`
  returnString += `<li>${drawDeletionForConsequence('splice_acceptor_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('splice_donor_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('stop_gained')}</li>`
  returnString += `<li>${drawDeletionForConsequence('frameshift_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('stop_lost')}</li>`
  returnString += `<li>${drawDeletionForConsequence('start_lost')}</li>`
  returnString += `<li>${drawDeletionForConsequence('inframe_insertion')}</li>`
  returnString += `<li>${drawDeletionForConsequence('inframe_deletion')}</li>`
  returnString += `<li>${drawDeletionForConsequence('missense_variant')}</li>`
  returnString += `</ul></td>`
  returnString += `<td valign="top" ><ul style="list-style-type:none;">`
  returnString += `<li>${drawDeletionForConsequence('protein_altering_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('splice_region_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('start_retained_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('stop_retained_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('synonymous_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('coding_sequence_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('five_prime_UTR_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('three_prime_UTR_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('intron_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('non_coding_transcript_variant')}</li>`
  returnString += `<li>${drawDeletionForConsequence('unknown')}</li>`
  returnString += `</ul></td>`
  returnString += `</tr>`
  returnString += `<tr>`
  returnString += `<td></td>`
  returnString += `<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>`
  returnString += `</tr>`

  returnString += `</tbody></table>`

  return returnString
}
