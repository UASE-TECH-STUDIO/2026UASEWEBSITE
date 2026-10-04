"""Generates public/downloads/usty-cv.pdf (single-column, ATS-friendly). Run: python scripts/make_cv.py"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_RIGHT
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle, KeepTogether, NextPageTemplate, HRFlowable

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


def link(u, t, c="#12182b"): return f'<link href="{u}" color="{c}">{t}</link>'
def bullets(xs): return [Paragraph(x, bul, bulletText="\u2022") for x in xs]
def heading(t): return [Paragraph(t.upper(), sec), HRFlowable(width="100%", thickness=1.1, color=GOLD, spaceAfter=5)]
def entry(title, dates, sub, pts):
    head = Table([[Paragraph(title, role), Paragraph(dates, when)]], colWidths=[USABLE - 120, 120])
    head.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 0), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return [KeepTogether([head, Paragraph(sub, org)] + bullets(pts[:1])), *bullets(pts[1:])]


def first(c, d):
    c.saveState()
    c.setFillColor(NAVY); c.rect(0, H - 120, W, 120, fill=1, stroke=0)
    c.setFillColor(GOLD); c.rect(0, H - 123, W, 3, fill=1, stroke=0)
    c.drawImage("public/logo-mark.png", M, H - 98, width=50, height=54, mask="auto")
    c.setFillColor(white); c.setFont("Helvetica-Bold", 23); c.drawString(M + 66, H - 55, "Muhammedmustapha Abdullahi")
    c.setFillColor(GOLD); c.setFont("Helvetica", 10.8); c.drawString(M + 66, H - 73, "Full-Stack Web & Mobile Developer  |  Founder, UASE Tech Studio Ltd")
    p = Paragraph("Abuja, Nigeria &middot; Remote worldwide | " + link("mailto:uasetechstudio@gmail.com", "uasetechstudio@gmail.com", "#e0b34a") + " | " +
                  link("https://wa.me/2349133549399", "WhatsApp +234 913 354 9399", "#e0b34a") + " | " + link("https://uase.tech", "uase.tech", "#e0b34a") + " | " +
                  link("https://www.linkedin.com/in/muhammedmustapha-abdullahi-bb897a309", "LinkedIn", "#e0b34a"), contact)
    p.wrapOn(c, USABLE - 66, 40); p.drawOn(c, M + 66, H - 108)
    c.restoreState()


def later(c, d):
    c.saveState(); c.setFont("Helvetica", 8.2); c.setFillColor(MUTE)
    c.drawString(M, H - 28, "Muhammedmustapha Abdullahi (USTY)  |  Full-Stack Web & Mobile Developer  |  uase.tech")
    c.setStrokeColor(GOLD); c.setLineWidth(1); c.line(M, H - 33, W - M, H - 33); c.restoreState()


doc = BaseDocTemplate("public/downloads/usty-cv.pdf", pagesize=A4, title="Muhammedmustapha Abdullahi (USTY) - CV", author="Muhammedmustapha Abdullahi",
                      subject="Full-Stack Web & Mobile Developer, Founder of UASE Tech Studio Ltd", leftMargin=M, rightMargin=M, topMargin=0, bottomMargin=0)
doc.addPageTemplates([
    PageTemplate("first", [Frame(M, 32, USABLE, H - 123 - 32 - 8, id="f1", leftPadding=0, rightPadding=0, topPadding=2)], onPage=first),
    PageTemplate("later", [Frame(M, 32, USABLE, H - 32 - 44, id="f2", leftPadding=0, rightPadding=0)], onPage=later)])

st = [NextPageTemplate("later")]  # page 1 uses the header band, every later page the slim header
st += heading("Profile")
st += [Paragraph("Full-stack developer since 2020 and founder of a software company: trading under the UASE brand since 2024 and incorporated as <b>UASE Tech Studio Ltd</b> in 2026. "
                 "I take whole products from a client&apos;s problem to the App Store, Google Play and production, covering planning, architecture, design, build, testing, launch and ongoing upgrades. "
                 "Core stack: <b>Next.js, TypeScript, FastAPI, MongoDB Atlas and Capacitor</b> (iOS + Android).", body), Spacer(1, 6)]
box = Table([[[Paragraph("Hire me as a developer", box_t), Paragraph("Full-time or contract, remote. Next.js, FastAPI and cross-platform mobile.", small)],
              [Paragraph("Engage UASE Tech Studio Ltd", box_t), Paragraph("A complete software team for your product, from design to launch and support. USD payments accepted.", small)]]],
            colWidths=[USABLE / 2 - 4, USABLE / 2 - 4], hAlign="LEFT")
box.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), SOFT), ("BOX", (0, 0), (0, 0), 0.8, GOLD), ("BOX", (1, 0), (1, 0), 0.8, GOLD), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("COLBACKGROUNDS", (0, 0), (-1, -1), [SOFT, SOFT])]))
st += [box]
st += heading("Highlights")
st += bullets(["Built and launched <b>CARSTRIMS</b> end to end: a five-role vehicle marketplace, live on the web, the App Store and Google Play.",
               "Delivered 12+ production systems for healthcare, judiciary, automotive and logistics clients.",
               "Trained and mentored 150+ students; remote-first, serving clients worldwide."])
st += heading("Experience")
st += entry("Founder &amp; Lead Software Engineer &mdash; UASE Tech Studio Ltd", "Jun 2026 &ndash; Present", "CAC-registered software company (RC 9594186) &middot; Abuja, Nigeria &middot; Remote worldwide",
            ["Registered UASE Tech Studio Ltd as a stand-alone software company, separate from the enterprise&apos;s other businesses, to take on complete software projects for clients worldwide.",
             "Led <b>CARSTRIMS</b> from the client&apos;s problem to launch: planning, architecture, design, build, testing and release of a multi-role marketplace (dealer, staff, partner, buyer, super admin) on Next.js, FastAPI and MongoDB Atlas.",
             "Shipped native iOS and Android apps from one Next.js codebase with Capacitor, including push notifications (FCM V1), real-time messaging, store submission and device-specific fixes.",
             "Rebuilt the company site, uase.tech, in the same stack: blog, admin dashboard, visitor analytics, contact system and a responsive, mobile-first interface.",
             "Run training for developers and office teams; bill international clients in US dollars."])
st += entry("Founder &amp; Lead Developer &mdash; USTY Alhaji Service Enterprise", "2024 &ndash; 2026", "CAC-registered business trading under the UASE brand &middot; Abuja, Nigeria",
            ["Moved from working as an individual developer to running a registered business, delivering complete software systems for clients instead of isolated components.",
             "Delivered systems for healthcare, judiciary, automotive and logistics clients, including <b>BloodLink</b> (blood donor platform) and a <b>Court Order Management System</b>.",
             "Implemented a Facade-pattern service layer for scalable email and API management.",
             "Mentored 150+ students on SIWES and final-year software projects across Nigerian universities."])
st += entry("Independent Full-Stack Developer", "2020 &ndash; 2024", "Nigeria &middot; Remote",
            ["Started coding in 2020 and progressed from small learning projects to full client systems.",
             "Built with Django, PostgreSQL, MySQL, PHP, JavaScript and Bootstrap before moving to the Next.js and FastAPI stack."])
st += entry("Technical IT Assistant &mdash; Edge Meter / T4U / Sunstar", "2021 &ndash; 2023", "Contract consulting",
            ["Technical documentation and system audits for AY Global Integrated Services; secure data-handling procedures for institutional engineering audits.",
             "Delivered Solar/Starlink integration projects to close connectivity gaps."])
st += entry("IT Instructor &mdash; Heritage Computers / Ligo Computers", "2016 &ndash; 2020", "Zaria, Nigeria",
            ["Trained 150+ students in MS Office, CorelDRAW and UI/UX fundamentals; developed and delivered structured diploma curriculum."])
st += heading("Selected projects")
proj = [("CARSTRIMS &mdash; Vehicle Marketplace (Web, iOS, Android)", "Next.js &middot; TypeScript &middot; FastAPI &middot; MongoDB Atlas &middot; Capacitor",
         "Multi-role platform with public marketplace and voice search, inventory, sales and expense tracking, financial reports (PDF/JPG/Excel), WhatsApp sharing and push notifications. " +
         link("https://www.carstrims.com", "Web") + " &middot; " + link("https://apps.apple.com/us/app/carstrims/id6788107489", "App Store") + " &middot; " + link("https://play.google.com/store/apps/details?id=com.uasetechstudio.carstrims&hl=en", "Google Play")),
        ("UASE Tech Studio website", "Next.js &middot; FastAPI &middot; MongoDB &middot; Cloudinary", "Company site with portfolio, blog, resources, admin dashboard, analytics, zoomable galleries and WhatsApp-first contact. " + link("https://uase.tech", "uase.tech")),
        ("BloodLink &mdash; Blood Donor Platform", "Next.js &middot; MongoDB &middot; NextAuth &middot; Resend", "Healthcare platform connecting donors, beneficiaries and admins with automated emails and real-time matching."),
        ("Court Order Management System", "Django &middot; PostgreSQL", "Secure platform for issuing and tracking digital court orders across legal institutions."),
        ("Food Ordering App", "React &middot; Node.js &middot; Capacitor", "Multi-vendor food platform with real-time tracking, shipped as a native Android app.")]
for t, tech, d in proj:
    st += [KeepTogether([Paragraph(f"<b>{t}</b> &nbsp;<font color='#5b6478' size='8.4'>{tech}</font>", body), Paragraph(d, S("pd", fontSize=9, textColor=INK, leading=12.4, spaceAfter=5))])]
st += heading("Skills")
sk = [("Frontend", "Next.js, React, TypeScript, Tailwind CSS, Zustand, responsive and mobile-first UI"),
      ("Backend and data", "FastAPI, Python, REST APIs, WebSockets, JWT authentication, MongoDB Atlas"),
      ("Mobile", "Capacitor (iOS + Android), Firebase Cloud Messaging, App Store and Google Play publishing, Xcode Cloud"),
      ("Cloud and tools", "Vercel, Render, Cloudinary, Resend, Git, CI/CD"),
      ("Professional", "System architecture, end-to-end project delivery, client communication, training and mentoring"),
      ("Also experienced", "Django, PostgreSQL, MySQL, PHP, Node.js, Docker, MS Office, CorelDRAW")]
t = Table([[Paragraph(a, lab), Paragraph(b, small)] for a, b in sk], colWidths=[100, USABLE - 100])
t.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 1.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
st.append(t)
st += heading("Education &amp; credentials")
st += bullets(["BSc Computer Science &mdash; Ahmadu Bello University (ABU), Zaria",
               "Full-Stack Software Development &mdash; Brotech Institute (certified)",
               "Diploma in Computing &mdash; Heritage Computers, Zaria",
               "English proficiency C1 Advanced (EF SET 68/100) &middot; Languages: English, Hausa (native)"])
doc.build(st)
