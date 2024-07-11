import { test } from 'node:test'
import assert from 'node:assert'
import { add } from '../src/main.js'

test('1 + 1 is 2', () => {
  assert.strictEqual(add(1, 1), 2)
})
