import { DeskIms } from "@/components/lab/ims/DeskIms";
import { PhoneIms } from "@/components/lab/ims/PhoneIms";
import { IMS_DESK, IMS_PHONE, type ImsBuildId, type ImsPaintId } from "@/content/ims";

/** Only the phone has more than one build, so only the phone asks for one. */
type LiveScreenProps =
  | { device: "phone"; paint: ImsPaintId; build: ImsBuildId; className?: string }
  | { device: "desk"; paint: ImsPaintId; className?: string };

export function LiveScreen(props: LiveScreenProps) {
  const { device, paint, className } = props;
  const size = device === "phone" ? IMS_PHONE : IMS_DESK;

  return (
    <div
      data-device={device}
      className={className ? `screen-frame ${className}` : "screen-frame"}
      style={
        {
          "--screen-w": `${size.width}px`,
          "--screen-h": `${size.height}px`,
        } as React.CSSProperties
      }
    >
      <div className="screen-frame-inner">
        {props.device === "phone" ? (
          <PhoneIms paint={paint} build={props.build} />
        ) : (
          <DeskIms paint={paint} />
        )}
      </div>
    </div>
  );
}
