import two_crystal_balls from "@code/TwoCrystalBalls";

test("two crystal balls", function () {
    // random number where we can set the array to true.
    let idx = Math.floor(Math.random() * 10000);

    // fill array with false.
    const data = new Array(10000).fill(false);

    // From after random number generated in var idx, make indexs value true.
    for (let i = idx; i < 10000; ++i) {
        data[i] = true;
    }

    expect(two_crystal_balls(data)).toEqual(idx);
    expect(two_crystal_balls(new Array(821).fill(false))).toEqual(-1);
});
