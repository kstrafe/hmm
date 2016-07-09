"use strict";

var all_bubbles = {
    start: {
        x: 0,
        y: 0,
        r: 100,
        link: ["music"],
        title: "Click here!",
        facts: "Welcome to 'Hmm', the sanctuary of mathematics! To get started, you can drag yourself anywhere using the mouse. The arrow keys, 'wasd', or 'hjkl' can also be used."
    },
    music: {
        x: 0,
        y: -1000,
        r: 100,
        link: ["fullscreen"],
        title: "Music",
        facts: "To change the mute state of music and sounds, press 'm'. You can also click the top-left music button."
    },
    fullscreen: {
        x: 0,
        y: -2000,
        r: 100,
        link: ["zoom"],
        title: "Fullscreen",
        facts: "'Hmm' is best enjoyed in full screen. Most browsers support this. Press F11 to enter or exit fullscreen mode."
    },
    zoom: {
        x: 0,
        y: -3000,
        r: 100,
        link: ["mouseless"],
        title: "Zoom",
        facts: "You can use the +/- buttons or the scroll wheel to zoom in our out."
    },
    mouseless: {
        x: 0,
        y: -4000,
        r: 100,
        link: ["goal"],
        title: "Mouseless",
        facts: "You can select a node if it's centered, press the space bar to open and any move to close the info window."
    },
    goal: {
        x: 0,
        y: -5000,
        r: 100,
        link: ["devmode", "numbers"],
        title: "Goal",
        facts: "Your goal is to dive deep into the beauty of mathematics, or not. It's up to you, and you alone."
    },
    devmode: {
        x: 1500,
        y: -5000,
        r: 100,
        link: [],
        title: "Dev-mode",
        facts: "A little more information is available by pressing 'e'. This opens up 'Developer mode'. It just shows you your current position and the mouse position."
    },
    numbers: {
        x: 0,
        y: -10000,
        r: 100,
        link: ["natural_numbers", "number_system"],
        title: "Numbers",
        facts: "Numbers are mathematical objects. A number can represent a quantity. There are many types of numbers. '1' is a number. '9.8' is also a number."
    },
    number_system: {
        x: 600,
        y: -10500,
        r: 100,
        link: [],
        title: "Number System",
        facts: "The decimal number system is made up of ten symbols: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0. The least significant digit is the rightmost digit. This means that 10 is greater than 1. When we compare, we can pad digits so they become the same length. 10 and 1 can be seen as 10 and 01. A zero to the left does not change the number. A zero to the right does change the number."
    },
    natural_numbers: {
        x: 0,
        y: -12000,
        r: 100,
        link: ["natural_numbers_addition", "natural_numbers_subtraction", "integers"],
        title: "Natural Numbers",
        facts: "Natural numbers are whole numbers. They do not have a '.' in the number. 10 is natural number. 8932 is a natural number. -3 is not a natural number, because it has a minus sign (-). 5.5 is not a natural number because it contains a dot '.'."
    },
    natural_numbers_addition: {
        x: -3000,
        y: -12000,
        r: 100,
        link: ["natural_multiplication"],
        title: "Addition",
        facts: "You can add natural numbers together. This creates a new number. The symbol for adding is '+' (called plus). You put two natural numbers on either side of the plus: 3 + 4. The expression 3 + 4 is the same as the number 7."
    },
    natural_numbers_subtraction: {
        x: -3000,
        y: -14000,
        r: 100,
        link: ["integers", "integer_division"],
        title: "Subtraction",
        facts: "You can subtract natural numbers. This creates a new number. The symbol for subtracting is '-' (called minus). You put two natural numbers on either side of the minus: 4 - 3. The expression 4 - 3 is the same as the number 1. The expression 10 - 2 is the same as the number 8."
    },
    integer_division: {
        x: -3000,
        y: -16500,
        r: 100,
        link: ["remainder", "rationals"],
        title: "Division",
        facts: "We divide using the '/' symbol. Two integers on either side can create a new number. The left side is the 'numerator', and the right side is the 'denominator'. The expression 6 / 2 is the same as 3, and integer and natural number. The expression -8 / 2 is the same as -(8 / 2), which is the same as - ( 4 ), which is the same as -4, an integer. What does division mean? It means how often can we subtract the denominator from the numerator until it becomes zero? From 6 we can subtract 2, three times: 6 / 2 is the same as 3. The expression 6 - 2 - 2 - 2 becomes 0."
    },
    rationals: {
        x: -1200,
        y: -17500,
        r: 100,
        link: [],
        title: "Rationals",
        facts: "You have seen integer division. What if the subtraction of the denominator from the numerator doesn't go to 0? Remember that with the expression 6 / 2, we subtract the right side from the left side (of the / sign) until the left side is 0. What if we have something like 5 / 2? Let's try: 5 - 2 = 3. Now we have 3. 3 -  2 = 1. If we subtract 2 once again, we get -1, an integer. So we can not divide the number. 1 is called the remainder. We can create a new type of number. We call this number a 'Rational Number'. It is called rational because it is defined by a ratio of two numbers. The expression 5 / 2 is 2.5 in decimal notation, because the remainder is only half (0.5) that of 2."
    },
    remainder: {
        x: -3000,
        y: -17000,
        r: 100,
        link: [],
        title: "Remainder",
        facts: "If you divide a number, you subtract the denominator from the numerator until the numerator is zero. Sometimes, the subtraction hops over the zero. In the expression 7 / 3, we first subtract via 7 - 3, which is 4. Then we subtract via 4 - 3, which is 1. Then we subtract via 1 - 3, which is -2. We have hopped over 0. If we want integer division, we use what we call a 'remainder'. We go back and look at the number that was before the jump over 0. This was 1. So we can now say: 7 / 3 is the same as 2, with remainder 1. Why is it 2? Because we could subtract 2 times."
    },
    integer_mul: {
        x: 1400,
        y: -16900,
        r: 100,
        link: [],
        title: "Integer Multiplication",
        facts: "When multiplying two integers (using the * or x symbol), you will always get a new integer. 4 x 3 is 12. Remember, integers can be negative, like -5. The expression -5 x 2 is -10, which is an integer. When you multiply negative number, you can move them 'out' of the multiplication: -5 x 2 can be written as -(5 x 2). You can now calculate 5 x 2, which is 10. You put 10 where 5 x 2 is: -(10). You remove the parentheses, and get -10."
    },
    integers: {
        x: 0,
        y: -16000,
        r: 100,
        link: ["integer_division", "rationals", "integer_mul", "integer_addition"],
        title: "Integers",
        facts: "Remember from 'Natural Numbers' that -1 is not a natural number, because it has a minus sign in the number. When you subtract: 3 - 4, you will not get a natural number. The expression 3 - 4 evaluates to -1. This is not a natural number. One type of number can create other types of numbers. All natural numbers are also integers, but not all integers are natural numbers."
    },
    natural_multiplication: {
        x: -5000,
        y: -14000,
        r: 100,
        title: "Multiplication",
        link: [],
        facts: "Multiplication is an operation on two natural numbers. It always generates a new natural number. It can not create a non-natural number. We use the (*) or (x) symbol for multiplication. The expression 5 x 4 is the same as the number 20. The expression can be read as (5 + 5 + 5 + 5). There are 4 fives, which are added together. This means that 3 x 6 is the same as (3 + 3 + 3 + 3 + 3 + 3). This number is 18."
    },
    integer_addition: {
        x: 0,
        y: -18000,
        r: 100,
        link: [],
        title: "Integer Addition",
        facts: "Adding integers is very similar to natural numbers. 4 and 5 are both natural numbers as well as integer numbers. Adding them gives 9. This is also a natural number and an integer number. Integers can be negative. This means they have a minus sign in the number. The expression 5 + -3 contains two numbers, '5', and '-3'. When you see a '+ -', you can replace the '+ -' by just '-'. You then get '5 - 3', which is subtraction."
    },
    integral: {
        x: 0,
        y: -18500,
        r: 100,
        link: [],
        title: "Integration",
        facts: "$$\\int$$ is the integration symbol, it means \"to sum\" over an infinitesimally small intervals."
    },
};
