import pandas as pd
df = pd.read_excel('Temario por clase Producción Musical.xlsx', sheet_name=None)
for sheet_name, data in df.items():
    print(f"--- SHEET: {sheet_name} ---")
    print(data.head(20).to_string())
