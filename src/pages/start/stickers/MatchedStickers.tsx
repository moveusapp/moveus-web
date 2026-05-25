import { LuMapPin } from "react-icons/lu";
import strings from "@/translations/strings";

function MatchedStickers() {
  const s = strings.landing.matchedSticker;
  return (
    <div className="lp-stk-cluster">
      <div className="lp-stk lp-stk--survey" style={{ top: "4%", left: "6%", transform: "rotate(-5deg)" }}>
        <div className="lp-stk-eyebrow">{s.eyebrow}</div>
        <div className="lp-stk-q">{s.question}</div>
        <div className="lp-stk-row lp-stk-row--on">
          <span className="lp-stk-radio" aria-hidden="true" />
          {s.optionOn}
        </div>
        <div className="lp-stk-row">
          <span className="lp-stk-radio" aria-hidden="true" />
          {s.optionOff}
        </div>
      </div>
      <div className="lp-stk lp-stk--chip lp-stk--chip-blue" style={{ top: "18%", right: "4%", transform: "rotate(7deg)" }}>
        <LuMapPin className="w-3.5 h-3.5" />
        {s.chipLocation}
      </div>
      <div className="lp-stk lp-stk--chip lp-stk--chip-orange" style={{ bottom: "6%", left: "30%", transform: "rotate(-3deg)" }}>
        <span className="lp-stk-dot" aria-hidden="true" />
        {s.chipMatches}
      </div>
    </div>
  );
}

export default MatchedStickers;
