"""Generates public/downloads/usty-cv.pdf from src/data/cv.json (single source of truth for the CV and the website resume page).
Run: python scripts/make_cv.py"""
import json, re
from xml.sax.saxutils import escape
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_RIGHT
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle, KeepTogether, NextPageTemplate, HRFlowable

CV = json.load(open("src/data/cv.json", encoding="utf-8"))
W, H = A4
M = 38
NAVY, GOLD, INK, MUTE, SOFT = HexColor("#12182b"), HexColor("#e0b34a"), HexColor("#1b2238"), HexColor("#5b6478"), HexColor("#f3f1ea")
USABLE = W - 2 * M


def S(n, **k): return ParagraphStyle(n, fontName=k.pop("f", "Helvetica"), **k)


body = S("b", fontSize=9.2, textColor=INK, leading=13)
sec = S("sec", f="Helvetica-Bold", fontSize=10.5, textColor=NAVY, leading=13, spaceBefore=11, spaceAfter=2)
role = S("r", f="Helvetica-Bold", fontSize=10, textColor=INK, leading=13)
when = S("w", fontSize=8.8, textColor=MUTE, leading=13, alignment=TA_RIGHT)
org = S("o", f="Helvetica-Oblique", fontSize=8.8, textColor=MUTE, leading=11.5, spaceAfter=2)
bul = S("bl", fontSize=9.1, textColor=INK, leading=12.6, leftIndent=11, bulletIndent=0, spaceAfter=1.6)
lab = S("lab", f="Helvetica-Bold", fontSize=8.8, textColor=NAVY, leading=12)
small = S("sm", fontSize=8.8, textColor=INK, leading=12)
box_t = S("bt", f="Helvetica-Bold", fontSize=9.4, textColor=NAVY, leading=12, spaceAfter=2)
contact = S("c", fontSize=8.1, textColor=HexColor("#cfd4e3"), leading=12)



def md(t): return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", escape(t))
def link(u, t, c="#12182b"): return f'<link href="{escape(u)}" color="{c}">{escape(t)}</link>'
def bullets(xs): return [Paragraph(md(x), bul, bulletText="\u2022") for x in xs]
def heading(t): return [Paragraph(escape(t).upper(), sec), HRFlowable(width="100%", thickness=1.1, color=GOLD, spaceAfter=5)]
def entry(title, dates, sub, pts):
    head = Table([[Paragraph(escape(title), role), Paragraph(escape(dates), when)]], colWidths=[USABLE - 120, 120])
    head.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 0), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return [KeepTogether([head, Paragraph(escape(sub), org)] + bullets(pts[:1])), *bullets(pts[1:])]


C = CV["contact"]


def first(c, d):
    c.saveState()
    c.setFillColor(NAVY); c.rect(0, H - 120, W, 120, fill=1, stroke=0)
    c.setFillColor(GOLD); c.rect(0, H - 123, W, 3, fill=1, stroke=0)
    c.drawImage("public/logo-mark.png", M, H - 98, width=50, height=54, mask="auto")
    c.setFillColor(white); c.setFont("Helvetica-Bold", 23); c.drawString(M + 66, H - 55, CV["name"])
    c.setFillColor(GOLD); c.setFont("Helvetica", 10.8); c.drawString(M + 66, H - 73, CV["title"].replace(" | ", "  |  "))
    g = "#e0b34a"
    p = Paragraph(escape(C["location"]) + " | " + link("mailto:" + C["email"], C["email"], g) + " | " + link(C["whatsappLink"], "WhatsApp " + C["whatsapp"], g) + " | " +
                  link(C["siteLink"], C["site"], g) + " | " + link(C["linkedin"], "LinkedIn", g), contact)
    p.wrapOn(c, USABLE - 66, 40); p.drawOn(c, M + 66, H - 108)
    c.restoreState()


def later(c, d):
    c.saveState(); c.setFont("Helvetica", 8.2); c.setFillColor(MUTE)
    c.drawString(M, H - 28, f"{CV['name']} ({CV['nickname']})  |  Full-Stack Web & Mobile Developer  |  {C['site']}")
    c.setStrokeColor(GOLD); c.setLineWidth(1); c.line(M, H - 33, W - M, H - 33); c.restoreState()


doc = BaseDocTemplate("public/downloads/usty-cv.pdf", pagesize=A4, title=f"{CV['name']} ({CV['nickname']}) - CV", author=CV["name"],
                      subject="Full-Stack Web & Mobile Developer, Founder of UASE Tech Studio Ltd", leftMargin=M, rightMargin=M, topMargin=0, bottomMargin=0)
doc.addPageTemplates([
    PageTemplate("first", [Frame(M, 32, USABLE, H - 123 - 32 - 8, id="f1", leftPadding=0, rightPadding=0, topPadding=2)], onPage=first),
    PageTemplate("later", [Frame(M, 32, USABLE, H - 32 - 44, id="f2", leftPadding=0, rightPadding=0)], onPage=later)])

st = [NextPageTemplate("later")]  # page 1 has the header band, later pages the slim header
st += heading("Profile")
st += [Paragraph(md(CV["profile"]), body), Spacer(1, 6)]
cells = [[Paragraph(escape(t), box_t), Paragraph(escape(d), small)] for t, d in CV["hire"]]
box = Table([cells], colWidths=[USABLE / 2 - 4, USABLE / 2 - 4], hAlign="LEFT")
box.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), SOFT), ("BOX", (0, 0), (0, 0), 0.8, GOLD), ("BOX", (1, 0), (1, 0), 0.8, GOLD), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
st += [box]
st += heading("Highlights") + bullets(CV["highlights"])
st += heading("Experience")
for e in CV["experience"]:
    st += entry(f"{e['role']} — {e['company']}", e["dates"], e["sub"], e["points"])
st += heading("Selected projects")
for p in CV["projects"]:
    links = " &middot; ".join(link(u, t) for t, u in p["links"])
    txt = escape(p["text"]) + (" " + links if links else "")
    st += [KeepTogether([Paragraph(f"<b>{escape(p['name'])}</b> &nbsp;<font color='#5b6478' size='8.4'>{escape(p['tech'])}</font>", body), Paragraph(txt, S("pd", fontSize=9, textColor=INK, leading=12.4, spaceAfter=5))])]
st += heading("Skills")
t = Table([[Paragraph(escape(a), lab), Paragraph(escape(b), small)] for a, b in CV["skills"]], colWidths=[100, USABLE - 100])
t.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 1.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
st.append(t)
st += heading("Education & credentials") + bullets(CV["education"])
doc.build(st)
