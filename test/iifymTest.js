var testData = [
  // Imperial
  // Mifflin-St Jeor
  {
    given: { 'gender': 'male', 'age': 22, 'isMetric': false, 'ft': 5, 'in': 10, 'cm': null, 'lbs': 170, 'kg': null, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1779, 'initialTdee': 2446, 'tdee': 2568, 'protein': 119, 'fat': 59.5, 'carbs': 389.1 }
  },
  {
    given: { 'gender': 'female', 'age': 17, 'isMetric': false, 'ft': 5, 'in': 5, 'cm': null, 'lbs': 129, 'kg': null, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1372, 'initialTdee': 1887, 'tdee': 1981, 'protein': 90.3, 'fat': 45.2, 'carbs': 303.4 }
  },
  // Katch-McArdle
  {
    given: { 'gender': 'male', 'age': 25, 'isMetric': false, 'ft': 5, 'in': 8, 'cm': null, 'lbs': 130, 'kg': null, 'mifflinStJeor': false, 'exerciseLevel': 2, 'bodyFatPercentage': 0.18, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1417, 'initialTdee': 1948, 'tdee': 2045, 'protein': 74.6, 'fat': 37.3, 'carbs': 352.7 }
  },
  {
    given: { 'gender': 'male', 'age': 25, 'isMetric': false, 'ft': 5, 'in': 8, 'cm': null, 'lbs': 400, 'kg': null, 'mifflinStJeor': false, 'exerciseLevel': 2, 'bodyFatPercentage': 0.60, 'goal': .80, 'protein': 0.8, 'fat': 0.35 },
    expected: { 'bmr': 1941, 'initialTdee': 2669, 'tdee': 2135, 'protein': 128, 'fat': 56, 'carbs': 279.8 }
  },
  // Metric
  // Mifflin-St Jeor
  {
    given: { 'gender': 'male', 'age': 20, 'isMetric': true, 'ft': null, 'in': null, 'cm': 152, 'lbs': null, 'kg': 81.65, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1672, 'initialTdee': 2298, 'tdee': 2413, 'protein': 125.7, 'fat': 62.9, 'carbs': 336.1 }
  },
  {
    given: { 'gender': 'female', 'age': 17, 'isMetric': true, 'ft': null, 'in': null, 'cm': 165 , 'lbs': null, 'kg': 58.51, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1372, 'initialTdee': 1887, 'tdee': 1981, 'protein': 90.3, 'fat': 45.2, 'carbs': 303.4 }
  },
  // Katch-McArdle
  {
    given: { 'gender': 'male', 'age': 20, 'isMetric': true, 'ft': null, 'in': null, 'cm': 152, 'lbs': null, 'kg': 81.65, 'mifflinStJeor': false, 'exerciseLevel': 2, 'bodyFatPercentage': 0.60, 'goal': 0.85, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1075, 'initialTdee': 1479, 'tdee': 1256, 'protein': 50.3, 'fat': 25.1, 'carbs': 206.9 }
  },
];

// Data for Validating Error Cases
// Do a beforeEach song and dance in order to avoid having
// to worry about modifying objects and their effects on other
// test cases.
var imperialMaleMSJData   = null, 
    imperialFemaleMSJData = null, 
    imperialMaleKMData    = null, 
    metricMaleMSJData     = null, 
    metricMaleKMData      = null;

