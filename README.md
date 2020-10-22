# WASM U64 Polyfill

The code in `wasmU64Polyfill.js` can be included in any projects that use the u64 type to interop with WASM.

More specificaly this polyfills a subset of the missing BigUint64Array type which is not currently available on Safari.

You can see the `wasm-u64-test` example running at [https://wasm-u64-polyfill.vercel.app/](https://wasm-u64-polyfill.vercel.app/) which should work on all browsers including Safari.