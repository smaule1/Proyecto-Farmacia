import { should } from 'chai';
import { sortDateDesc } from '../strategy/sortDateDesc.js';

should();


describe('sortDateDesc', function () {
  let sortClass;

  beforeEach(function () {
    sortClass = new sortDateDesc();
  });

  describe('sort()', function () {

    it('should return a descending ordered list by date', function () {
      const unorderedList = [
        { fecha: new Date(2025, 0, 18) },
        { fecha: new Date(2024, 8, 15) },
        { fecha: new Date(2026, 6, 12) }
      ]
      const orderedList = [
        { fecha: new Date(2026, 6, 12) },
        { fecha: new Date(2025, 0, 18) },
        { fecha: new Date(2024, 8, 15) }
      ]

      sortClass.sort(unorderedList).should.have.deep.ordered.members(orderedList);
    });

    it('should return en empty array when the array is empty', function () {
      sortClass.sort([]).should.be.empty;
    });        
  });
});