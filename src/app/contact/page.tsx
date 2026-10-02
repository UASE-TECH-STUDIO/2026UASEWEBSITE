import ContactForm from "@/components/ContactForm";
import { EMAIL, LINKEDIN, WA, waLink } from "@/lib/data";
export const metadata = { title: "Contact | USTY — UASE Tech Studio" };
export default function Contact() {
  return (
    <div className="w"><div className="hero" style={{paddingBottom:24}}><h1>Let&apos;s work together</h1>
      <p className="lead">Open to full-time roles, remote positions and freelance contracts, anywhere in the world. We accept payments in US dollars. Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or use the form.</p></div>
      <div className="btns" style={{marginTop:0,marginBottom:22}}><a className="btn wa" href={waLink(WA.ng)} target="_blank" rel="noopener">WhatsApp (Nigeria)</a><a className="btn wa" href={waLink(WA.us)} target="_blank" rel="noopener">WhatsApp (USA)</a><a className="btn" href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a></div>
      <ContactForm /></div>
  );
}
