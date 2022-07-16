import { Expect } from '@japa/expect'

declare module '@japa/runner' {
  interface TestContext {
    expect: Expect
  }
}
