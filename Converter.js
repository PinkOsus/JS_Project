function convert() {
    let inputValue = parseFloat(document.getElementById("textbox").value);
    let fromUnit = document.getElementById("measure").value;
    let toUnit = document.getElementById("measureConvert").value;
    let result = document.getElementById("result");

    if (isNaN(inputValue)) {
        result.textContent = "Please enter a valid number";
        return;
    }

    let conversionRates = {
        
        // Length/Distance
        meters: { meters: 1, centimeters: 100, kilometers: 0.001 },
        centimeters: { meters: 0.01, centimeters: 1, kilometers: 0.00001 },
        kilometers: { meters: 1000, centimeters: 100000, kilometers: 1 },

        // Mass/Weight
        grams: { grams: 1, kilograms: 0.001, pounds: 0.00220462 },
        kilograms: { grams: 1000, kilograms: 1, pounds: 2.20462 },
        pounds: { grams: 453.592, kilograms: 0.453592, pounds: 1 },

        // Time
        seconds: { seconds: 1, minutes: 1 / 60, hours: 1 / 3600 },
        minutes: { seconds: 60, minutes: 1, hours: 1 / 60 },
        hours: { seconds: 3600, minutes: 60, hours: 1 },

        // Temperature (Handled separately)
        celsius: { fahrenheit: (inputValue * 9/5) + 32, kelvin: inputValue + 273.15 },
        fahrenheit: { celsius: (inputValue - 32) * 5/9, kelvin: ((inputValue - 32) * 5/9) + 273.15 },
        kelvin: { celsius: inputValue - 273.15, fahrenheit: ((inputValue - 273.15) * 9/5) + 32 },

        // Volume
        liters: { liters: 1, milliliters: 1000, gallons: 0.264172 },
        milliliters: { liters: 0.001, milliliters: 1, gallons: 0.000264172 },
        gallons: { liters: 3.78541, milliliters: 3785.41, gallons: 1 },

        // Speed/Velocity
        Meterspersecond: { Meterspersecond: 1, "kilometer perhour": 3.6, milesperhour: 2.23694 },
        "kilometer perhour": { Meterspersecond: 0.277778, "kilometer perhour": 1, milesperhour: 0.621371 },
        milesperhour: { Meterspersecond: 0.44704, "kilometer perhour": 1.60934, milesperhour: 1 }
    };

    let convertedValue;

    if (fromUnit in conversionRates && toUnit in conversionRates[fromUnit]) {
        convertedValue = inputValue * conversionRates[fromUnit][toUnit];
    } else if (fromUnit === "celsius" || fromUnit === "fahrenheit" || fromUnit === "kelvin") {
        convertedValue = conversionRates[fromUnit][toUnit]; 
    } else {
        result.textContent = "Conversion not available";
        return;
    }

    result.textContent = `${inputValue} ${fromUnit} = ${convertedValue.toFixed(4)} ${toUnit}`;
}
