export const metadata = { title: "Graphics Portfolio | USTY — UASE Tech Studio" };
export default function Graphics() {
  const imgs = Array.from({ length: 25 }, (_, i) => `/images/graphics/graphic${i + 1}.jpg`);
  return (
    <div className="w"><div className="hero" style={{paddingBottom:20}}><h1>Graphics portfolio</h1>
      <p className="lead">Branding, print and social media design from UASE Tech Studio.</p>
      <div className="btns"><a className="btn p" href="/downloads/uase-graphics-catalog.pdf" download>Download graphics catalog (PDF)</a></div></div>
      <div className="shots">{imgs.map((s) => <img key={s} src={s} alt="Graphic design sample" loading="lazy" />)}</div></div>
  );
}
