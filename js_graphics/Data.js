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
