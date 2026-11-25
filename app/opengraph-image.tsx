import { ImageResponse } from "next/og";

export const alt = '장기렌트 비교노트';
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const text = '장기렌트 비교노트장기렌트·리스·할부, 차종별 비교';
  const font = await fetch(`https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(text)}`)
    .then((r) => r.text())
    .then((css) => css.match(/src: url\((.+?)\)/)?.[1])
    .then((url) => (url ? fetch(url).then((r) => r.arrayBuffer()) : null))
    .catch(() => null);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: '#0B1F3A', color: '#F8FAFC', padding: "72px", fontFamily: "NotoKR" }}>
        <div style={{ color: '#60A5FA', fontSize: 28, letterSpacing: 6 }}>LONG-TERM RENT GUIDE</div>
        <div style={{ marginTop: 24, fontSize: 76, color: '#F8FAFC' }}>장기렌트 비교노트</div>
        <div style={{ marginTop: 20, fontSize: 30, color: '#93C5FD' }}>장기렌트·리스·할부, 차종별 비교</div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "NotoKR", data: font, weight: 700 }] : [] },
  );
}
