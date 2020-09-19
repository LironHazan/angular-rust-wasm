mod utils;
mod artists;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, RequestMode, Response};
use crate::artists::ArtistInfo;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, rust-wasm-part!");
}

// Following POC inspired by https://github.com/rustwasm/wasm-bindgen/tree/master/examples/fetch

#[wasm_bindgen]
pub async fn query_band(name: String) -> Result<JsValue, JsValue> {
  let mut opts = RequestInit::new();
  opts.method("GET");
  opts.mode(RequestMode::Cors);

  let url = format!("https://www.theaudiodb.com/api/v1/json/1/search.php?s={}", name);

  let request = Request::new_with_str_and_init(&url, &opts)?;

  request.headers().set("Accept", "application/json")?;

  let window = web_sys::window().unwrap();
  let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;

  // `resp_value` is a `Response` object.
  assert!(resp_value.is_instance_of::<Response>());
  let resp: Response = resp_value.dyn_into().unwrap();

  // Convert this other `Promise` into a rust `Future`.
  let json = JsFuture::from(resp.json()?).await?;

  // Use serde to parse the JSON into a struct.
  let info: ArtistInfo = json.into_serde().unwrap();
  let artist = info.artists.first();


  // Send struct back to JS as an `Object`.
  Ok(JsValue::from_serde(&artist).unwrap())
}