var setupErrorValidationData = function() {
  imperialMaleMSJData = 
  {
    given: { 'gender': 'male', 'age': 22, 'isMetric': false, 'ft': 5, 'in': 10, 'cm': null, 'lbs': 170, 'kg': null, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1779, 'initialTdee': 2446, 'tdee': 2568, 'protein': 119, 'fat': 59.5, 'carbs': 389.1 }
  };

  imperialFemaleMSJData =
  {
    given: { 'gender': 'female', 'age': 17, 'isMetric': false, 'ft': 5, 'in': 5, 'cm': null, 'lbs': 129, 'kg': null, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1372, 'initialTdee': 1887, 'tdee': 1981, 'protein': 90.3, 'fat': 45.2, 'carbs': 303.4 }
  };

  imperialMaleKMData =
  {
    given: { 'gender': 'male', 'age': 25, 'isMetric': false, 'ft': 5, 'in': 8, 'cm': null, 'lbs': 130, 'kg': null, 'mifflinStJeor': false, 'exerciseLevel': 2, 'bodyFatPercentage': 0.18, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1417, 'initialTdee': 1948, 'tdee': 2045, 'protein': 74.6, 'fat': 37.3, 'carbs': 352.7 }
  };

  metricMaleMSJData =
  {
    given: { 'gender': 'male', 'age': 20, 'isMetric': true, 'ft': null, 'in': null, 'cm': 152, 'lbs': null, 'kg': 81.65, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1672, 'initialTdee': 2298, 'tdee': 2413, 'protein': 125.7, 'fat': 62.9, 'carbs': 336.1 }
  };

  metricMaleKMData =
  {
    given: { 'gender': 'male', 'age': 20, 'isMetric': true, 'ft': null, 'in': null, 'cm': 152, 'lbs': null, 'kg': 81.65, 'mifflinStJeor': false, 'exerciseLevel': 2, 'bodyFatPercentage': 0.60, 'goal': 0.85, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1075, 'initialTdee': 1479, 'tdee': 1256, 'protein': 50.3, 'fat': 25.1, 'carbs': 206.9 }
  };
};

