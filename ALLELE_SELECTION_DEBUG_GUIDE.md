# Allele Selection Debugging Guide

This guide documents the comprehensive debugging logs added to track the allele selection flow from the table to the genome viewer.

## Debug Log Emoji Reference

- 🎯 **AlleleTable**: Row selection events
- 📡 **Prop Passing**: Component prop updates  
- 🔄 **Component Updates**: React lifecycle methods
- 🎨 **setSelectedAlleles Calls**: When the highlighting method is invoked
- ✨ **Successful Highlights**: When setSelectedAlleles completes successfully
- ❌ **Errors**: When setSelectedAlleles fails
- 🔍 **DOM Inspection**: Post-update DOM state verification

## Flow Tracking Points

### 1. AlleleTable Component (`alleleTable.jsx`)

**Row Selection (🎯)**
- Logs when a user clicks on a table row
- Shows allele ID, current selection state, and whether selecting/deselecting
- Location: `onSelect` handler in `selectRow` configuration

**Prop Creation (📡)**  
- Logs when creating props for VariantsSequenceViewer
- Shows formatted alleles being passed down
- Location: `variantsSequenceViewerProps` useMemo hook

### 2. VariantsSequenceViewer Component (`VariantsSequenceViewer.jsx`)

**Prop Reception (📡)**
- Logs all props received from AlleleTable
- Shows allele counts and visible variants
- Location: Top of component function

**Prop Forwarding (📡)**
- Logs props being passed to GenomeFeatureWrapper
- Location: Before return statement

### 3. GenomeFeatureWrapper Component (`genomeFeatureWrapper.jsx`)

**Component Updates (🔄)**
- Logs when componentDidUpdate fires
- Shows what changed (primaryId, allelesSelected, visibleVariants)
- Includes before/after prop comparison
- Location: `componentDidUpdate` method

**GenomeFeatureViewer Creation (🔄)**
- Logs when the viewer instance is created
- Shows available methods and initial configuration
- Location: `loadGenomeFeature` method

**Initial Selection (🎨)**
- Logs when setting selected alleles during initialization
- Shows allele IDs being highlighted
- Location: After GenomeFeatureViewer creation

**Selection Updates (🎨)**
- Logs when updating selections via componentDidUpdate
- Includes try-catch for error handling
- Location: `componentDidUpdate` method

**Success/Error Tracking (✨/❌)**
- Logs successful setSelectedAlleles calls
- Catches and logs any errors during highlighting
- Location: try-catch blocks around setSelectedAlleles

**DOM Verification (🔍)**
- Delayed inspection of DOM state after setSelectedAlleles
- Counts highlight elements, selected variants, and total variants
- Shows actual DOM element attributes
- Location: setTimeout after setSelectedAlleles calls

## How to Use These Logs

1. **Open browser console** before interacting with the allele table
2. **Clear console** for a fresh start
3. **Click on an allele row** in the table
4. **Follow the emoji trail** to see the data flow:
   - 🎯 → 📡 → 📡 → 🔄 → 🎨 → ✨/❌ → 🔍

## What to Look For

### Successful Flow
- All emojis appear in sequence
- ✨ indicates successful highlighting
- 🔍 shows highlight elements in DOM

### Common Issues
- Missing 🎨: setSelectedAlleles not being called
- ❌ instead of ✨: Error in highlighting logic
- 🔍 shows 0 highlights: DOM manipulation failing
- Missing allele IDs in flow: Data format mismatch

## Debugging Tips

1. **Check allele ID format** - Should match between selection and variant data
2. **Verify DOM selector** - Ensure `#${this.props.id}` matches actual element
3. **Inspect variant elements** - Look for data-alleles attributes
4. **Watch for timing issues** - DOM inspection happens 100ms after update

## Next Steps

Once the issue is identified through these logs:
1. Check if allele IDs match variant allele associations
2. Verify the genomefeatures library's setHighlights logic
3. Ensure variant elements have proper data attributes
4. Confirm CSS classes for highlighting are applied