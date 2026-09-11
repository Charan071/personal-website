"""Embed the website's styles, script, and images into the design previews."""
from pathlib import Path
import base64
import json
import re

root = Path(__file__).resolve().parent.parent
design = root / 'design'
art = (root / 'index.html').read_text()
art = art.replace('<link rel="stylesheet" href="assets/css/styles.css">',
                  '<style>\n' + (root / 'assets/css/styles.css').read_text() + '</style>')
art = art.replace('<script src="assets/js/main.js" defer></script>',
                  '<script>\n' + (root / 'assets/js/main.js').read_text() + '</script>')
for name in ('workspace-clean.png', 'plane.png'):
    asset = root / 'assets/images' / name
    art = art.replace(f'assets/images/{name}', 'data:image/png;base64,' + base64.b64encode(asset.read_bytes()).decode())
canvas = design / 'charan-naik-portfolio.html'
source = canvas.read_text()
match = re.search(r'(<script[^>]*id="appifact-doc"[^>]*>)(.*?)(</script>)', source, re.S)
if match is None:
    raise ValueError('Design canvas is missing its appifact-doc payload')
data = json.loads(match.group(2))
data['content']['files']['Main.dc.html'] = art
payload = json.dumps(data).replace('</script', '<\\/script')
(design / 'Main.dc.html').write_text(art)
canvas.write_text(source[:match.start(2)] + payload + source[match.end(2):])
print('Updated design/Main.dc.html and design/charan-naik-portfolio.html')
