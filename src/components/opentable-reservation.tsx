import { openTableReservationUrl, openTableWidgetUrl } from "../lib/reservations"

export default function OpenTableReservation() {
  return (
    <div className="w-full max-w-sm border border-aberdeen-peach/40 bg-oyster-white p-5 text-aberdeen-blue shadow-[6px_6px_0_var(--color-aberdeen-peach)] md:p-7">
      <iframe
        className="mx-auto block h-[301px] w-[224px] max-w-full border-0"
        height="301"
        loading="lazy"
        src={openTableWidgetUrl}
        title="Reserve a table at Aberdeen with OpenTable"
        width="224"
      />
      <p className="mt-4 text-center text-sm leading-6">
        <a
          className="underline decoration-aberdeen-blue/40 underline-offset-4 hover:decoration-aberdeen-blue"
          data-cms-link-key="home.reservations.plan-link"
          href={openTableReservationUrl}
          rel="noreferrer"
          target="_blank"
        >
          Reserve directly on OpenTable
        </a>
      </p>
    </div>
  )
}
