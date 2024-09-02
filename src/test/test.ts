import assert from 'assert'
import { formatSLR } from '../formatter'

try {
    assert.strictEqual(formatSLR("not a number"), "Invalid Number")
    assert.strictEqual(formatSLR(12467, { prefix: false }), "12,467.00")
    assert.strictEqual(formatSLR(34.5), "Rs.34.50")

    console.log("All tests passed");

} catch (error) {
    console.log(error);

}
