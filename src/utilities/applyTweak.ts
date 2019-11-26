import { RawCharacterType, TweakType } from '@/types/rawCharacterTypes'
import { get } from 'lodash'

export function applyTweak (rawCharacter: RawCharacterType, tweakPath: string, calculatedValue: number) {
  const tweak: TweakType = get(rawCharacter.tweaks, tweakPath) || {}
  return (tweak.override !== undefined) ? tweak.override : calculatedValue + (tweak.bonus || 0)
}
