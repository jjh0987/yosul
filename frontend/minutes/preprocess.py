import re

file = '2022.07.19_minutes'
with open(f'./frontend/minutes/{file}.txt', 'r') as f:
    content = f.read()
content = content.replace('이개','').replace('사실','').replace('응','').replace('만약에','').replace('뭔가',''
                ).replace('조금','').replace('근데','').replace('약간','').replace('솔직히','').replace('또',''
                ).replace('그러니까','').replace('이제','').replace('저희가','').replace('이거','').replace('너무','')
content = content.replace('\n', '\n### ')
content = content.replace(' 참석자 1', '## 지우').replace(' 참석자 2', '## 지우').replace(' 참석자 3', '## 선종').replace(' 참석자 4', '## 선종').replace(' 참석자 5', '## 주형')
content = content.replace('#####', '___\n#####')
with open(f'{file}_pre.md', 'w') as f:
    f.write(content)