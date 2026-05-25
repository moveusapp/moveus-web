import { LuCheck } from "react-icons/lu";
import strings from "@/translations/strings";

function MakeItRealStickers() {
  const s = strings.landing.makeItRealSticker;
  return (
    <div className="lp-stk-cluster">
      <div className="lp-stk lp-stk--event" style={{ top: "2%", left: "8%", transform: "rotate(-4deg)" }}>
        <div className="lp-stk-event-date">
          <span className="lp-stk-event-day">{s.eventDay}</span>
          <span className="lp-stk-event-num">{s.eventNum}</span>
        </div>
        <div>
          <div className="lp-stk-event-title">{s.eventTitle}</div>
          <div className="lp-stk-event-meta">{s.eventMeta}</div>
        </div>
      </div>
      <div className="lp-stk lp-stk--bubble lp-stk--bubble-in" style={{ top: "44%", right: "10%", transform: "rotate(4deg)" }}>
        {s.bubbleIn}
      </div>
      <div className="lp-stk lp-stk--bubble lp-stk--bubble-out" style={{ top: "62%", right: "28%", transform: "rotate(-3deg)" }}>
        {s.bubbleOut}
      </div>
      <div className="lp-stk lp-stk--chip lp-stk--chip-green" style={{ bottom: "4%", left: "12%", transform: "rotate(6deg)" }}>
        <LuCheck className="w-3.5 h-3.5" />
        {s.chipLockedIn}
      </div>
    </div>
  );
}

export default MakeItRealStickers;