describe('bmr()', function() {
  testData.forEach(function(d, i) {
    it('returns the correct BMR for the individual (' + i + ')', function() {
      // Since expected values were gathered from an existing IIFYM calculator
      // that may round differently, we allow are results to be +/- 10 calories
      // from expected.
      expect(iifym.bmr(d.given)).to.be.within(d.expected['bmr'] - 10, d.expected['bmr'] + 10);
    });
  });

  describe('Validation for', function() {
    beforeEach(function() { setupErrorValidationData() });

    describe('(gender)', function() {
      it('throws an Error when "gender" is not specified using Mifflin-St Jeor', function() {
        // Use a known good record, but tweak it a little.
        delete imperialMaleMSJData.given['gender'];
        expect(function bmrGenderMissing() { iifym.bmr(imperialMaleMSJData.given) }).to.throw(Error, /gender must be given/);
      });

      it('throws an Error when "gender" is invalid using Mifflin-St Jeor', function() {
        imperialMaleMSJData.given['gender'] = 'kangaroo'; 
        expect(function bmrGenderInvalid() { iifym.bmr(imperialMaleMSJData.given) }).to.throw(Error, /Invalid gender/);
      });

      it('does not throw an Error when "gender" is not specified using Katch-McArdle', function() {
        delete imperialMaleKMData.given['gender'];
        expect(function bmrGenderMissing() { iifym.bmr(imperialMaleKMData.given) }).to.not.throw(Error);
      });

      it('does not throw an Error when "gender" is invalid using Katch-McArdle', function() {
        imperialMaleKMData.given['gender'] = 'kangaroo'; 
        expect(function bmrGenderInvalid() { iifym.bmr(imperialMaleKMData.given) }).to.not.throw(Error);
      });
    });

    describe('(age)', function() {
      it('throws an Error when "age" is not specified using Mifflin-St Jeor', function() {
        delete imperialMaleMSJData.given['age'];
        expect(function bmrAgeMissing() { iifym.bmr(imperialMaleMSJData.given) }).to.throw(Error, /age must be given/);
      });

      it('throws an Error when "age" is less than 0 using Mifflin-St Jeor', function() {
        imperialMaleMSJData.given['age'] = -1;
        expect(function bmrAgeInvalid() { iifym.bmr(imperialMaleMSJData.given) }).to.throw(Error, /Invalid age/);
      });

      it('throws an Error when "age" is greater than 105 using Mifflin-St Jeor', function() {
        imperialMaleMSJData.given['age'] = 106;
        expect(function bmrAgeInvalid() { iifym.bmr(imperialMaleMSJData.given) }).to.throw(Error, /Invalid age/);
      });

      it('does not throw an Error when "age" is not specified using Katch-McArdle', function() {
        delete imperialMaleKMData.given['age'];
        expect(function bmrAgeMissing() { iifym.bmr(imperialMaleKMData.given) }).to.not.throw(Error);
      });

      it('does not throw an Error when "age" is less than 0 using Katch-McArdle', function() {
        imperialMaleKMData.given['age'] = -1;
        expect(function bmrAgeInvalid() { iifym.bmr(imperialMaleKMData.given) }).to.not.throw(Error);
      });

      it('does not throw an Error when "age" is greater than 105 using Katch-McArdle', function() {
        imperialMaleKMData.given['age'] = 106;
        expect(function bmrAgeInvalid() { iifym.bmr(imperialMaleKMData.given) }).to.not.throw(Error);
      });
    });

    describe('(isMetric)', function() {
      it('throws an Error when "isMetric" is not specified using Mifflin-St Jeor', function() {
        delete imperialMaleMSJData.given['isMetric'];
        expect(function bmrIsMetricMissing() { iifym.bmr(imperialMaleMSJData.given) }).to.throw(Error, /isMetric must be given/);
      });

      it('throws an Error when "isMetric" is invalid using Mifflin-St Jeor', function() {
        imperialMaleMSJData.given['isMetric'] = "hey";
        expect(function bmrIsMetricInvalid() { iifym.bmr(imperialMaleMSJData.given) }).to.throw(Error, /isMetric must be a boolean/);
      });

      it('throws an Error when "isMetric" is not specified using Katch-McArdle', function() {
        delete imperialMaleKMData.given['isMetric'];
        expect(function bmrIsMetricMissing() { iifym.bmr(imperialMaleKMData.given) }).to.throw(Error, /isMetric must be given/);
      });

      it('throws an Error when "isMetric" is invalid using Katch-McArdle', function() {
        imperialMaleKMData.given['isMetric'] = "hey";
        expect(function bmrIsMetricInvalid() { iifym.bmr(imperialMaleKMData.given) }).to.throw(Error, /isMetric must be a boolean/);
      });
    });

    describe('(height)', function() {
      describe('when isMetric === true,', function() {
        it('throws an Error when "cm" is not specified using Mifflin-St Jeor', function() {
          delete metricMaleMSJData.given['cm'];
          expect(function bmrMetricCmMissing() { iifym.bmr(metricMaleMSJData.given) }).to.throw(Error, /cm must be given when isMetric is true/);
        });

        it('throws an Error when "cm" is less than 0 using Mifflin-St Jeor', function() {
          metricMaleMSJData.given['cm'] = -1;
          expect(function bmrMetricCmInvalid() { iifym.bmr(metricMaleMSJData.given) }).to.throw(Error, /cm must be greater than 0/);
        });

        it('does not throw an Error when "cm" is not specified using Katch-McArdle', function() {
          delete metricMaleKMData.given['cm'];
          expect(function bmrMetricCmMissing() { iifym.bmr(metricMaleKMData.given) }).to.not.throw(Error);
        });

        it('does not throw an Error when "cm" is less than 0 using Katch-McArdle', function() {
          metricMaleKMData.given['cm'] = -1;
          expect(function bmrMetricCmInvalid() { iifym.bmr(metricMaleKMData.given) }).to.not.throw(Error);
        });
      });

      describe('when isMetric === false,', function() {
        it('throws an Error when both "ft" and "in" are not specified using Mifflin-St Jeor', function() {
          delete imperialMaleMSJData.given['ft'];
          delete imperialMaleMSJData.given['in'];
          expect(function bmrImperialFtAndInMissing() { iifym.bmr(imperialMaleMSJData.given) }).to.throw(Error, /ft or in.+must be given/);
        });

        it('throws an Error when "ft" is negative using Mifflin-St Jeor', function() {
          imperialMaleMSJData.given['ft'] = -1;
          imperialMaleMSJData.given['in'] = 1;
          expect(function bmrImperialFtInvalid() { iifym.bmr(imperialMaleMSJData.given) }).to.throw(Error, /ft must be greater than 0/);
        });

        it('throws an Error when "in" is negative using Mifflin-St Jeor', function() {
          imperialMaleMSJData.given['ft'] = 1;
          imperialMaleMSJData.given['in'] = -1;
          expect(function bmrImperialInInvalid() { iifym.bmr(imperialMaleMSJData.given) }).to.throw(Error, /in must be greater than 0/);
        });

        it('does not throw an Error when "ft" is specified, but "in" is not using Mifflin-St Jeor', function() {
          delete imperialMaleMSJData.given['in'];
          expect(function bmrImperialInMissing() { iifym.bmr(imperialMaleMSJData.given) }).to.not.throw(Error);
        });

        it('does not throw an Error when "in" is specified, but "ft" is not using Mifflin-St Jeor', function() {
          delete imperialMaleMSJData.given['ft'];
          expect(function bmrImperialInMissing() { iifym.bmr(imperialMaleMSJData.given) }).to.not.throw(Error);
        });

        it('does not throw an Error when both "ft" and "in" are not specified using Katch-McArdle', function() {
          delete imperialMaleKMData.given['ft'];
          delete imperialMaleKMData.given['in'];
          expect(function bmrImperialFtAndInMissing() { iifym.bmr(imperialMaleKMData.given) }).to.not.throw(Error)
        });

        it('does not throw an Error when "ft" is negative using Katch-McArdle', function() {
          imperialMaleKMData.given['ft'] = -1;
          imperialMaleKMData.given['in'] = 1;
          expect(function bmrImperialFtInvalid() { iifym.bmr(imperialMaleKMData.given) }).to.not.throw(Error)
        });

        it('throws an Error when "in" is negative using Katch-McArdle', function() {
          imperialMaleKMData.given['ft'] = 1;
          imperialMaleKMData.given['in'] = -1;
          expect(function bmrImperialInInvalid() { iifym.bmr(imperialMaleKMData.given) }).to.not.throw(Error)
        });
      });
    });

    describe('(weight)', function() {
      describe('when isMetric === true,', function() {
      });
    });
  });
});

