import fs from "fs";
import path from "path";
// Any image you drop into public/images/carstrims/ is added to the CARSTRIMS gallery automatically (numbered names sort first: 01-, 02-, ...).
export function extraShots(dir = "carstrims"): string[] {
  try {
    return fs.readdirSync(path.join(process.cwd(), "public", "images", dir))
      .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/images/${dir}/${f}`);
  } catch { return []; }
}
