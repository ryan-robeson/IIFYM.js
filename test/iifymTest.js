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
// Uses functions to avoid modifying objects in tests.
var imperialMaleMSJData = function() {
  return {
    given: { 'gender': 'male', 'age': 22, 'isMetric': false, 'ft': 5, 'in': 10, 'cm': null, 'lbs': 170, 'kg': null, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1779, 'initialTdee': 2446, 'tdee': 2568, 'protein': 119, 'fat': 59.5, 'carbs': 389.1 }
  };
}, 
  imperialFemaleMSJData = function() {
    return {
      given: { 'gender': 'female', 'age': 17, 'isMetric': false, 'ft': 5, 'in': 5, 'cm': null, 'lbs': 129, 'kg': null, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
      expected: { 'bmr': 1372, 'initialTdee': 1887, 'tdee': 1981, 'protein': 90.3, 'fat': 45.2, 'carbs': 303.4 }
    };
  }, 
  imperialMaleKMData    = function() {
    return {
      given: { 'gender': 'male', 'age': 25, 'isMetric': false, 'ft': 5, 'in': 8, 'cm': null, 'lbs': 130, 'kg': null, 'mifflinStJeor': false, 'exerciseLevel': 2, 'bodyFatPercentage': 0.18, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
      expected: { 'bmr': 1417, 'initialTdee': 1948, 'tdee': 2045, 'protein': 74.6, 'fat': 37.3, 'carbs': 352.7 }
    };
  }, 
  metricMaleMSJData     = function() {
    return {
      given: { 'gender': 'male', 'age': 20, 'isMetric': true, 'ft': null, 'in': null, 'cm': 152, 'lbs': null, 'kg': 81.65, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
      expected: { 'bmr': 1672, 'initialTdee': 2298, 'tdee': 2413, 'protein': 125.7, 'fat': 62.9, 'carbs': 336.1 }
    };
  }, 
  metricMaleKMData      = function() {
    return {
      given: { 'gender': 'male', 'age': 20, 'isMetric': true, 'ft': null, 'in': null, 'cm': 152, 'lbs': null, 'kg': 81.65, 'mifflinStJeor': false, 'exerciseLevel': 2, 'bodyFatPercentage': 0.60, 'goal': 0.85, 'protein': 0.7, 'fat': 0.35 },
      expected: { 'bmr': 1075, 'initialTdee': 1479, 'tdee': 1256, 'protein': 50.3, 'fat': 25.1, 'carbs': 206.9 }
    };
  };


var throwErrorWithNullOrUndefinedValue = function(required, obj, key, func, errorRegex, messageSuffix) {
  var keyAsString = key;
  var keyIsArray = false;

  // Allow messageSuffix to be omitted
  typeof messageSuffix === 'undefined' ? messageSuffix = '' : null;

  if (Array.isArray(key)) {
    keyIsArray = true;
    keyAsString = key.join(' AND ');
  }

  if (required === true) {
    it('throws an Error when "' + keyAsString + '" is null' + messageSuffix, function() {
      keyIsArray ? key.forEach(function(k) { obj[k] = null }) : obj[key] = null;
      expect(function() { func(obj) }).to.throw(Error, errorRegex);
    });

    it('throws an Error when "' + keyAsString + '" is undefined' + messageSuffix, function() {
      keyIsArray ? key.forEach(function(k) { delete obj[k] }) : delete obj[key];
      expect(function() { func(obj) }).to.throw(Error, errorRegex);
    });
  } else {
    it('does not throw an Error when "' + keyAsString + '" is null' + messageSuffix, function() {
      keyIsArray ? key.forEach(function(k) { obj[k] = null }) : obj[key] = null;
      expect(function() { func(obj) }).to.not.throw(Error);
    });

    it('does not throw an Error when "' + keyAsString + '" is undefined' + messageSuffix, function() {
      keyIsArray ? key.forEach(function(k) { delete obj[k] }) : delete obj[key];
      expect(function() { func(obj) }).to.not.throw(Error);
    });
  }
};

var mustThrowErrorWithNullOrUndefinedValue = function(obj, key, func, errorRegex, messageSuffix) {
  throwErrorWithNullOrUndefinedValue(true, obj, key, func, errorRegex, messageSuffix);
};

var mustNotThrowErrorWithNullOrUndefinedValue = function(obj, key, func, messageSuffix) {
  throwErrorWithNullOrUndefinedValue(false, obj, key, func, null, messageSuffix);
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
    describe('(gender)', function() {
      mustThrowErrorWithNullOrUndefinedValue(imperialMaleMSJData().given, 'gender', iifym.bmr, /gender must be given/, ' using Mifflin-St Jeor');

      it('throws an Error when "gender" is invalid using Mifflin-St Jeor', function() {
        var data = imperialMaleMSJData();
        data.given['gender'] = 'kangaroo'; 
        expect(function bmrGenderInvalid() { iifym.bmr(data.given) }).to.throw(Error, /Invalid gender/);
      });

      mustNotThrowErrorWithNullOrUndefinedValue(imperialMaleKMData().given, 'gender', iifym.bmr, ' using Katch-McArdle');

      it('does not throw an Error when "gender" is invalid using Katch-McArdle', function() {
        var data = imperialMaleKMData();
        data.given['gender'] = 'kangaroo'; 
        expect(function bmrGenderInvalid() { iifym.bmr(data.given) }).to.not.throw(Error);
      });
    });

    describe('(age)', function() {
      mustThrowErrorWithNullOrUndefinedValue(imperialMaleMSJData().given, 'age', iifym.bmr, /age must be given/, ' using Mifflin-St Jeor');

      it('throws an Error when "age" is less than 0 using Mifflin-St Jeor', function() {
        var data = imperialMaleMSJData();
        data.given['age'] = -1;
        expect(function bmrAgeInvalid() { iifym.bmr(data.given) }).to.throw(Error, /Invalid age/);
      });

      it('throws an Error when "age" is greater than 105 using Mifflin-St Jeor', function() {
        var data = imperialMaleMSJData();
        data.given['age'] = 106;
        expect(function bmrAgeInvalid() { iifym.bmr(data.given) }).to.throw(Error, /Invalid age/);
      });

      mustNotThrowErrorWithNullOrUndefinedValue(imperialMaleKMData().given, 'age', iifym.bmr, ' using Katch-McArdle');

      it('does not throw an Error when "age" is less than 0 using Katch-McArdle', function() {
        var data = imperialMaleKMData();
        data.given['age'] = -1;
        expect(function bmrAgeInvalid() { iifym.bmr(data.given) }).to.not.throw(Error);
      });

      it('does not throw an Error when "age" is greater than 105 using Katch-McArdle', function() {
        var data = imperialMaleKMData();
        data.given['age'] = 106;
        expect(function bmrAgeInvalid() { iifym.bmr(data.given) }).to.not.throw(Error);
      });
    });

    describe('(isMetric)', function() {
      mustThrowErrorWithNullOrUndefinedValue(imperialMaleMSJData().given, 'isMetric', iifym.bmr, /isMetric must be given/, ' using Mifflin-St Jeor');

      it('throws an Error when "isMetric" is invalid using Mifflin-St Jeor', function() {
        var data = imperialMaleMSJData();
        data.given['isMetric'] = "hey";
        expect(function bmrIsMetricInvalid() { iifym.bmr(data.given) }).to.throw(Error, /isMetric must be a boolean/);
      });

      mustThrowErrorWithNullOrUndefinedValue(imperialMaleKMData().given, 'isMetric', iifym.bmr, /isMetric must be given/, ' using Katch-McArdle');

      it('throws an Error when "isMetric" is invalid using Katch-McArdle', function() {
        var data = imperialMaleKMData();
        data.given['isMetric'] = "hey";
        expect(function bmrIsMetricInvalid() { iifym.bmr(data.given) }).to.throw(Error, /isMetric must be a boolean/);
      });
    });

    describe('(height)', function() {
      describe('when isMetric === true,', function() {
        mustThrowErrorWithNullOrUndefinedValue(metricMaleMSJData().given, 'cm', iifym.bmr, /cm must be given when isMetric is true/, ' using Mifflin-St Jeor');

        it('throws an Error when "cm" is less than 0 using Mifflin-St Jeor', function() {
          var data = metricMaleMSJData();
          data.given['cm'] = -1;
          expect(function bmrMetricCmInvalid() { iifym.bmr(data.given) }).to.throw(Error, /cm must be greater than 0/);
        });

        mustNotThrowErrorWithNullOrUndefinedValue(metricMaleKMData().given, 'cm', iifym.bmr, ' using Katch-McArdle');

        it('does not throw an Error when "cm" is less than 0 using Katch-McArdle', function() {
          var data = metricMaleKMData();
          data.given['cm'] = -1;
          expect(function bmrMetricCmInvalid() { iifym.bmr(data.given) }).to.not.throw(Error);
        });
      });

      describe('when isMetric === false,', function() {
        mustThrowErrorWithNullOrUndefinedValue(imperialMaleMSJData().given, ['ft','in'], iifym.bmr, /ft or in.+must be given/, ' using Mifflin-St Jeor');

        it('throws an Error when "ft" is negative using Mifflin-St Jeor', function() {
          var data = imperialMaleMSJData();
          data.given['ft'] = -1;
          data.given['in'] = 1;
          expect(function bmrImperialFtInvalid() { iifym.bmr(data.given) }).to.throw(Error, /ft must be greater than 0/);
        });

        it('throws an Error when "in" is negative using Mifflin-St Jeor', function() {
          var data = imperialMaleMSJData();
          data.given['ft'] = 1;
          data.given['in'] = -1;
          expect(function bmrImperialInInvalid() { iifym.bmr(data.given) }).to.throw(Error, /in must be greater than 0/);
        });

        it('does not throw an Error when "ft" is specified, but "in" is not using Mifflin-St Jeor', function() {
          var data = imperialMaleMSJData();
          delete data.given['in'];
          expect(function bmrImperialInMissing() { iifym.bmr(data.given) }).to.not.throw(Error);
        });

        it('does not throw an Error when "in" is specified, but "ft" is not using Mifflin-St Jeor', function() {
          var data = imperialMaleMSJData();
          delete data.given['ft'];
          expect(function bmrImperialInMissing() { iifym.bmr(data.given) }).to.not.throw(Error);
        });

        mustNotThrowErrorWithNullOrUndefinedValue(imperialMaleKMData().given, ['ft', 'in'], iifym.bmr, ' using Katch-McArdle');

        it('does not throw an Error when "ft" is negative using Katch-McArdle', function() {
          var data = imperialMaleKMData();
          data.given['ft'] = -1;
          data.given['in'] = 1;
          expect(function bmrImperialFtInvalid() { iifym.bmr(data.given) }).to.not.throw(Error)
        });

        it('does not throw an Error when "in" is negative using Katch-McArdle', function() {
          var data = imperialMaleKMData();
          data.given['ft'] = 1;
          data.given['in'] = -1;
          expect(function bmrImperialInInvalid() { iifym.bmr(data.given) }).to.not.throw(Error)
        });
      });
    });

    describe('(weight)', function() {
      describe('when isMetric === true,', function() {
        mustThrowErrorWithNullOrUndefinedValue(metricMaleMSJData().given, 'kg', iifym.bmr, /kg must be given when isMetric is true/, ' using Mifflin-St Jeor');

        it('throws an Error when "kg" is negative using Mifflin-St Jeor', function() {
          var data = metricMaleMSJData();
          data.given['kg'] = -1;
          expect(function bmrMetricKgInvalid() { iifym.bmr(data.given) }).to.throw(Error, /kg must be greater than 0/);
        });

        mustThrowErrorWithNullOrUndefinedValue(metricMaleKMData().given, 'kg', iifym.bmr, /kg must be given when isMetric is true/, ' using Katch-McArdle');
      });

      describe('when isMetric === false,', function() {
        mustThrowErrorWithNullOrUndefinedValue(imperialMaleMSJData().given, 'lbs', iifym.bmr, /lbs must be given when isMetric is false/, ' using Mifflin-St Jeor');

        it('throws an Error when "lbs" is negative using Mifflin-St Jeor', function() {
          var data = imperialMaleMSJData();
          data.given['lbs'] = -1;
          expect(function() { iifym.bmr(data.given) }).to.throw(Error, /lbs must be greater than 0/);
        });
      });
    });

    describe('(mifflinStJeor)', function() {
      mustThrowErrorWithNullOrUndefinedValue(imperialMaleMSJData().given, 'mifflinStJeor', iifym.bmr, /mifflinStJeor must be given/);

      it('throws an Error when mifflinStJeor is invalid', function() {
        var data = imperialMaleMSJData();
        data.given['mifflinStJeor'] = "hey";
        expect(function() { iifym.bmr(data.given) }).to.throw(Error, /mifflinStJeor must be a boolean/);
      });
    });

    describe('(bodyFatPercentage)', function() {
      mustNotThrowErrorWithNullOrUndefinedValue(imperialMaleMSJData().given, 'bodyFatPercentage', iifym.bmr, ' using Mifflin-St Jeor');

      it('does not throw an Error when bodyFatPercentage is negative using Mifflin-St Jeor', function() {
        var data = imperialMaleMSJData();
        data.given['bodyFatPercentage'] = -1;
        expect(function() { iifym.bmr(data.given) }).to.not.throw(Error);
      });

      it('does not throw an Error when bodyFatPercentage is greater than 1 using Mifflin-St Jeor', function() {
        var data = imperialMaleMSJData();
        data.given['bodyFatPercentage'] = 1.2;
        expect(function() { iifym.bmr(data.given) }).to.not.throw(Error);
      });

      mustThrowErrorWithNullOrUndefinedValue(imperialMaleKMData().given, 'bodyFatPercentage', iifym.bmr, /bodyFatPercentage must be given/, ' using Katch-McArdle');

      it('throws an Error when bodyFatPercentage is negative using Katch-McArdle', function() {
        var data = imperialMaleKMData();
        data.given['bodyFatPercentage'] = -1;
        expect(function() { iifym.bmr(data.given) }).to.throw(Error, /bodyFatPercentage must be between 0 and 1/);
      });

      it('throws an Error when bodyFatPercentage is greater than 1 using Katch-McArdle', function() {
        var data = imperialMaleKMData();
        data.given['bodyFatPercentage'] = 1.2;
        expect(function() { iifym.bmr(data.given) }).to.throw(Error, /bodyFatPercentage must be between 0 and 1/);
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

  describe('Validation for', function() {
    describe('(bmr)', function() {
      it('throws an Error when bmr is null', function() {
        expect(function() { iifym.tdee(null, 2) }).to.throw(Error, /bmr must be given/);
      });

      it('throws an Error when bmr is undefined', function() {
        expect(function() { iifym.tdee(undefined, 2) }).to.throw(Error, /bmr must be given/);
      });

      it('throws an Error when bmr is negative', function() {
        expect(function() { iifym.tdee(-200, 2) }).to.throw(Error, /bmr must be greater than 0/);
      });
    });

    describe('(exerciseLevel)', function() {
      it('throws an Error when exerciseLevel is null', function() {
        expect(function() { iifym.tdee(1680, null) }).to.throw(Error, /exerciseLevel must be given/);
      });

      it('throws an Error when exerciseLevel is undefined', function() {
        expect(function() { iifym.tdee(1680, undefined) }).to.throw(Error, /exerciseLevel must be given/);
      });

      it('throws an Error when exerciseLevel is negative', function() {
        expect(function() { iifym.tdee(1680, -1) }).to.throw(Error, /exerciseLevel must be greater than 0/);
      });

      it('throws an Error when exerciseLevel is invalid', function() {
        expect(function() { iifym.tdee(1680, 20) }).to.throw(Error, /exerciseLevel is invalid/);
      });
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

  describe('Validation for', function() {
    describe('(tdee)', function() {
      it('throws an Error when tdee is null', function() {
        expect(function() { iifym.tdeeGoal(null, 0.15) }).to.throw(Error, /tdee must be given/);
      });

      it('throws an Error when tdee is undefined', function() {
        expect(function() { iifym.tdeeGoal(undefined, 0.15) }).to.throw(Error, /tdee must be given/);
      });

      it('throws an Error when tdee is negative', function() {
        expect(function() { iifym.tdeeGoal(-100, 0.15) }).to.throw(Error, /tdee must be greater than 0/);
      });
    });

    describe('(goal)', function() {
      it('throws an Error when goal is null', function() {
        expect(function() { iifym.tdeeGoal(2200, null) }).to.throw(Error, /goal must be given/);
      });

      it('throws an Error when goal is undefined', function() {
        expect(function() { iifym.tdeeGoal(2200, undefined) }).to.throw(Error, /goal must be given/);
      });

      it('throws an Error when goal is less than 0.25', function() {
        expect(function() { iifym.tdeeGoal(2200, 0.24) }).to.throw(Error, /goal must be between 0.25 and 3.0 \[0.75 to 1.15 recommended\]/);
      });

      it('throws an Error when goal is greater than 3.0', function() {
        expect(function() { iifym.tdeeGoal(2200, 3.1) }).to.throw(Error, /goal must be between 0.25 and 3.0 \[0.75 to 1.15 recommended\]/);
      });
    });
  });
});

describe('macros()', function() {
  testData.forEach(function(d, i) {
    // macros() is not currently expected to perform metric conversions or lean
    // mass calculations. So, in the interest of laziness, skip all the data
    // that is in metric.  Theoretically, this isn't a problem because it is
    // still tested in at least the calculate() function. However, if it
    // becomes an issue, this test case can be made more thorough.
    if (d.given['isMetric'] === false && d.given['mifflinStJeor'] === true) {
      var results = iifym.macros(d.expected['tdee'], d.given['lbs'], d.given['protein'], d.given['fat']);

      // Allow +/- 1.5 grams. Since the calories might be off, the
      // grams could be too.
      ['protein', 'fat', 'carbs'].forEach(function(key) {
        describe('results["' + key + '"] (' + i + ')', function() {
          it('returns the correct amount of ' + key, function() {
            expect(results[key]).to.be.within(d.expected[key] - 1.5, d.expected[key] + 1.5);
          });
        });
      });
    }
  });
});

describe('calculate()', function() {
 testData.forEach(function(d, i) {
   var results = iifym.calculate(d.given);

   // Allow +/- 10 calories. See bmr() test.
   ['bmr', 'initialTdee', 'tdee'].forEach(function(key) {
     describe('results["' + key + '"] (' + i + ')', function() {
       it('returns the correct value for ' + key, function() { 
         expect(results[key]).to.be.within(d.expected[key] - 10, d.expected[key] + 10);
       });
     });
   });

   // Allow +/- 1.5 grams. Since the calories might be off, the
   // grams could be too.
   ['protein', 'fat', 'carbs'].forEach(function(key) {
     describe('results["' + key + '"] (' + i + ')', function() {
       it('returns the correct amount of ' + key, function() {
         expect(results[key]).to.be.within(d.expected[key] - 1.5, d.expected[key] + 1.5);
       });
     });
   });
 });
});
