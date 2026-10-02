from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Image, BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, NextPageTemplate, FrameBreak, KeepTogether
W, H = A4; SW = 190; M = 30
NAVY, GOLD, INK, MUTE = HexColor("#12182b"), HexColor("#e0b34a"), HexColor("#1b2238"), HexColor("#5b6478")
def S(n, **k): return ParagraphStyle(n, fontName=k.pop("f", "Helvetica"), **k)
side_h = S("sh", f="Helvetica-Bold", fontSize=9, textColor=GOLD, spaceBefore=12, spaceAfter=4, leading=11)
side = S("s", fontSize=8.6, textColor=white, leading=12)
name = S("n", f="Helvetica-Bold", fontSize=14, textColor=white, leading=18)
role = S("r", fontSize=9.5, textColor=GOLD, leading=13, spaceAfter=6)
h = S("h", f="Helvetica-Bold", fontSize=11.5, textColor=NAVY, spaceBefore=12, spaceAfter=5, leading=14)
body = S("b", fontSize=9.2, textColor=INK, leading=13.2)
job = S("j", f="Helvetica-Bold", fontSize=10, textColor=INK, leading=13, spaceBefore=6)
meta = S("m", fontSize=8.4, textColor=MUTE, leading=11, spaceAfter=2)
bul = S("bl", fontSize=9, textColor=INK, leading=12.8, leftIndent=10, bulletIndent=0, spaceAfter=1.5)
def link(u, t): return f'<link href="{u}" color="#e0b34a">{t}</link>'
def bullets(xs): return [Paragraph(x, bul, bulletText="•") for x in xs]
def side_page(c, d):
    c.saveState(); c.setFillColor(NAVY); c.rect(0, 0, SW, H, fill=1, stroke=0)
    c.setFillColor(GOLD); c.rect(SW, 0, 3, H, fill=1, stroke=0); c.restoreState()
def plain(c, d): pass
doc = BaseDocTemplate("public/downloads/usty-cv.pdf", pagesize=A4, title="Muhammedmustapha Abdullahi (USTY) — CV", author="Muhammedmustapha Abdullahi", leftMargin=0, rightMargin=0, topMargin=0, bottomMargin=0)
fs = Frame(M - 10, 30, SW - M - 6, H - 60, id="s", leftPadding=0, rightPadding=0)
fm = Frame(SW + 26, 30, W - SW - 26 - 30, H - 60, id="m", leftPadding=0, rightPadding=0)
ff = Frame(36, 30, W - 72, H - 60, id="f")
doc.addPageTemplates([PageTemplate("first", [fs, fm], onPage=side_page), PageTemplate("later", [ff], onPage=plain)])
st = []
st += [Spacer(1, 6), Image("public/logo-mark.png", width=38, height=41, hAlign="LEFT"), Spacer(1, 6), Paragraph("Muhammedmustapha<br/>Abdullahi", name), Paragraph("Full-Stack Web &amp; Mobile Developer<br/>(USTY)", role)]
st += [Paragraph("CONTACT", side_h), Paragraph("Abuja, Nigeria · Remote-ready", side),
       Paragraph(link("mailto:uasetechstudio@gmail.com", "uasetechstudio@gmail.com"), side),
       Paragraph(link("https://wa.me/2349133549399", "WhatsApp: +234 913 354 9399"), side),
       Paragraph(link("https://uase.tech", "uase.tech"), side),
       Paragraph(link("https://www.linkedin.com/in/muhammedmustapha-abdullahi-bb897a309", "LinkedIn profile"), side)]
