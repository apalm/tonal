import { isValue, isArr, asNote, hasOct, height } from 'tonal-pitches'

/**
 * Test if the given number is a valid midi note number
 * @function
 * @param {Object} num - the number to test
 * @return {Boolean} true if it's a valid midi note number
 */
export const isMidi = (m) => isValue(m) && !isArr(m) && m >= 0 && m < 128

// To match the general midi specification where `C4` is 60 we must add 12 to
// `height` function:

/**
 * Get midi number for a pitch
 * @function
 * @param {Array|String} pitch - the pitch
 * @return {Integer} the midi number or null if not valid pitch
 * @example
 * midi('C4') // => 60
 */
export function toMidi (val) {
  const p = asNote(val)
  return hasOct(p) ? height(p) + 12
    : isMidi(val) ? +val
    : null
}

const FLATS = 'C Db D Eb E F Gb G Ab A Bb B'.split(' ')
const SHARPS = 'C C# D D# E F F# G G# A A# B'.split(' ')

const fromMidiFn = (pcs) => (m) => {
  const pc = pcs[m % 12]
  const o = Math.floor(m / 12) - 1
  return pc + o
}

/**
 * Given a midi number, returns a note name. The altered notes will have
 * flats.
 * @function
 * @param {Integer} midi - the midi note number
 * @return {String} the note name
 * @example
 * tonal.fromMidi(61) // => 'Db4'
 */
export const fromMidi = fromMidiFn(FLATS)

/**
 * Given a midi number, returns a note name. The altered notes will have
 * sharps.
 * @function
 * @param {Integer} midi - the midi note number
 * @return {String} the note name
 * @example
 * tonal.fromMidi(61) // => 'C#4'
 */
export const fromMidiSharps = fromMidiFn(SHARPS)