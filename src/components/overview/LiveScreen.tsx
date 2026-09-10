import { DeskIms } from "@/components/lab/ims/DeskIms";
import { PhoneIms } from "@/components/lab/ims/PhoneIms";
import { IMS_DESK, IMS_PHONE, type ImsPaintId } from "@/content/ims";

type LiveScreenProps = {
  device: "phone" | "desk";
  paint: ImsPaintId;
  className?: string;
};

const sizes = {
  phone: IMS_PHONE,
  desk: IMS_DESK,
} as const;

export function LiveScreen({ device, paint, className }: LiveScreenProps) {
  const size = sizes[device];

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
        {device === "phone" ? <PhoneIms paint={paint} /> : <DeskIms paint={paint} />}
      </div>
    </div>
  );
}