for t, xs in [("CORE STACK", ["Next.js · React · TypeScript", "FastAPI · Python", "MongoDB Atlas", "Capacitor (iOS + Android)", "REST APIs · WebSockets", "Zustand · Tailwind CSS", "Firebase FCM (V1)", "Vercel · Render · Cloudinary", "Git · CI/CD · Xcode Cloud"]),
              ("ALSO SKILLED IN", ["Django · PostgreSQL · MySQL", "PHP · Node.js · Docker", "System design", "IT administration", "SEO · Graphic design", "Solar / Starlink setups"]),
              ("PATTERNS", ["MVC · Facade · Singleton", "Observer · Adapter · Repository", "Scrum"]),
              ("LANGUAGES", ["English (C1 Advanced)", "Hausa (native)"]),
              ("EDUCATION", ["BSc Computer Science", "Ahmadu Bello University, Zaria", "Full-Stack Software Development", "Brotech Institute (certified)", "Diploma in Computing", "Heritage Computers, Zaria", "EF SET English C1 (68/100)"])]:
    st += [Paragraph(t, side_h)] + [Paragraph(x, side) for x in xs]
st.append(FrameBreak())
st += [Paragraph("PROFILE", h), Paragraph("Full-stack engineer with a 10-year IT background and full-stack development since 2020. I build web apps and cross-platform <b>iOS and Android</b> apps on Next.js, TypeScript, FastAPI and MongoDB Atlas, and take products from planning and architecture to the App Store, Google Play and production. Founder of UASE Tech Studio Ltd (CAC-registered, RC 9594186), delivering systems across healthcare, judiciary, automotive and logistics.", body)]
st += [Paragraph("FLAGSHIP PROJECT", h), Paragraph("CARSTRIMS — Vehicle Marketplace (Web · iOS · Android)", job),
       Paragraph("Live on the web, the App Store and Google Play · " + link("https://www.carstrims.com", "carstrims.com").replace("#e0b34a", "#12182b"), meta)]
st += bullets(["Planned, architected, designed, built, tested and launched the whole product end to end for a client.",
  "Multi-role platform (5 user roles): inventory, sales tracking, financial reports, appointments, QR codes.",
  "One Next.js codebase shipped as native iOS and Android apps with Capacitor, including store submission.",
  "Real-time messaging and push notifications (FCM V1); FastAPI + MongoDB Atlas backend on Render, frontend on Vercel."])
st += [Paragraph("EXPERIENCE", h), Paragraph("Founder &amp; Lead Engineer — UASE Tech Studio Ltd (RC 9594186)", job), Paragraph("2020 – Present · Abuja, Nigeria · Remote / Hybrid", meta)]
st += bullets(["Architected and delivered 12+ production systems for healthcare, judiciary, automotive and logistics clients.",
  "Engineered BloodLink, a healthcare platform with automated email workflows, real-time donor matching and admin coordination.",
  "Implemented a Facade-pattern service layer for scalable email and API management.",
  "Mentored 150+ students on SIWES and final-year software projects across Nigerian universities."])
st.append(NextPageTemplate("later"))
st += [Paragraph("Technical IT Assistant — Edge Meter / T4U / Sunstar", job), Paragraph("2021 – 2023 · Contract consulting", meta)]
st += bullets(["Consulted on technical documentation and system audits for AY Global Integrated Services.", "Designed secure data-handling procedures for institutional engineering audits.", "Delivered Solar/Starlink integration projects to close connectivity gaps."])
st += [Paragraph("IT Instructor — Heritage Computers / Ligo Computers", job), Paragraph("2016 – 2020 · Zaria, Nigeria", meta)]
st += bullets(["Trained 150+ students in MS Office, CorelDRAW and UI/UX design fundamentals.", "Developed and delivered structured curriculum for computing diploma programmes."])
st += [Paragraph("SELECTED PROJECTS", h)]
for t, d in [("BloodLink — Blood Donor Platform", "Next.js · MongoDB · NextAuth · Resend. Connects donors, beneficiaries and admins with automated email and real-time matching."),
             ("Court Order Management System", "Django · PostgreSQL. Secure platform for issuing and tracking digital court orders."),
             ("Food Ordering App", "React · Node.js · Capacitor. Multi-vendor platform with real-time tracking, shipped as a native Android app.")]:
    st += [KeepTogether([Paragraph(t, job), Paragraph(d, body)])]
doc.build(st)
