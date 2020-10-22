extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use std::fmt;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
pub fn get_u64() -> u64 {
    123456
}

#[wasm_bindgen]
pub fn get_u64_array() -> Vec<u64> {
    vec![0, std::u64::MAX]
}


#[wasm_bindgen]
pub fn get_f64() -> f64 {
    std::u64::MAX as f64
}

#[wasm_bindgen]
pub fn set_u64(a: u64) -> String {
    let mut output = String::new();
    fmt::write(&mut output, format_args!("u64: {}", a));
    console_log!("internal {}", output);
    output.into()
}

#[wasm_bindgen]
pub fn set_f64(a: f64) -> String {
    let mut output = String::new();
    fmt::write(&mut output, format_args!("f64: {}", a));
    console_log!("internal {}", output);
    output.into()
}

#[wasm_bindgen]
pub fn set_u64_array(a: Vec<u64>) -> String {
    let mut output = String::new();
    fmt::write(&mut output, format_args!("u64: array {:?}", a));
    console_log!("internal {}", output);
    output.into()
}

