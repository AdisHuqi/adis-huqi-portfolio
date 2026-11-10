import { Badge, Bar, Button, LockScreen, Notification, Phone, Roll, Stage, Text, Toggle, Window, WALLPAPER, type Act } from "./kit";
import "./rideDemo.css";

// ASIS TAXI's real architecture as one event: a driver accepts a request in the
// driver website and the customer's phone hears about it through the shared
// backend. An authored illustration (Stageshow), not a recording. Real words:
// the request, its fare, the status, Accept and the notification.

type S = { status: "Searching" | "Accepted" | "Arriving"; notified: boolean };
const initial: S = { status: "Searching", notified: false };
const poster: S = { status: "Arriving", notified: true };

const EARLIER = [
  { name: 96, fare: 44 },
  { name: 72, fare: 38 },
  { name: 110, fare: 46 },
  { name: 84, fare: 40 },
];

async function script(a: Act<S>) {
  await a.wait(900);
  await a.move({ at: "accept", x: 0.85, y: 0.7 });
  await a.wait(250);
  await a.click();
  await a.set({ status: "Accepted" });
  await a.wait(550);
  await a.set({ notified: true });
  await a.move({ wide: { x: 250, y: 345 }, compact: { x: 60, y: 318 } });
  await a.wait(1500);
  await a.set({ status: "Arriving" });
  await a.wait(2000);
}

export default function RideDemo() {
  return (
    <Stage
      width={640}
      height={400}
      compact={{ below: 600, width: 358, height: 560 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      accent="#234a2a"
      cursor={{ at: { wide: { x: 250, y: 345 }, compact: { x: 60, y: 318 } } }}
      className="rd"
    >
      {(s) => (
        <>
          <Window url="driver.asistaxi.com" className="rd-window">
            <div className="rd-brand">
              <img src="/images/asis-taxi/logo.png" alt="" />
            </div>
            <div className="rd-main">
              <div className="rd-title">
                <Text className="rd-heading">Ride requests</Text>
                <Text className="rd-online">Online</Text>
                <Toggle on />
              </div>

              <div className="rd-request">
                <div className="rd-row">
                  <Text className="rd-label">New request</Text>
                  <Badge tone={s.status === "Searching" ? "warning" : "success"} dot>
                    <Roll>{s.status}</Roll>
                  </Badge>
                </div>
                <div className="rd-route">
                  <Bar w={148} h={6} tone={3} />
                  <Bar w={112} h={6} tone={2} />
                </div>
                <div className="rd-row">
                  <Text className="rd-fare">760 ALL</Text>
                  <Button variant="primary" size="large" data-target="accept" data-cursor="pointer">
                    {s.status === "Searching" ? "Accept" : "Accepted"}
                  </Button>
                </div>
              </div>

              <div className="rd-earlier">
                <Bar w={56} h={6} tone={3} />
                {EARLIER.map((row, i) => (
                  <div key={i} className="rd-past">
                    <Bar w={16} h={16} r={5} tone={2} />
                    <Bar w={row.name} tone={3} />
                    <Bar w={row.fare} tone={2} style={{ marginLeft: "auto" }} />
                  </div>
                ))}
              </div>
            </div>
          </Window>

          <Phone width={236} frame="pro" dark wallpaper={WALLPAPER} className="rd-phone">
            <LockScreen size="satellite" stack="top">
              <Notification
                className="rd-note"
                data-show={s.notified || undefined}
                icon={<img src="/images/asis-taxi/logo.png" alt="" />}
                title="Driver accepted"
                body="Your driver is on the way to the pickup."
              />
            </LockScreen>
          </Phone>
        </>
      )}
    </Stage>
  );
}
