"use strict";

var all_bubbles = {
        start: {
            x: 0,
            y: 0,
            r: 100,
            title: "Click here!",
            facts: "Welcome to 'Hmm', the sanctuary of knowledge and understanding! To get started, you can drag yourself anywhere using the mouse. The arrow keys can also be used. Click any named bubble (like this one!) to view its info box. Try to follow the connecting lines upwards. The higher you go, the more you've transcended all of mathematics! If you get stuck, try mastering the preliminaries first.\nhjkl can also be used for scrolling. Press 'd' for Dev-view."
        },

        axioms: {
            x: 600,
            y: -600,
            r: 60,
            title: "Axioms",
            facts: "A statement that is so evident or well-established, that it is accepted without controversy or question. Thus, the axiom can be used as the premise or starting point for further reasoning or arguments"
        },

        oneplusone: {
            x: 825,
            y: -650,
            r: 45,
            title: "1 + 1 = 2",
            facts: "Considered by many as the most elementary equation. In order to prove this equation we need to have laid down a number of axioms. Peano axioms is examples. Others might looks at this as a definition in itself."
        },

        arithmetic: {
            x: -600,
            y: -950,
            r: 80,
            title: "Arithmetic",
            facts: "Arithmetic or arithmetics (from the Greek ἀριθμός arithmos, \"number\") is the oldest and most elementary branch of mathematics. It consists of the study of numbers, especially the properties of the traditional operations between them—addition, subtraction, multiplication and division. Arithmetic is an elementary part of number theory, and number theory is considered to be one of the top-level divisions of modern mathematics, along with algebra, geometry, and analysis. The terms arithmetic and higher arithmetic were used until the beginning of the 20th century as synonyms for number theory and are sometimes still used to refer to a wider part of number theory."
        },

        addition: {
            x: -600,
            y: -1600,
            r: 100,
            title: "Addition",
            facts: "Addition (often signified by the plus symbol \"+\") is one of the four basic operations of arithmetic, with the others being subtraction, multiplication and division. The addition of two whole numbers is the total amount of those quantities combined. For example, in the picture on the right, there is a combination of three apples and two apples together, making a total of five apples. This observation is equivalent to the mathematical expression \"3 + 2 = 5\" i.e., \"3 add 2 is equal to 5\"."
        },

        equality: {
            x: 600,
            y: -1200,
            r: 60,
            title: "Equality",
            facts: "Equality is a relationship between two quantities or, more generally two mathematical expressions, asserting that the quantities have the same value, or that the expressions represent the same mathematical object. The equality between A and B is written A = B, and pronounced A equals B. The symbol \"=\" is called an \"equals sign\""
        },

        equality_reflexivity: {
            x: 800,
            y: -1600,
            r: 60,
            title: "Reflexivity",
            facts: "The Reflexive Property states that for every real number x, x = x. This is an axiom of mathematics. It can be explored by testing any number for x. If x is 2, then 2 = 2, which is true. This will work for any number."
        },

        equality_symmetry: {
            x: 400,
            y: -1600,
            r: 60,
            title: "Symmetry",
            facts: "The Symmetric Property states that for all real numbers x and y, if x = y , then y = x."
        },

        equality_transitive: {
            x: 0,
            y: -1600,
            r: 60,
            title: "Transitive",
            facts: "The Transitive Property states that for all real numbers x, y, and z, if x = y, and y = z, then x = z."
        }

    },

    all_curves = {
        start_to_axioms: {
            begin: "start",
            end: "axioms"
        },

        axiom_to_equality: {
            begin: "axioms",
            end: "equality"
        },

        eq_to_sym: {
            begin: "equality",
            end: "equality_symmetry"
        },

        axiom_to_arith: {
            begin: "axioms",
            end: "arithmetic"
        },

        axiom_to_oneplusone: {
            begin: "axioms",
            end: "oneplusone"
        },

        arith_to_add: {
            begin: "arithmetic",
            end: "addition"
        },

        eq_to_trans: {
            begin: "equality",
            end: "equality_transitive"
        },

        eq_to_ref: {
            begin: "equality",
            end: "equality_reflexivity"
        },

        eq_to_sym: {
            begin: "equality",
            end: "equality_symmetry"
        }
    };
