from pathlib import Path
import json,sys,shutil
root=Path(__file__).resolve().parents[1]
out=root/'src/assets/electromovilidad'
out.mkdir(exist_ok=True)
for item in json.load(sys.stdin):
    source=Path(item['source'])
    name=item['name']
    assert name.replace('-','').isalnum()
    dest=out/(name+'.png')
    shutil.copy2(source,dest)
    print(name+': '+str(dest.stat().st_size)+' bytes')
