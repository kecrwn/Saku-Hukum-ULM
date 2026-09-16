const { search } = require('duck-duck-scrape');
async function test() {
  try {
    const res = await search("what is crime");
    console.log("Success:", res.results.length > 0);
  } catch (e) {
    console.error("Failed:", e.message);
  }
}
test();
