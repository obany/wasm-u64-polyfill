async function run() {

    const js = await import("./wasm-u64-test/pkg/wasm_u64_test.js");
    await js.default();
    const u64 = js.get_u64();
    const f64 = js.get_f64();
    const u64a = js.get_u64_array();

    const div = document.getElementById("output");

    div.innerHTML += "Reading from WASM<br/><br/>";
    div.innerHTML += "u64: " + u64 + "<br/>";
    div.innerHTML += "f64:" + f64 + "<br/>";
    div.innerHTML += "u64 array: " + u64a.join(",") + "<br/>";

    const u64Max = BigInt("0xFFFFFFFFFFFFFFFF");
    const f64Max = Number.MAX_SAFE_INTEGER;

    u64a[0] = BigInt(1);
    u64a[1] = BigInt(2);

    div.innerHTML += "<br/>Writing to WASM<br/><br/>";
    div.innerHTML += js.set_u64(BigInt(13456)) + "<br/>";
    div.innerHTML += js.set_u64(u64Max) + "<br/>";
    div.innerHTML += js.set_f64(f64Max) + "<br/>";
    div.innerHTML += js.set_u64_array(u64a) + "<br/>";
}

run()
    .catch(err => alert(err));