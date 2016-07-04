"use strict";

var all_bubbles = {
        start: {
            x: 0,
            y: 0,
            r: 100,
            title: "Click here!",
            facts: "Welcome to 'Hmm', the sanctuary of mathematics! To get started, you can drag yourself anywhere using the mouse. The arrow keys, 'wasd', or 'hjkl' can also be used."
        },
        music: {
            x: 0,
            y: -1000,
            r: 100,
            title: "Music",
            facts: "To change the mute state of music and sounds, press 'm'. You can also click the top-left music button."
        },
        fullscreen: {
            x: 0,
            y: -2000,
            r: 100,
            title: "Fullscreen",
            facts: "'Hmm' is best enjoyed in full screen. Most browsers support this. Press F11 to enter or exit fullscreen mode."
        },
        zoom: {
            x: 0,
            y: -3000,
            r: 100,
            title: "Zoom",
            facts: "You can use the +/- buttons or the scroll wheel to zoom in our out."
        },

        mouseless: {
            x: 0,
            y: -4000,
            r: 100,
            title: "Mouseless",
            facts: "You can select a node if it's centered, press the space bar to open or close the info window."
        },
        goal: {
            x: 0,
            y: -5000,
            r: 100,
            title: "Goal",
            facts: "Your goal is to dive deep into the beauty of mathematics, or not. It's up to you, and you alone."
        },
        devmode: {
            x: 1500,
            y: -5000,
            r: 100,
            title: "Dev-mode",
            facts: "A little more information is available by pressing 'e'. This opens up 'Developer mode'. It just shows you your current position and the mouse position."
        },
        numbers: {
            x: 0,
            y: -10000,
            r: 100,
            title: "Numbers",
            facts: "Numbers are mathematical objects. A number can represent a quantity. There are many types of numbers. '1' is a number. '9.8' is also a number."
        },
        natural_numbers: {
            x: 0,
            y: -12000,
            r: 100,
            title: "Natural Numbers",
            facts: "Natural numbers are whole numbers. They do not have a '.' in the number. 10 is natural number. 8932 is a natural number. -3 is not a natural number, because it has a minus sign (-). 5.5 is not a natural number because it contains a dot '.'."
        },
        natural_numbers_addition: {
            x: -3000,
            y: -12000,
            r: 100,
            title: "Addition",
            facts: "You can add natural numbers together. This creates a new number. The symbol for adding is '+' (called plus). You put two natural numbers on either side of the plus: 3 + 4. The expression 3 + 4 is the same as the number 7."
        },
        natural_numbers_subtraction: {
            x: -3000,
            y: -14000,
            r: 100,
            title: "Subtraction",
            facts: "You can subtract natural numbers. This creates a new number. The symbol for subtracting is '-' (called minus). You put two natural numbers on either side of the minus: 4 - 3. The expression 4 - 3 is the same as the number 1. The expression 10 - 2 is the same as the number 8."
        },
        integers: {
            x: 0,
            y: -16000,
            r: 100,
            title: "Integers",
            facts: "Remember from 'Natural Numbers' that -1 is not a natural number, because it has a minus sign in the number. When you subtract: 3 - 4, you will not get a natural number. The expression 3 - 4 evaluates to -1. This is not a natural number. One type of number can create other types of numbers. All natural numbers are also integers, but not all integers are natural numbers."
        },
        natural_multiplication: {
            x: -5000,
            y: -14000,
            r: 100,
            title: "Multiplication",
            facts: "Multiplication is an operation on two natural numbers. It always generates a new natural number. It can not create a non-natural number. We use the (*) or (x) symbol for multiplication. The expression 5 x 4 is the same as the number 20. The expression can be read as (5 + 5 + 5 + 5). There are 4 fives, which are added together. This means that 3 x 6 is the same as (3 + 3 + 3 + 3 + 3 + 3). This number is 18."
        },
        integer_addition: {
            x: 0,
            y: -18000,
            r: 100,
            title: "Integer Addition",
            facts: "Adding integers is very similar to natural numbers. 4 and 5 are both natural numbers as well as integer numbers. Adding them gives 9. This is also a natural number and an integer number. Integers can be negative. This means they have a minus sign in the number. The expression 5 + -3 contains two numbers, '5', and '-3'. When you see a '+ -', you can replace the '+ -' by just '-'. You then get '5 - 3', which is subtraction."
        },
    },

    all_curves = {

        start_to_music: {
            begin: "start",
            end: "music"
        },
        music_to_fullscreen: {
            begin: "music",
            end: "fullscreen"
        },
        fullscreen_to_zoom: {
            begin: "fullscreen",
            end: "zoom"
        },
        zoom_to_mouseless: {
            begin: "zoom",
            end: "mouseless"
        },
        mouseless_to_goal: {
            begin: "mouseless",
            end: "goal"
        },
        goal_to_devmode: {
            begin: "goal",
            end: "devmode"
        },
        goal_to_numbers: {
            begin: "goal",
            end: "numbers"
        },
        numbers_to_natural_numbers: {
            begin: "numbers",
            end: "natural_numbers"
        },
        natural_numbers_to_natural_numbers_addition: {
            begin: "natural_numbers",
            end: "natural_numbers_addition"
        },
        natural_numbers_addition_to_natural_multiplication: {
            begin: "natural_numbers_addition",
            end: "natural_multiplication"
        },
        natural_numbers_to_natural_numbers_subtraction: {
            begin: "natural_numbers",
            end: "natural_numbers_subtraction"
        },
        natural_numbers_to_integers: {
            begin: "natural_numbers",
            end: "integers"
        },
        natural_numbers_subtraction_to_integers: {
            begin: "natural_numbers_subtraction",
            end: "integers"
        },
        integers_to_integer_addition: {
            begin: "integers",
            end: "integer_addition"
        },
    };
