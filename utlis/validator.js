const validator = {
    validate: function (rules, obj) {
        const objKeys = Object.keys(obj);
        for (let i = 0; i < objKeys.length; i++) {
            const key = objKeys[i] //every single field
            if (rules[key] !== undefined) {
                //check here
                const rule = rules[key];
                const ruleName = rule.name;
                const result = validator[ruleName](obj[key], rule.value)
                if (!result) {
                    console.log(`${key} violated ${ruleName}`);
                }
            }
        }
    },

    notEmpty: function(input) {
        return input.length > 0;
    },

    minLength: function(input, value) {
        return input.length >= value;
    },

    isEmail: function(value) {
        return true;
    },

    matched: function(input, value) {
        return input == value;
    },
};

export default validator;