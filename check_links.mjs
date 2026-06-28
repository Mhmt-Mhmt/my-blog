const res = await fetch('http://localhost:3001/');
const html = await res.text();
const section = html.match(/<a rel="me"[^>]*>[\s\S]*?<\/a>/g);
if (section) {
  section.forEach((l, i) => {
    console.log(i, l.substring(0, 400));
    console.log('---');
  });
} else {
  console.log('No matches');
}
