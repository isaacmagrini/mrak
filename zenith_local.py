
#!/usr/bin/env python3
# Zenith-style local tool - no storage, CLI
import sys

MAX_CHARS = 5000

def build_mapping(top, bottom):
    if len(top) != len(bottom):
        raise ValueError("As duas linhas devem ter o mesmo tamanho.")
    enc = {}
    dec = {}
    for t,b in zip(top,bottom):
        enc[t] = b; enc[t.upper()] = b.upper()
        enc[b] = t; enc[b.upper()] = t.upper()
        dec[b] = t; dec[b.upper()] = t.upper()
        dec[t] = b; dec[t.upper()] = b.upper()
    return enc, dec

def transform(text, mapping):
    out = []
    for ch in text:
        out.append(mapping.get(ch, ch))
    return ''.join(out)

def input_multiline(prompt):
    print(prompt+" (finalize com uma linha só contendo: :::END:::)")
    lines=[]
    while True:
        try:
            line = input()
        except EOFError:
            break
        if line.strip() == ":::END:::": break
        lines.append(line)
    return "\n".join(lines)

def main():
    print("Darkmrak - CLI local")
    top = input("Linha de cima: ").strip()
    bottom = input("Linha de baixo: ").strip()
    try:
        enc, dec = build_mapping(top, bottom)
    except Exception as e:
        print("Erro:", e); sys.exit(1)
    mode = input("Modo (E)ncode/(D)ecode [E]: ").strip().upper() or "E"
    text = input_multiline("Cole o texto")
    if len(text) > MAX_CHARS:
        print("Aviso: texto maior que o limite.")
    mapping = enc if mode == "E" else dec
    print("\n--- RESULTADO ---\n")
    print(transform(text[:MAX_CHARS], mapping))
    print("\n--- FIM ---\n")

if __name__ == '__main__':
    main()
EOF
chmod +x zenith_local.py
