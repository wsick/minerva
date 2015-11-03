module minerva.tests.primitives.matrix {
    QUnit.module("primitives.matrix4");

    function typedToArray(typed) {
        var arr = [];
        for (var i = 0; i < typed.length; i++) {
            arr.push(typed[i]);
        }
        return arr;
    }

    QUnit.test("transpose", () => {
        var actual = mat4.create([
             1,  2,  3,  4,
             5,  6,  7,  8,
             9, 10, 11, 12,
            13, 14, 15, 16
        ]);
        var expected = [
            1, 5,  9, 13,
            2, 6, 10, 14,
            3, 7, 11, 15,
            4, 8, 12, 16
        ];

        var transpose = mat4.create();
        mat4.transpose(actual, transpose);
        deepEqual(typedToArray(transpose), expected);

        //in-place
        actual = mat4.create([
             1,  2,  3,  4,
             5,  6,  7,  8,
             9, 10, 11, 12,
            13, 14, 15, 16
        ]);
        mat4.transpose(actual);
        deepEqual(typedToArray(actual), expected);
    });
}