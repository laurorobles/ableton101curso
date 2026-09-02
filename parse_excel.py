import zipfile
import xml.etree.ElementTree as ET

with zipfile.ZipFile("Temario por clase Producción Musical.xlsx") as z:
    strings_xml = z.read("xl/sharedStrings.xml")
    root = ET.fromstring(strings_xml)
    strings = [t.text for t in root.findall(".//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t")]
    
    sheet_xml = z.read("xl/worksheets/sheet1.xml")
    sheet_root = ET.fromstring(sheet_xml)
    for row in sheet_root.findall(".//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row"):
        cols = []
        for c in row.findall("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c"):
            v = c.find("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v")
            if v is not None:
                if c.get("t") == "s":
                    cols.append(strings[int(v.text)].replace("\n", " "))
                else:
                    cols.append(v.text)
            else:
                cols.append("")
        if any(cols):
            print(" | ".join(cols))
