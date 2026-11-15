import { describe, it, expect } from 'vitest';
import { resolveFuelGrade } from './grades';
import { ALL_COUNTRIES_DATA } from '../../data/countries';

const key = (cc: keyof typeof ALL_COUNTRIES_DATA, requested: string) =>
  resolveFuelGrade(ALL_COUNTRIES_DATA[cc].fuel.value!.grades, requested)?.key;

describe('resolveFuelGrade: generic form choice → country grade', () => {
  it('exact keys pass straight through (Saudi Arabia)', () => {
    expect(key('sa', 'octane91')).toBe('octane91');
    expect(key('sa', 'octane95')).toBe('octane95');
    expect(key('sa', 'diesel')).toBe('diesel');
  });

  it('maps to the nearest octane in each country', () => {
    expect(key('eg', 'octane91')).toBe('octane92');
    expect(key('ae', 'octane91')).toBe('eplus91');
    expect(key('ae', 'octane95')).toBe('special95');
    expect(key('bh', 'octane95')).toBe('mumtaz95');
    expect(key('jo', 'octane91')).toBe('octane90');
    expect(key('sy', 'octane91')).toBe('subsidised90');
  });

  it('finds the diesel grade under local names', () => {
    expect(key('eg', 'diesel')).toBe('solar');
    expect(key('ma', 'diesel')).toBe('gasoil');
    expect(key('tn', 'diesel')).toBe('gasoilSansSoufre');
    expect(key('sy', 'diesel')).toBe('mazout');
  });

  it('uses the regular petrol grade where grades have no octane number, never LPG', () => {
    expect(key('ma', 'octane95')).toBe('sansPlomb');
    expect(key('dz', 'octane91')).toBe('sansPlomb');
    expect(key('iq', 'octane91')).toBe('regular');
  });
});
