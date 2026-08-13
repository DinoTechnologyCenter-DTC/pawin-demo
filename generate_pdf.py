import markdown
from weasyprint import HTML
import os

md_path = "/home/mrdino/Desktop/DTC/Pawin/pawin-frontend/docs/site-manual.md"
pdf_path = "/home/mrdino/Desktop/DTC/Pawin/pawin-frontend/docs/PAWIN_Site_Manual.pdf"

if os.path.exists(md_path):
    with open(md_path, "r", encoding="utf-8") as f:
        md_text = f.read()
    
    html = markdown.markdown(md_text, extensions=["tables", "fenced_code"])
    
    styled_html = f"""
    <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333; }}
                h1, h2, h3 {{ color: #0d1117; }}
                h1 {{ border-bottom: 2px solid #ffae1f; padding-bottom: 10px; }}
                h2 {{ margin-top: 30px; border-bottom: 1px solid #ccc; }}
                img {{ max-width: 100%; border-radius: 8px; margin: 10px 0; }}
                code {{ background: #f4f4f4; padding: 2px 4px; border-radius: 4px; }}
                pre {{ background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }}
                pre code {{ background: none; padding: 0; }}
            </style>
        </head>
        <body>
            {html}
        </body>
    </html>
    """
    
    HTML(string=styled_html).write_pdf(pdf_path)
    print(f"Success! PDF generated at {pdf_path}")
else:
    print(f"Error: Could not find markdown file at {md_path}")
