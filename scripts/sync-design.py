"""Keep the standalone design and embedded canvas in sync with index.html."""
from pathlib import Path
import base64
import json
import re

root = Path(__file__).resolve().parent.parent
art = (root / 'index.html').read_text()
for name in ('workspace-clean.png', 'plane.png'):
    asset = root / 'assets' / name
    art = art.replace(f'assets/{name}', 'data:image/png;base64,' + base64.b64encode(asset.read_bytes()).decode())
(root / 'Main.dc.html').write_text(art)
canvas = root / 'charan-naik-portfolio.html'
source = canvas.read_text()
match = re.search(r'(<script[^>]*id="appifact-doc"[^>]*>)(.*?)(</script>)', source, re.S)
data = json.loads(match.group(2))
data['content']['files']['Main.dc.html'] = art
payload = json.dumps(data).replace('</script', '<\\/script')
canvas.write_text(source[:match.start(2)] + payload + source[match.end(2):])