describe('tdee()', function() {
  testData.forEach(function(d, i) {
    it('returns the correct TDEE for the individual (' + i + ')', function() {
      // Allow +/- 10 calories. See bmr() test.
      expect(iifym.tdee(iifym.bmr(d.given), d.given['exerciseLevel']))
        .to.be.within(d.expected['initialTdee'] - 10, d.expected['initialTdee'] + 10);
    });
  });
});

describe('tdeeGoal()', function() {
  testData.forEach(function(d, i) {
    it('returns the correct TDEE adjusted to the specified goal of the individual (' + i + ')', function() {
      // Allow +/- 10 calories. See bmr() test.
      //
      // This is getting ugly, but it could be simplified the same way that the API
      // is expected to be simplified in the real world, by assigning each step to a
      // variable to avoid redoing work.
      //
      // Also, the calculate() method is going to do something similar to this to
      // simplify things for users when they want the full breakdown.
      expect(iifym.tdeeGoal(iifym.tdee(iifym.bmr(d.given), d.given['exerciseLevel']),
                            d.given['goal']))
        .to.be.within(d.expected['tdee'] - 10, d.expected['tdee'] + 10);
    });
  });
});

 describe('calculate()', function() {
   testData.forEach(function(d, i) {
     var results = iifym.calculate(d.given);

     // Allow +/- 10 calories. See bmr() test.
     ['bmr', 'initialTdee', 'tdee'].forEach(function(key) {
       describe('result["' + key + '"] (' + i + ')', function() {
         it('returns the correct value for ' + key, function() { 
           expect(results[key]).to.be.within(d.expected[key] - 10, d.expected[key] + 10);
         });
       });
     });

     // Allow +/- 1.5 grams. Since the calories might be off, the
     // grams could be too.
     ['protein', 'fat', 'carbs'].forEach(function(key) {
       describe('result["' + key + '"] (' + i + ')', function() {
         it('returns the correct amount of ' + key, function() {
           expect(results[key]).to.be.within(d.expected[key] - 1.5, d.expected[key] + 1.5);
         });
       });
     });
   });
 });
