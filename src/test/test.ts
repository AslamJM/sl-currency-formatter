import assert from 'assert'
import { formatSLR } from '../formatter'

try {
    assert.throws(() => formatSLR("not a number"))
    assert.strictEqual(formatSLR(12467, { prefix: false }), "12,467.00")
    assert.strictEqual(formatSLR(34.5), "Rs.34.50")

    assert.strictEqual(formatSLR(10 * 1.36, { prefix: false }), "13.60")
    assert.strictEqual(formatSLR(0.2 + 0.1, { prefix: false }), "00.30")

    console.log("All tests passed");

} catch (error) {
    console.log(error);

}
