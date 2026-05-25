import { LuFlame, LuHeart } from "react-icons/lu";
import strings from "@/translations/strings";

function StayInItStickers() {
  const s = strings.landing.stayInItSticker;
  return (
    <div className="lp-stk-cluster">
      <div className="lp-stk lp-stk--post" style={{ top: "4%", left: "10%", transform: "rotate(-4deg)" }}>
        <div className="lp-stk-post-head">
          <div className="lp-stk-post-avatar" aria-hidden="true">{s.avatar}</div>
          <div className="leading-tight">
            <div className="lp-stk-post-name">{s.name}</div>
            <div className="lp-stk-post-time">{s.time}</div>
          </div>
        </div>
        <p className="lp-stk-post-body">{s.body}</p>
        <div className="lp-stk-post-meta">
          <span className="lp-stk-post-stat">
            <LuHeart className="w-3.5 h-3.5" /> 24
          </span>
        </div>
      </div>
      <div className="lp-stk lp-stk--chip lp-stk--chip-flame" style={{ top: "22%", right: "6%", transform: "rotate(8deg)" }}>
        <LuFlame className="w-4 h-4" />
        <span><strong>{s.streakNum}</strong> {s.streakLabel}</span>
      </div>
      <div className="lp-stk lp-stk--chip lp-stk--chip-cream" style={{ bottom: "6%", left: "42%", transform: "rotate(-5deg)" }}>
        <span className="lp-stk-xp">{s.xp}</span>
        {s.xpLabel}
      </div>
    </div>
  );
}

export default StayInItStickers;
