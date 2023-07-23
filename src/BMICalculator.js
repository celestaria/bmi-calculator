import React, { useState, useEffect } from 'react';

function UnitSelector({ onUnitChange }) {
  const [unit, setUnit] = useState({
    weight: 'kg',
    height: 'cm',
  });

  useEffect(() => {
    const userLanguage = navigator.language.toLowerCase();
    const isUserFromUS = userLanguage === 'en-us';

    if (isUserFromUS) {
      setUnit({
        weight: 'lb',
        height: 'in', 
      });
    } else {
      setUnit({
        weight: 'kg',
        height: 'cm',
      });
    }
  }, [navigator.language]);

  return (
    <div>
      <h2>Unit Selector</h2>
      <div>
        <label>Weight Unit:</label>
        <select
          value={unit.weight}
          onChange={(e) => setUnit({ ...unit, weight: e.target.value })}
        >
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select>
      </div>
      <div>
        <label>Height Unit:</label>
        <select
          value={unit.height}
          onChange={(e) => setUnit({ ...unit, height: e.target.value })}
        >
          <option value="cm">cm</option>
          <option value="in">in</option>
        </select>
      </div>
    </div>
  );
}

function BMICalculator() {
  const [unit, setUnit] = useState({
    weight: '',
    height: '',
  });
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');

  const calculateBMI = () => {
    if (unit.weight && unit.height) {
      const weight = parseFloat(unit.weight);
      let height = parseFloat(unit.height);

      if (unit.height === 'in') {
        const feet = parseFloat(unit.feet);
        const inches = parseFloat(unit.inches);
        height = feet * 12 + inches;
      }

      const bmiValue = (weight / (height * height)) * 703;
      setBMI(bmiValue.toFixed(2));
      colorBMI(bmiValue);
    } else {
      setBMI(null);
      setBMICategory('');
    }
  };

  const colorBMI = (bmi) => {
    if (bmi < 18.5) {
      setBMICategory('underweight');
    } else if (bmi >= 18.5 && bmi < 25) {
      setBMICategory('normal');
    } else if (bmi >= 25 && bmi < 30) {
      setBMICategory('overweight');
    } else {
      setBMICategory('obese');
    }
  };

  const convertToFeetAndInches = (height) => {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return (unit.height)
  };

  return (
    <div>
      <h1>BMI Calculator</h1>
      <UnitSelector onUnitChange={setUnit} />
      <div>
        <label>Weight ({unit.weight}):</label>
        <input
          type="number"
          value={unit.weight}
          onChange={(e) => setUnit({ ...unit, weight: e.target.value })}
        />
      </div>
      <div>
        <label>
          Height (
            {unit.height
            ? convertToFeetAndInches(unit.feet)
            : unit.height}
        ):
        </label>
        {unit.height === 'in' ? (
          <div>
            <input
              type="number"
              value={unit.feet}
              onChange={(e) => setUnit({ ...unit, feet: e.target.value })}
            />
            <span>ft</span>
            <input
              type="number"
              value={unit.inches}
              onChange={(e) => setUnit({ ...unit, inches: e.target.value })}
            />
            <span>in</span>
          </div>
        ) : (
          <input
            type="number"
            value={unit.height}
            onChange={(e) => setUnit({ ...unit, height: e.target.value })}
          />
        )}
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi && (
        <p id="colorBMI" className={`bmi ${bmiCategory}`}>
          Your BMI is: {bmi}
        </p>
      )}
      {bmiCategory && (
        <p id="bmiCategory" className={`bmi-category ${bmiCategory}`}>
          BMI Category: {bmiCategory}
        </p>
      )}
    </div>
  );
}

export default BMICalculator;